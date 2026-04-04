# ✅ Azure Deployment Quick Checklist

**Print this out or keep it open while deploying!**

## 🚀 **Pre-Deployment** (5 minutes)
- [ ] All files committed to GitHub
- [ ] Azure account ready
- [ ] GitHub account ready

```powershell
cd c:\Users\kachaudhari\piuwebsite
git add .
git commit -m "Add admin interface and Azure configuration"
git push origin main
```

## 🌐 **Azure Static Web App Setup** (10 minutes)

### Create Resource:
- [ ] Go to [portal.azure.com](https://portal.azure.com)
- [ ] Create a resource → Search "Static Web Apps" → Create
- [ ] **Resource Group**: Create new "portfolio-resources"
- [ ] **Name**: "your-portfolio-pm" (unique name)
- [ ] **Plan**: Free
- [ ] **Region**: Central US

### GitHub Integration:
- [ ] **Source**: GitHub
- [ ] **Sign in** to GitHub account
- [ ] **Repository**: Select your portfolio repo
- [ ] **Branch**: main

### Build Settings:
- [ ] **Build Presets**: Custom
- [ ] **App location**: /
- [ ] **Api location**: api
- [ ] **Output location**: (empty)

- [ ] Click **Create** and wait 3-5 minutes

## 🔐 **GitHub OAuth Setup** (5 minutes)

### Create OAuth App:
- [ ] Go to [github.com](https://github.com) → Settings → Developer settings → OAuth Apps
- [ ] **New OAuth App**
- [ ] **Name**: Portfolio CMS Admin
- [ ] **Homepage URL**: https://your-portfolio-pm.azurestaticapps.net
- [ ] **Callback URL**: https://your-portfolio-pm.azurestaticapps.net/admin/
- [ ] **Register application**

### Save Credentials:
- [ ] Copy **Client ID**: `_________________`
- [ ] Generate and copy **Client Secret**: `_________________`

## ⚙️ **Azure Authentication Setup** (10 minutes)

### Enable Authentication:
- [ ] Azure Portal → Your Static Web App → **Authentication**
- [ ] **Add identity provider** → **GitHub**
- [ ] **Client ID**: [Paste from above]
- [ ] **Client secret setting name**: GITHUB_CLIENT_SECRET
- [ ] **Custom roles API path**: `/api/roles` 
- [ ] Click **Add**

### Application Settings:
- [ ] Same Static Web App → **Configuration**
- [ ] **Add** application setting:
  - **Name**: GITHUB_CLIENT_SECRET
  - **Value**: [Paste Client Secret from above]
- [ ] **Add** application setting:
  - **Name**: SITE_URL
  - **Value**: https://your-portfolio-pm.azurestaticapps.net
- [ ] Click **Save**

## 📝 **Update Configuration Files** (5 minutes)

### Update admin/config.yml:
- [ ] Replace `YOUR-GITHUB-USERNAME/YOUR-REPO-NAME` with actual values
- [ ] Replace `https://your-portfolio-pm.azurestaticapps.net` with your actual Azure URL

```powershell
git add admin/config.yml
git commit -m "Update admin config with Azure URL and GitHub repo"
git push origin main
```
- [ ] Wait 2-3 minutes for deployment

## 🧪 **Testing Phase** (15 minutes)

### Get Your URLs:
- **Live Site**: `https://________________.azurestaticapps.net`
- **Admin Interface**: `https://________________.azurestaticapps.net/admin/`

### Test Basic Website:
- [ ] Homepage loads ✅
- [ ] Resume page works ✅
- [ ] Blog page works ✅
- [ ] Analytics section shows data ✅
- [ ] PRD modals open ✅
- [ ] Mobile responsive ✅

### Test Admin Interface:
- [ ] Go to `/admin/` → Redirects to GitHub login ✅
- [ ] Login with GitHub → Returns to CMS dashboard ✅
- [ ] CMS interface loads without errors ✅

### Test Content Management:
- [ ] Create new blog post ✅
- [ ] Upload test image ✅
- [ ] Save and publish ✅
- [ ] Check GitHub for auto-commit ✅
- [ ] Verify changes appear on live site ✅

## 🎉 **Success Indicators**

You'll know everything is working when:
- ✅ Your website loads at your Azure URL
- ✅ `/admin/` redirects to GitHub login
- ✅ After login, you see the CMS dashboard
- ✅ You can create/edit content in the CMS
- ✅ Changes automatically appear on your live site

## 🚨 **Quick Troubleshooting**

**Admin shows setup screen instead of CMS?**
→ Check GitHub OAuth callback URL matches your Azure URL exactly

**CMS can't save changes?**
→ Verify GitHub OAuth app permissions and repository access

**Changes don't appear on site?**
→ Check GitHub Actions completed successfully

**Authentication fails?**
→ Try incognito browser window and re-check OAuth app settings

---

## 📞 **Your Deployment Info**

Fill this out as you go:

**Azure Static Web App Name**: `_________________`
**Live Site URL**: `https://________________.azurestaticapps.net`
**Admin URL**: `https://________________.azurestaticapps.net/admin/`
**GitHub Repo**: `________________/________________`
**GitHub OAuth Client ID**: `_________________`

---

**🎯 Total Time: ~35 minutes**
**🚀 Result: Professional PM portfolio with enterprise CMS!**