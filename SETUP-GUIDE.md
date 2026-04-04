# 🚀 Complete Setup Guide - Deploy Your Portfolio to Azure

This guide will walk you through deploying your static portfolio website to Azure Static Web Apps with automatic CI/CD.

## ✅ What You Already Have

- ✅ Git repository initialized
- ✅ Initial commit created (94 files)
- ✅ All Strapi/dynamic components removed
- ✅ 100% static website ready to deploy
- ✅ GitHub Actions workflow files ready

---

## 📋 Step 1: Set Up Git Identity (One-Time Setup)

Before pushing to GitHub, configure your Git identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Kanishk Chaudhari"
git config --global user.email "kanishk@example.com"
```

---

## 📋 Step 2: Create GitHub Repository

### Option A: Via GitHub Website (Recommended for Beginners)

1. **Go to**: https://github.com/new
2. **Fill in**:
   - **Repository name**: `piuwebsite` (or any name you prefer)
   - **Description**: "My portfolio website"
   - **Visibility**: Choose **Public** or **Private**
   - ❌ **DO NOT CHECK**: "Add a README file"
   - ❌ **DO NOT CHECK**: "Add .gitignore"
   - ❌ **DO NOT CHECK**: "Choose a license"
3. **Click**: "Create repository"

### Option B: Via GitHub CLI (Advanced)

```bash
gh repo create piuwebsite --public --source=. --remote=origin --push
```

---

## 📋 Step 3: Connect Local Repository to GitHub

After creating the GitHub repository, you'll see a page with setup instructions. Use these commands:

### Copy Your GitHub Repository URL

It will look like: `https://github.com/YOUR-USERNAME/piuwebsite.git`

### Run These Commands:

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/piuwebsite.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Replace** `YOUR-USERNAME` with your actual GitHub username!

### Verify Push Succeeded

You should see output like:
```
Enumerating objects: 120, done.
Counting objects: 100% (120/120), done.
...
To https://github.com/YOUR-USERNAME/piuwebsite.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 📋 Step 4: Create Azure Static Web App

### 4.1 Go to Azure Portal

1. Open: https://portal.azure.com
2. Sign in with your Microsoft account

### 4.2 Create Static Web App

1. Click **"Create a resource"** (+ icon in top left)
2. Search for **"Static Web Apps"**
3. Click **"Static Web Apps"** → **"Create"**

### 4.3 Configure Project Details

**Basics Tab:**

| Field | Value |
|-------|-------|
| **Subscription** | Select your Azure subscription |
| **Resource Group** | Click "Create new" → Name it `portfolio-rg` |
| **Name** | `piuwebsite` (or your preferred name - must be unique) |
| **Plan type** | **Free** (perfect for static sites!) |
| **Region** | Choose closest to you (e.g., `East US 2`, `West Europe`) |

### 4.4 Configure Deployment Details

**Still on Basics Tab:**

| Field | Value |
|-------|-------|
| **Deployment details** | |
| **Source** | **GitHub** |
| **Sign in with GitHub** | Click to authorize Azure |
| **Organization** | Select your GitHub username |
| **Repository** | Select **piuwebsite** |
| **Branch** | Select **main** |

### 4.5 Configure Build Details

**Still on Basics Tab:**

| Field | Value |
|-------|-------|
| **Build Presets** | **Custom** |
| **App location** | `/` (forward slash - this is the root) |
| **Api location** | (leave empty) |
| **Output location** | (leave empty) |

### 4.6 Create the Resource

1. Click **"Review + create"** at the bottom
2. Review your settings
3. Click **"Create"**

---

## 📋 Step 5: Wait for Deployment

### What Happens Now?

1. ✅ Azure creates the Static Web App resource (30 seconds)
2. ✅ Azure adds a workflow file to your GitHub repo
3. ✅ GitHub Actions automatically runs the first deployment
4. ✅ Your site goes live! (2-3 minutes total)

### Monitor Progress

1. Click **"Go to resource"** when creation completes
2. In the Overview page, look for **URL** (something like: `https://wonderful-ocean-xyz123.azurestaticapps.net`)
3. Click **"GitHub Action runs"** link to see deployment status

---

## 📋 Step 6: Access Your Live Website

### Get Your URL

