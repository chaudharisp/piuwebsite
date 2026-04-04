# 🔧 Fix GitHub OAuth for Admin Interface

## The Problem
The admin interface GitHub login is failing because the OAuth app isn't properly configured for Netlify CMS with Azure Static Web Apps.

## 🎯 Solution Steps

### Step 1: Create GitHub OAuth App
1. Go to: https://github.com/settings/applications/new
2. Fill in:
   - **Application name**: `Portfolio CMS Admin`
   - **Homepage URL**: `https://red-plant-033de6c1e.2.azurestaticapps.net`
   - **Application description**: `CMS for portfolio website`
   - **Authorization callback URL**: `https://red-plant-033de6c1e.2.azurestaticapps.net/api/auth`

3. Click "Register application"
4. **COPY THE CLIENT ID** (you'll need this)
5. Click "Generate a new client secret"
6. **COPY THE CLIENT SECRET** (you'll need this)

### Step 2: Add Settings to Azure
1. Go to Azure Portal → Your Static Web App
2. Go to **Configuration** → **Application settings**
3. Add these settings:
   - **Name**: `GITHUB_CLIENT_ID` **Value**: [Your Client ID from Step 1]
   - **Name**: `GITHUB_CLIENT_SECRET` **Value**: [Your Client Secret from Step 1]
   - **Name**: `SITE_URL` **Value**: `https://red-plant-033de6c1e.2.azurestaticapps.net`

4. Click **Save**

### Step 3: Test the Flow
1. Wait 2-3 minutes for settings to apply
2. Go to: `https://red-plant-033de6c1e.2.azurestaticapps.net/admin/`
3. Click "Login with GitHub"
4. You should be redirected to GitHub, then back to the CMS dashboard

## 🚨 Important Notes
- The callback URL MUST be: `/api/auth` (not `/admin/`)
- Both Client ID and Client Secret are required
- Settings take 2-3 minutes to apply in Azure

## ✅ Success Indicators
- GitHub login redirects properly (no 404)
- After GitHub auth, you return to CMS with dashboard visible
- You can create/edit content in the CMS interface

## 🔍 Troubleshooting
If it still doesn't work:
1. Check Azure Application Settings are saved correctly
2. Verify GitHub OAuth app callback URL is exact: `https://red-plant-033de6c1e.2.azurestaticapps.net/api/auth`
3. Try in incognito/private browser window
4. Check browser console for any JavaScript errors