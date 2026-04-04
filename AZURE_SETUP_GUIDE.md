# 🔧 Azure Static Web Apps - Environment Variables Setup

## 🎯 **Required Environment Variables**

You need to configure these in your Azure Static Web Apps settings:

### **Azure AD Configuration:**
- **`AZURE_CLIENT_ID`** = `56ef6166-2828-42e2-a302-dbec5e409201`
- **`AZURE_CLIENT_SECRET`** = `[Your Azure AD App Secret]`

### **GitHub Configuration (if you want both):**
- **`GITHUB_CLIENT_ID`** = `[Your GitHub OAuth App Client ID]`
- **`GITHUB_CLIENT_SECRET`** = `[Your GitHub OAuth App Secret]`

## 🚀 **How to Set Environment Variables in Azure:**

### **Method 1: Azure Portal**
1. **Go to**: [Azure Portal](https://portal.azure.com)
2. **Find your Static Web App**: `red-plant-033de6c1e`
3. **Click**: "Configuration" in left menu
4. **Click**: "Application settings"
5. **Add each variable**:
   - Name: `AZURE_CLIENT_ID`
   - Value: `56ef6166-2828-42e2-a302-dbec5e409201`
   - Click "OK"
6. **Repeat for other variables**
7. **Click**: "Save"

### **Method 2: Azure CLI**
```bash
# Set Azure AD variables
az staticwebapp appsettings set \
  --name "red-plant-033de6c1e" \
  --setting-names AZURE_CLIENT_ID="56ef6166-2828-42e2-a302-dbec5e409201"

az staticwebapp appsettings set \
  --name "red-plant-033de6c1e" \
  --setting-names AZURE_CLIENT_SECRET="[your-secret]"
```

## 🔑 **Getting Your Azure AD App Secret:**

1. **Go to**: [Azure Portal](https://portal.azure.com)
2. **Navigate to**: Azure Active Directory → App registrations
3. **Find your app**: With client ID `56ef6166-2828-42e2-a302-dbec5e409201`
4. **Click**: "Certificates & secrets"
5. **Create new secret** if needed:
   - Click "New client secret"
   - Description: "Static Web App Auth"
   - Expires: 24 months
   - Click "Add"
6. **Copy the secret value** (you can only see it once!)

## 🔗 **Redirect URI Configuration:**

Make sure your Azure AD app has these redirect URIs:
- `https://red-plant-033de6c1e.2.azurestaticapps.net/.auth/login/aad/callback`
- `https://wonderful-ground-0bafebc10.5.azurestaticapps.net/.auth/login/aad/callback` (if using both domains)

## 📄 **Admin Pages Structure:**

### **Main Admin Dashboard:**
- **URL**: `/admin/` or `/admin/index.html`
- **Purpose**: Lists all 4 editing options
- **Access**: Public (shows login options if not authenticated)

### **Custom Editor:**
- **URL**: `/admin/editor` or `/admin/editor.html`
- **Purpose**: Your custom web-based editor
- **Access**: Requires authentication (Azure AD or GitHub)
- **Features**: 
  - Edit HTML pages (index.html, resume.html, etc.)
  - Edit YAML data files (_data/*.yml)
  - Create new pages ad-hoc
  - Mobile-friendly interface

### **External Options:**
- **Prose.io**: Links to `http://prose.io` (external service)
- **GitHub**: Links to your GitHub repository
- **Decap CMS**: Embedded in main admin page (may have auth issues)

## 🧪 **Testing Authentication:**

1. **Visit**: https://red-plant-033de6c1e.2.azurestaticapps.net/admin/editor
2. **Should see**: Login options (Azure AD + GitHub)
3. **Click**: "Login with Azure AD"
4. **Should redirect**: To Microsoft login
5. **After login**: Should see admin interface with your name

## ⚠️ **Troubleshooting:**

### **If Azure AD login fails:**
1. Check environment variables are set correctly
2. Verify redirect URIs in Azure AD app
3. Check Azure AD app secret hasn't expired
4. Ensure app is configured for "Web" platform

### **If custom editor doesn't load:**
1. Check browser console for errors
2. Verify user has "authenticated" role
3. Check API endpoints are accessible

## 🎯 **Current Status:**

✅ **Custom editor created**: `/admin/editor.html`  
✅ **API endpoints created**: `/api/get-file`, `/api/save-file`  
✅ **Routes configured**: Authentication required for editor  
✅ **Azure AD provider configured**: In staticwebapp.config.json  
⚠️ **Environment variables**: Need to be set in Azure Portal  
⚠️ **Azure AD app secret**: Needs to be added to environment variables  

## 🚀 **Next Steps:**

1. **Set environment variables** in Azure Static Web Apps
2. **Test Azure AD login** at `/admin/editor`
3. **Start editing your pages** with the custom editor!

The custom editor will give you **complete control** over your website with **enterprise-grade security**!