1. In Azure Portal → Your Static Web App
2. Copy the **URL** (e.g., `https://wonderful-ocean-xyz123.2.azurestaticapps.net`)
3. Visit it in your browser! 🎉

### First Deployment

- First deployment takes **2-5 minutes**
- You can watch progress on GitHub: `https://github.com/YOUR-USERNAME/piuwebsite/actions`

---

## 🔧 Step 7: Making Updates (Future Edits)

Once deployed, updating your site is **super easy**:

### Option 1: Edit with GitHub Copilot (What You're Using Now!)

```bash
# Make your edits in VS Code
# Then commit and push:

git add .
git commit -m "Update homepage content"
git push
```

**That's it!** Azure automatically deploys in 1-2 minutes.

### Option 2: Edit on GitHub.com

1. Go to your repository on GitHub
2. Click any file → Click pencil icon (Edit)
3. Make changes
4. Click "Commit changes"
5. Auto-deploys!

### Option 3: Use Prose.io

1. Go to: `http://prose.io/#YOUR-USERNAME/piuwebsite`
2. Authorize with GitHub
3. Edit files
4. Save = auto-deploy!

---

## 🎯 What You Get

### Included FREE with Azure Static Web Apps:

- ✅ **Free hosting** (100 GB bandwidth/month)
- ✅ **Free SSL certificate** (HTTPS enabled)
- ✅ **Free subdomain** (`.azurestaticapps.net`)
- ✅ **Automatic CI/CD** (every push = deploy)
- ✅ **Global CDN** (fast worldwide)
- ✅ **Custom domain support** (add your own domain later)
- ✅ **Preview deployments** (for pull requests)

---

## 🔗 Step 8: Add Custom Domain (Optional - Later)

Want to use your own domain like `yourname.com`?

### After You Get a Domain:

1. In Azure Portal → Your Static Web App
2. Click **"Custom domains"** in left menu
3. Click **"+ Add"**
4. Follow instructions to add DNS records
5. Wait for DNS propagation (5-60 minutes)
6. Done! Your site is on your custom domain

---

## 📝 Quick Reference Commands

### Initial Setup (One Time)
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git remote add origin https://github.com/YOUR-USERNAME/piuwebsite.git
git branch -M main
git push -u origin main
```

### Regular Updates (Any Time)
```bash
git add .
git commit -m "Your update message"
git push
```

### Check Status
```bash
git status                    # See what changed
git log --oneline -5          # See recent commits
git remote -v                 # See GitHub connection
```

---

## 🆘 Troubleshooting

### Problem: "Permission denied" when pushing to GitHub

**Solution**: Set up GitHub authentication

**Option 1 - Use Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name, select "repo" scope
4. Copy the token
5. When Git asks for password, paste the token

**Option 2 - Use SSH (Advanced):**
```bash
ssh-keygen -t ed25519 -C "your@email.com"
# Add key to GitHub: Settings → SSH keys
```

### Problem: Deployment failed

**Solution**: Check GitHub Actions
1. Go to: `https://github.com/YOUR-USERNAME/piuwebsite/actions`
2. Click the failed run
3. Read error message
4. Common fix: Check build settings in Azure Portal

### Problem: Site shows old content

**Solution**: Clear browser cache
- Press `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Or open incognito window

---

## ✅ Checklist

Use this to track your progress:

- [ ] Step 1: Git identity configured
- [ ] Step 2: GitHub repository created
- [ ] Step 3: Code pushed to GitHub
- [ ] Step 4: Azure Static Web App created
- [ ] Step 5: First deployment completed
- [ ] Step 6: Website accessible at Azure URL
- [ ] Step 7: Made a test update (optional)
- [ ] Step 8: Custom domain added (optional, later)

---

## 🎉 You're Done!

Your portfolio is now:
- ✅ Live on the internet
- ✅ Auto-deploying on every change
- ✅ Hosted on Azure's global CDN
- ✅ Secure with HTTPS
- ✅ Ready to customize!

### Next Steps:

1. **Customize content**: Edit HTML files with your information
2. **Add your resume**: Update `resume.html`
3. **Write blog posts**: Add files to `blog/` folder
4. **Share your URL**: Send it to friends, add to LinkedIn!

---

## 📚 Additional Resources

- **Azure Static Web Apps Docs**: https://docs.microsoft.com/en-us/azure/static-web-apps/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

**Questions?** Just ask! You've got this! 💪
