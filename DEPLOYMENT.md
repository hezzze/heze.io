# Deployment Guide

This guide covers how to deploy your React application to GitHub Pages with a custom domain.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- GitHub repository
- Custom domain (heze.io) configured

## Automated Deployment (Recommended)

### GitHub Actions Setup

The repository includes an automated deployment workflow that triggers on pushes to the `main` branch.

#### Workflow Features
- ✅ Automatic builds on push to main
- ✅ Node.js 20 environment
- ✅ Dependency caching for faster builds
- ✅ Production build optimization
- ✅ GitHub Pages deployment

#### To Enable Automated Deployment:

1. **Enable GitHub Pages in Repository Settings**
   - Go to your repository → Settings → Pages
   - Source: "GitHub Actions"
   - Save the settings

2. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Monitor Deployment**
   - Check the "Actions" tab in your GitHub repository
   - Deployment typically takes 2-3 minutes

## Manual Deployment

### Option 1: Using npm scripts

```bash
# Install dependencies
yarn install

# Build and deploy
yarn deploy
```

### Option 2: Step-by-step manual deployment

```bash
# 1. Install dependencies
yarn install

# 2. Build for production
yarn build

# 3. Deploy to gh-pages branch
yarn gh-pages -d build
```

## Custom Domain Setup (heze.io)

### 1. DNS Configuration

Configure your DNS provider with the following records:

```
# A Records (point to GitHub Pages IPs)
heze.io.     A     185.199.108.153
heze.io.     A     185.199.109.153
heze.io.     A     185.199.110.153
heze.io.     A     185.199.111.153

# CNAME Record (optional, for www subdomain)
www.heze.io. CNAME heze.io.
```

### 2. GitHub Repository Configuration

1. **Add CNAME file** (if not already present):
   ```bash
   echo "heze.io" > public/CNAME
   ```

2. **Repository Settings**:
   - Go to Settings → Pages
   - Custom domain: `heze.io`
   - ✅ Enforce HTTPS (recommended)

### 3. Verify Domain Configuration

- DNS propagation can take up to 24 hours
- Use tools like `dig heze.io` or online DNS checkers
- GitHub will show a green checkmark when properly configured

## Build Configuration

### Environment-Specific Settings

- **Development**: `publicPath: '/'`
- **Production**: `publicPath: '/'` (for custom domain)
- **Homepage**: `https://heze.io`

### Build Optimization

The production build includes:
- ✅ Code minification
- ✅ CSS extraction and optimization
- ✅ Asset optimization
- ✅ Bundle splitting
- ✅ Cache busting with file hashes

## Troubleshooting

### Common Issues

#### 1. 404 Errors on Page Refresh
**Solution**: The GitHub Pages configuration includes `historyApiFallback` for client-side routing.

#### 2. Assets Not Loading
**Cause**: Incorrect `publicPath` configuration
**Solution**: Ensure `publicPath: '/'` in `webpack.prod.js` for custom domains

#### 3. Build Failures
**Common causes**:
- Missing dependencies: Run `yarn install`
- Node version mismatch: Use Node.js 18+
- Memory issues: Increase Node memory with `NODE_OPTIONS=--max-old-space-size=4096`

#### 4. Custom Domain Not Working
**Checklist**:
- [ ] DNS records configured correctly
- [ ] CNAME file in repository
- [ ] GitHub Pages custom domain setting
- [ ] Wait for DNS propagation (up to 24 hours)

#### 5. Deployment Workflow Failures
**Debug steps**:
1. Check GitHub Actions logs
2. Verify repository permissions
3. Ensure `GITHUB_TOKEN` has proper permissions

### Performance Optimization

#### Bundle Size Warnings
If you see webpack bundle size warnings:

```bash
# Analyze bundle size
npx webpack-bundle-analyzer build/static/js/*.js

# Consider code splitting for large components
# Use React.lazy() for route-based splitting
```

#### SASS Deprecation Warnings
The build shows SASS legacy API warnings. To fix:

```bash
# Update to modern SASS API (future enhancement)
yarn add -D sass@latest
```

## Monitoring and Maintenance

### Regular Tasks
- Monitor GitHub Actions for failed deployments
- Update dependencies monthly: `yarn upgrade-interactive`
- Check bundle size and performance metrics
- Verify SSL certificate renewal (automatic with GitHub Pages)

### Security Considerations
- ✅ HTTPS enforced
- ✅ No sensitive data in client-side code
- ✅ Dependencies regularly updated
- ✅ CSP headers (consider adding)

## Quick Commands Reference

```bash
# Development
yarn start              # Start dev server
yarn build              # Production build
yarn lint               # Run ESLint
yarn lint-fix           # Fix ESLint issues

# Deployment
yarn deploy             # Build and deploy to GitHub Pages
yarn predeploy          # Build only (runs automatically before deploy)

# Maintenance
yarn install            # Install dependencies
yarn upgrade-interactive # Update dependencies
```

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Verify DNS configuration
3. Review this deployment guide
4. Check GitHub Pages documentation

---

**Last Updated**: December 2024
**Node.js Version**: 18+
**Deployment Target**: GitHub Pages with Custom Domain