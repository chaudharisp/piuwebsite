# Azure AD (Microsoft Entra ID) Setup for Decap CMS

## Why Azure AD is Better for Azure Static Web Apps:

✅ **Native Azure integration** - designed to work together
✅ **No custom OAuth endpoints** - Azure handles authentication
✅ **Enterprise-grade security** - Microsoft's authentication system
✅ **Seamless with Azure Static Web Apps** - built-in support

## Setup Steps:

### 1. Register Azure AD Application (5 minutes)
1. Go to **Azure Portal** → **Azure Active Directory** → **App registrations**
2. Click **"New registration"**
3. Configure:
   - **Name**: "Portfolio CMS"
   - **Supported account types**: "Accounts in this organizational directory only"
   - **Redirect URI**: 
     - Type: **Single-page application (SPA)**
     - URL: `https://red-plant-033de6c1e.2.azurestaticapps.net/admin/`

### 2. Configure Application Settings
1. **API permissions**:
   - Add **Microsoft Graph** → **User.Read** (delegated)
   - Add **Custom API** for GitHub access if needed

2. **Authentication**:
   - Enable **Access tokens** and **ID tokens**
   - Add additional redirect URIs if needed

3. **Copy Application (client) ID** - you'll need this

### 3. Update Decap CMS Configuration
```javascript
backend: {
    name: 'azure',
    repo: 'krnch/piuwebsite',
    branch: 'main',
    client_id: 'your-azure-ad-client-id',
    base_url: 'https://red-plant-033de6c1e.2.azurestaticapps.net'
}
```

### 4. Update Azure Static Web App Settings
Add environment variables:
- `AZURE_CLIENT_ID`: Your Azure AD application client ID
- `AZURE_TENANT_ID`: Your Azure tenant ID

## Benefits:
- **No custom OAuth code** - delete `api/auth/` entirely
- **Microsoft's proven authentication** - handles all edge cases
- **Better security** - enterprise-grade authentication
- **Azure ecosystem integration** - designed to work together

Would you like me to implement this approach?