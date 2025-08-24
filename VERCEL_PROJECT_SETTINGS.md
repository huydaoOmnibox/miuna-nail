Project Settings to match `vercel.json` and remove the "Configuration Settings differ" warning

1) Build & Output
- Install Command: npm install
- Build Command: npm run vercel-build
- Output Directory: dist/public
- Framework Preset: Vite (or leave as "Other" and set commands above)

2) Environment Variables
Copy values from your secure store into the Project > Settings > Environment Variables section. The repo contains `vercel.env.example` as a reference. Keys to add:
- DATABASE_URL
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- JWT_SECRET
- SESSION_SECRET
- API_BASE_URL
- CORS_ORIGIN
- NEXT_PUBLIC_GA_ID (optional)
- NEXT_PUBLIC_SENTRY_DSN (optional)

3) Routes / Rewrites
If you configured Rewrites in the Vercel UI, ensure they match `vercel.json`:
- /api/(.*) -> /api/index
- Filesystem handle (serve static files first)
- /(.*) -> /index.html (SPA fallback)

4) Headers
The project includes default headers in `vercel.json`. If you configured headers in the UI, ensure they match.

5) How to sync and clear the warning
Option A — Make Project Settings authoritative:
- In Vercel Dashboard > Project > Settings, apply the values above.
- No code changes required; the warning should clear when the next production deployment uses these exact settings.

Option B — Make `vercel.json` authoritative (use repo settings):
- Ensure `vercel.json` is committed (it is). Push the commit to the Git branch connected to Vercel.
- Trigger a new production deploy (via Git push or the Vercel UI "Redeploy").
- The new deployment will inherit settings from `vercel.json` and the warning should clear.

6) Quick redeploy commands (local, optional)
```powershell
# from repo root - use if using Vercel CLI
npx vercel --prod --confirm
```

7) Troubleshooting
- If the banner persists: open the latest Deployment in Vercel, inspect "Build & Settings" in the deployment details and compare every field to the Project Settings.
- If env vars mismatch, Vercel treats that as a settings drift — confirm envs were added in Project Settings and not just in the team or local environment.

8) Security note
Never commit secrets to the repo. Use the Vercel UI or Vercel CLI to set production secrets.

If you want I can:
- Push the two changes I added (`vercel.json` env placeholders and this markdown) if you want me to commit and then trigger a redeploy from this environment.
- Or run `npx vercel --prod --confirm` to redeploy right now (say yes and I'll run it).
