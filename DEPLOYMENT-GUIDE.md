# 🚀 Portfolio Website Deployment Guide

Complete step-by-step instructions for deploying your Product Manager portfolio to Azure Static Web Apps.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:
- [ ] Azure account (free tier available)
- [ ] GitHub account
- [ ] Your portfolio code pushed to GitHub repository
- [ ] Personal content added (name, email, photos, etc.)

## 🌐 Option 1: Azure Static Web Apps (Recommended)

### Step 1: Prepare Your GitHub Repository

1. **Create GitHub Repository**:
   ```bash
   # Navigate to your project folder
   cd c:\Users\kachaudhari\piuwebsite
   
   # Initialize git (if not already done)
   git init
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial commit: Product Manager Portfolio"
   
   # Add remote repository (replace with your GitHub repo URL)
   git remote add origin https://github.com/yourusername/your-portfolio.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Verify Repository Structure**:
   Your GitHub repo should contain:
   ```
   ├── index.html
   ├── resume.html
   ├── blog.html
   ├── css/style.css
   ├── js/script.js
   ├── staticwebapp.config.json
   ├── .github/workflows/azure-static-web-apps.yml
   └── README.md
   ```

### Step 2: Create Azure Static Web App

1. **Login to Azure Portal**:
   - Go to [portal.azure.com](https://portal.azure.com)
   - Sign in with your Microsoft account

2. **Create Static Web App**:
   - Click "Create a resource"
   - Search for "Static Web Apps"
   - Click "Create"

3. **Configure Basic Settings**:
   ```
   Subscription: [Your subscription]
   Resource Group: Create new "portfolio-rg"
   Name: your-portfolio-app
   Plan type: Free
   Region: Central US (or closest to you)
   ```

4. **Configure GitHub Integration**:
   ```
   Source: GitHub
   Organization: [Your GitHub username]
   Repository: [Your portfolio repository]
   Branch: main
   ```

5. **Build Configuration**:
   ```
   Build Presets: Custom
   App location: /
   Api location: (leave empty)
   Output location: (leave empty)
   ```

6. **Review and Create**:
   - Click "Review + create"
   - Click "Create"

### Step 3: Verify Deployment

1. **Check GitHub Actions**:
   - Go to your GitHub repository
   - Click "Actions" tab
   - You should see a workflow running
   - Wait for it to complete (green checkmark)

2. **Access Your Website**:
   - In Azure Portal, go to your Static Web App
   - Copy the URL from the "URL" field
   - Open in browser to verify deployment

### Step 4: Configure Custom Domain (Optional)

1. **Purchase Domain** (if needed):
   - Use providers like Namecheap, GoDaddy, or Google Domains

2. **Configure DNS**:
   - In your domain provider, add CNAME record:
   ```
   Type: CNAME
   Name: www (or @)
   Value: [your-static-web-app-url]
   ```

3. **Add Custom Domain in Azure**:
   - Go to your Static Web App in Azure Portal
   - Click "Custom domains" in left menu
   - Click "Add" and enter your domain
   - Validate domain ownership

## 🔧 Option 2: Alternative Deployment Options

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd c:\Users\kachaudhari\piuwebsite
   vercel --prod
   ```

3. **Follow prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Get deployment URL

### Netlify Deployment

1. **Drag & Drop Method**:
   - Go to [netlify.com](https://netlify.com)
   - Drag your project folder to deploy area
   - Get instant URL

2. **GitHub Integration Method**:
   - Connect GitHub account
   - Select your repository
   - Configure build settings:
     ```
     Build command: (leave empty)
     Publish directory: /
     ```

### GitHub Pages

1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select source: "Deploy from a branch"
   - Branch: main
   - Folder: / (root)

2. **Access URL**:
   - Your site will be at: `https://yourusername.github.io/repository-name`

## 🔄 Continuous Deployment Setup

Your Azure Static Web App is already configured for continuous deployment! Every time you push changes to your GitHub repository:

1. **Make Changes Locally**:
   ```bash
   # Edit your files
   # Test locally
   
   # Add changes
   git add .
   
   # Commit with descriptive message
   git commit -m "Update: Added new project to portfolio"
   
   # Push to GitHub
   git push
   ```

2. **Automatic Deployment**:
   - GitHub Actions will automatically run
   - Changes will be deployed to your live site
   - Usually takes 2-5 minutes

## 🛠️ Post-Deployment Tasks

### 1. Update Personal Information
Replace all placeholder content:
- [ ] Your actual name throughout all files
- [ ] Professional email address
- [ ] Phone number and location
- [ ] LinkedIn and social media links
- [ ] Professional headshot photo

### 2. Add Real Content
- [ ] Upload actual resume PDF
- [ ] Add real project screenshots
- [ ] Write actual blog posts
- [ ] Upload PRD files and update links

### 3. Configure Analytics
Add Google Analytics tracking:
```html
<!-- Add to <head> section of all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 4. SEO Optimization
- [ ] Update meta descriptions in all HTML files
- [ ] Add relevant keywords
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console

### 5. Performance Testing
Test your site:
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] [GTmetrix](https://gtmetrix.com/)
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing

## 🔒 Security & Maintenance

### Security Headers
Your `staticwebapp.config.json` includes security headers:
```json
{
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'self'"
  }
}
```

### Regular Maintenance
- [ ] Monthly content updates
- [ ] Quarterly security reviews
- [ ] Annual design refreshes
- [ ] Regular backup of content

## 🆘 Troubleshooting Common Issues

### Deployment Fails
1. Check GitHub Actions logs
2. Verify file structure
3. Check for syntax errors in HTML/CSS
4. Ensure all files are committed

### Site Not Loading
1. Verify DNS settings (if using custom domain)
2. Check Azure Static Web App status
3. Clear browser cache
4. Test in incognito mode

### Analytics Not Working
1. Verify Google Analytics ID
2. Check if tracking code is in all pages
3. Wait 24-48 hours for data to appear
4. Test with Google Analytics Debugger

## 📊 Monitoring Your Site

### Built-in Azure Monitoring
- View deployment history
- Monitor traffic and performance
- Set up alerts for downtime

### External Monitoring Tools
- Google Analytics for traffic analysis
- Google Search Console for SEO
- Uptime monitoring services

## 💡 Pro Tips

1. **Use Environment Variables**: Store sensitive data in Azure App Settings
2. **Enable HTTPS**: Azure Static Web Apps provides HTTPS by default
3. **Optimize Images**: Compress images before uploading
4. **Test Locally**: Always test changes locally before deploying
5. **Version Control**: Use meaningful commit messages
6. **Backup Strategy**: Keep local copies and consider automated backups

## 🎯 Success Metrics

Your deployment is successful when:
- ✅ Site loads fast (< 3 seconds)
- ✅ Mobile responsive on all devices
- ✅ All links and features work
- ✅ Contact forms submit properly
- ✅ Analytics tracking is active
- ✅ Custom domain is configured (if applicable)

---

**🚀 Your Product Manager portfolio is now live and ready to showcase your expertise!**

Need help with any specific step? Check the troubleshooting section or refer to the detailed guides in the `/explainers` folder.