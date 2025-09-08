# 🚀 EduQuest Deployment Guide

This guide helps you deploy your EduQuest gamified learning platform to GitHub Pages.

## 📋 Prerequisites

- Node.js v18 or higher
- Git installed and configured
- GitHub account
- GitHub repository created

## 🛠️ Quick Setup for GitHub Pages

### Step 1: Update Configuration

1. **Update Vite Config**: In `vite.config.ts`, change the base path:
   ```typescript
   base: mode === 'production' ? '/your-repo-name/' : '/',
   ```
   Replace `your-repo-name` with your actual GitHub repository name.

### Step 2: Deploy Using GitHub Actions (Recommended)

1. **Automatic Deployment**: The included `.github/workflows/deploy.yml` will automatically deploy to GitHub Pages when you push to the `main` branch.

2. **Enable GitHub Pages**:
   - Go to your repository → Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will run automatically on push

### Step 3: Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

## 🌐 Accessing Your Site

Once deployed, your site will be available at:
```
https://your-username.github.io/your-repo-name/
```

## 🔧 Browser Compatibility

The app is optimized for:
- ✅ Chrome/Chromium (including Brave)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Progressive Web App Features

- **Offline Support**: Core functionality works offline
- **Mobile Optimized**: Responsive design for smartphones
- **Fast Loading**: Optimized assets and code splitting

## 🎯 Rural India Optimizations

- **Low Bandwidth**: Minimal asset sizes
- **Basic Devices**: Works on older smartphones
- **Hindi Support**: Multilingual interface ready
- **Offline First**: Critical features work without internet

## 🐛 Troubleshooting

### Common Issues:

1. **Blank Page After Deployment**:
   - Check the `base` path in `vite.config.ts`
   - Ensure it matches your repository name

2. **Assets Not Loading**:
   - Verify the `.nojekyll` file exists in the `public` folder
   - Check GitHub Pages settings

3. **Snake Game Not Working**:
   - Ensure canvas is supported in the target browser
   - Check console for JavaScript errors

## 📚 Next Steps

1. **Custom Domain**: Add your domain in GitHub Pages settings
2. **Analytics**: Add Google Analytics or similar
3. **Content**: Add more subjects and questions
4. **Localization**: Add Hindi/regional language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For deployment issues:
- Check GitHub Actions logs
- Review browser console errors
- Test locally with `npm run build && npm run preview`

Happy Learning! 🎓📚