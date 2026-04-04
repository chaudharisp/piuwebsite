# ⚡ Quick Deployment Checklist

**Goal**: Get your Product Manager portfolio live in 30 minutes

## 🏃‍♂️ Step 1: GitHub Setup (5 minutes)

### If you don't have the code in GitHub yet:
```powershell
# Open PowerShell in your project directory
cd c:\Users\kachaudhari\piuwebsite

# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: PM Portfolio Website"

# Create repository on GitHub.com (do this in browser):
# 1. Go to github.com
# 2. Click "New repository"
# 3. Name it "pm-portfolio" or similar
# 4. Don't initialize with README (you already have files)
# 5. Click "Create repository"

# Link your local repo to GitHub (replace with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/pm-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Azure Static Web Apps (15 minutes)

### Quick Setup:
1. **Go to Azure Portal**: [portal.azure.com](https://portal.azure.com)
2. **Create Resource** → Search "Static Web Apps" → Create
3. **Fill Basic Info**:
   - Name: `your-name-portfolio`
   - Resource Group: Create new `portfolio-rg`
   - Region: `Central US`
4. **GitHub Integration**:
   - Sign in to GitHub
   - Select your repository
   - Branch: `main`
5. **Build Details**:
   - App location: `/`
   - Leave API and Output empty
6. **Create** (takes 2-3 minutes)

## ✅ Step 3: Verify Deployment (5 minutes)

1. **Check GitHub**: Go to your repo → Actions tab → Should see green checkmark
2. **Get URL**: In Azure Portal → Your Static Web App → Copy URL
3. **Test Site**: Open URL in browser
4. **Test Features**:
   - [ ] Homepage loads
   - [ ] Resume page works
   - [ ] Blog page works
   - [ ] Analytics section shows data
   - [ ] PRD links open modals

## 🎯 Step 4: Immediate Customization (5 minutes)

### Replace these ASAP:
1. **Your Name**: Update "Your Name" in all HTML files
2. **Contact Info**: Update email, phone in resume.html
3. **Title**: Make sure it says "Senior Product Manager"

Quick find/replace in VS Code:
- `Ctrl+Shift+H` → Find: "Your Name" → Replace: "Your Actual Name"
- `Ctrl+Shift+H` → Find: "your.email@example.com" → Replace: "your@email.com"

## 🚀 You're Live!

Your portfolio is now deployed at: `https://[your-app-name].azurestaticapps.net`

## 📝 Next Steps (Do Later)

- [ ] Add your professional photo
- [ ] Upload actual PRD files
- [ ] Write real blog posts
- [ ] Set up custom domain
- [ ] Add Google Analytics
- [ ] Update with your real experience

## 🆘 If Something Goes Wrong

**Common Issues:**
1. **GitHub Actions fails**: Check for syntax errors in HTML/CSS
2. **Site doesn't load**: Wait 5-10 minutes, Azure needs time to propagate
3. **Features don't work**: Clear browser cache and try again

**Quick Fixes:**
```powershell
# If you need to update and redeploy:
git add .
git commit -m "Fix: Updated content"
git push
# Wait 2-3 minutes for auto-deployment
```

---

**🎉 Congratulations! Your Product Manager portfolio is now live on the internet!**

Share your URL with potential employers and start showcasing your PM expertise!