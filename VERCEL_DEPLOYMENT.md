# Vercel Deployment Guide

## 🚀 Production Environment Setup

### 1. **Environment Variables Configuration**

Set the following environment variables in your Vercel project settings:

#### **Required Variables:**
```bash
# Database Configuration
DATABASE_URL=your_production_database_url_here

# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Session Configuration
SESSION_SECRET=your_session_secret_here

# API Configuration
API_BASE_URL=https://your-vercel-domain.vercel.app/api

# Security
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

#### **Optional Variables:**
```bash
# Analytics and Monitoring
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
```

### 2. **Build Configuration**

The project is configured with:
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist/public`
- **Node.js Runtime**: 22.x
- **Framework**: Vite

### 3. **Deployment Steps**

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Set Environment Variables**: Add all required environment variables
3. **Deploy**: Vercel will automatically build and deploy on push to main branch
4. **Verify**: Check that all API endpoints are working correctly

### 4. **Production Optimizations**

- **Asset Caching**: Static assets are cached for 1 year
- **Security Headers**: XSS protection, content type sniffing prevention
- **Code Minification**: Production builds are minified and optimized
- **Console Log Removal**: Development logs are removed in production

### 5. **API Routes**

All API routes are automatically handled by Vercel Functions:
- **Runtime**: Node.js 22.x
- **Path**: `/api/*`
- **Automatic Scaling**: Vercel handles serverless scaling

### 6. **Troubleshooting**

#### **Common Issues:**
- **Build Failures**: Check environment variables are set correctly
- **API Errors**: Verify database connection and Supabase configuration
- **Asset Loading**: Ensure build output directory is correct

#### **Debug Commands:**
```bash
# Local production build test
npm run vercel-build

# Preview production build
npm run preview

# Check TypeScript compilation
npm run check
```

### 7. **Performance Monitoring**

- **Vercel Analytics**: Built-in performance monitoring
- **Real User Monitoring**: Track actual user experience
- **Build Analytics**: Monitor build performance and optimization

### 8. **Security Features**

- **HTTPS Only**: All production traffic is encrypted
- **Security Headers**: XSS protection and content security
- **CORS Configuration**: Proper cross-origin request handling
- **Environment Isolation**: Production secrets are properly secured

---

**Note**: Replace all placeholder values with your actual production credentials before deployment. 