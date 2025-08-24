import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  // vite.config can export a function (defineConfig(({mode}) => ({})))
  // so ensure we call it to get the actual config object and guarantee
  // the `root` points at the client folder so Vite resolves /src/... correctly.
  let resolvedViteConfig: any = viteConfig;
  if (typeof viteConfig === "function") {
    // call with current NODE_ENV/mode to get the config object
    const mode = process.env.NODE_ENV || "development";
    // pass a full ConfigEnv-like object: command is 'serve' for dev
    // support sync or async config functions
    resolvedViteConfig = await Promise.resolve(
      viteConfig({ command: "serve", mode }),
    );
  }

  // ensure root is the client directory if not provided by the config
  resolvedViteConfig = {
    root: resolvedViteConfig && resolvedViteConfig.root
      ? resolvedViteConfig.root
      : path.resolve(__dirname, "..", "client"),
    ...resolvedViteConfig,
  };

  const vite = await createViteServer({
    ...resolvedViteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // Apply Vite middleware first - this handles all source files
  app.use(vite.middlewares);
  
  // Only handle non-API routes and non-source file routes with the catch-all
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip API routes - let them be handled by the API router
    if (url.startsWith('/api/')) {
      return next();
    }

    // Skip source file requests - let Vite handle them
    if (url.startsWith('/src/') || url.startsWith('/@vite/')) {
      return next();
    }

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist, but skip API routes
  app.use("*", (req, res, next) => {
    // Skip API routes - let them be handled by the API router
    if (req.originalUrl.startsWith('/api/')) {
      return next();
    }
    
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
