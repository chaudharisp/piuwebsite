# Azure Deployment Guide

This guide will walk you through deploying your portfolio website to Azure Static Web Apps, making it accessible to the world.

## 🚀 Why Azure Static Web Apps?

- **Free tier available** - Perfect for portfolio sites
- **Global CDN** - Fast loading worldwide
- **Custom domains** - Use your own domain name
- **SSL certificates** - Automatic HTTPS
- **CI/CD integration** - Auto-deploy when you push code changes

## 📋 Prerequisites

Before you start:
- [ ] Azure account (free tier works fine)
- [ ] GitHub account
- [ ] Your website files ready (completed previous guides)
- [ ] Git installed on your computer

## 🔧 Step 1: Prepare Your Code Repository

### Create GitHub Repository

1. **Go to GitHub.com** and sign in
2. **Click "New repository"**
3. **Repository settings:**
   - Name: `portfolio-website` (or your preferred name)
   - Description: `My personal portfolio website`
   - Public or Private: Choose based on preference
   - Initialize with README: No (we already have files)

4. **Click "Create repository"**

### Push Your Code to GitHub

Open terminal/command prompt in your website folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial portfolio website"

# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/portfolio-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## ☁️ Step 2: Create Azure Static Web App

### Access Azure Portal

1. **Go to** [portal.azure.com](https://portal.azure.com)
2. **Sign in** with your Azure account
3. **Click "Create a resource"**
4. **Search for** "Static Web Apps"
5. **Click "Create"**

### Configure Your Static Web App

**Basics Tab:**
- **Subscription:** Select your Azure subscription
- **Resource Group:** Create new or use existing
- **Name:** `your-name-portfolio` (must be globally unique)
- **Plan type:** Free (for personal use)
- **Region:** Choose closest to your audience

**Deployment Tab:**
- **Source:** GitHub
- **GitHub account:** Sign in and authorize Azure
- **Organization:** Your GitHub username
- **Repository:** Select your portfolio repository
- **Branch:** main

**Build Details:**
- **Build presets:** Custom
- **App location:** `/` (root folder)
- **Api location:** (leave empty)
- **Output location:** (leave empty)

### Complete Setup

1. **Click "Review + create"**
2. **Review settings**
3. **Click "Create"**

Azure will now:
- Create your Static Web App resource
- Set up a GitHub Actions workflow
- Deploy your site automatically

## 🔄 Step 3: Monitor Deployment

### Check GitHub Actions

1. **Go to your GitHub repository**
2. **Click "Actions" tab**
3. **Watch the deployment workflow run**
4. **Wait for green checkmark** (usually 2-5 minutes)

### Access Your Live Site

1. **Return to Azure Portal**
2. **Go to your Static Web App resource**
3. **Click "Browse"** or copy the URL
4. **Your site is now live!**

Default URL format: `https://your-app-name.azurestaticapps.net`

## 🌐 Step 4: Custom Domain (Optional)

### Purchase/Configure Domain

1. **Buy domain** from registrar (GoDaddy, Namecheap, etc.)
2. **In Azure Portal**, go to your Static Web App
3. **Click "Custom domains"**
4. **Click "Add"**
5. **Enter your domain name**
6. **Choose validation method:**
   - DNS TXT record (recommended)
   - CNAME record

### DNS Configuration

**For DNS TXT validation:**
1. **Copy the TXT record value** from Azure
2. **Go to your domain registrar's DNS settings**
3. **Add TXT record:**
   - Name: `@` (or leave blank)
   - Value: (paste from Azure)
   - TTL: 300 (or default)

**For CNAME validation:**
1. **Add CNAME record:**
   - Name: `www`
   - Value: `your-app-name.azurestaticapps.net`

### Complete Domain Setup

1. **Wait for DNS propagation** (5-60 minutes)
2. **Return to Azure Portal**
3. **Click "Validate"**
4. **Once validated, your custom domain is active**

## 🔄 Step 5: Automatic Updates

### How It Works

Every time you push changes to your GitHub repository:
1. GitHub Actions automatically triggers
2. Your site rebuilds and redeploys
3. Changes appear live within minutes

### Making Updates

```bash
# Make your changes to files
# Then commit and push

git add .
git commit -m "Updated resume and added new blog post"
git push origin main

# Site will auto-update!
```

## 📊 Step 6: Monitor Performance

### Azure Analytics

1. **In Azure Portal**, go to your Static Web App
2. **Check "Functions and staging"** for metrics
3. **Monitor bandwidth usage**
4. **Review deployment history**

### Add Google Analytics (Optional)

Add to all HTML files before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Common Issues

**Build Fails:**
- Check GitHub Actions logs for errors
- Ensure all file paths are correct
- Verify HTML syntax is valid

**Site Not Loading:**
- Wait for DNS propagation (up to 24 hours)
- Clear browser cache
- Check Azure Portal for deployment status

**404 Errors:**
- Ensure `404.html` exists in root folder
- Check `staticwebapp.config.json` routing rules

**Custom Domain Not Working:**
- Verify DNS records are correct
- Wait for propagation
- Try different validation method

### Getting Help

1. **Azure Documentation:** [Azure Static Web Apps docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
2. **GitHub Actions Logs:** Check for build errors
3. **Azure Support:** Use help chat in Azure Portal

## 💰 Cost Management

### Free Tier Limits

Azure Static Web Apps free tier includes:
- **Bandwidth:** 100 GB/month
- **Storage:** 0.5 GB
- **Custom domains:** Unlimited
- **SSL certificates:** Included

For most portfolio sites, this is more than enough.

### Monitoring Usage

1. **Azure Portal** → Your Static Web App
2. **Click "Cost Management"**
3. **Monitor monthly usage**
4. **Set up billing alerts** if needed

## 🎉 Your Site is Live!

Congratulations! Your portfolio website is now:
- ✅ Live on the internet
- ✅ Fast and secure
- ✅ Automatically updating
- ✅ Professional looking

### Share Your Site

- Add URL to your resume
- Update LinkedIn profile
- Share on social media
- Include in email signatures

---

**Next Steps:**
- Regularly update your resume and blog
- Monitor site performance
- Consider adding contact form functionality
- Keep your projects and skills current

**Your live site:** `https://your-domain.com` 🚀