# 🔐 Azure AD Client Secret Setup Guide

## ❓ **Client Secret: ID vs Value - Which One to Use?**

When you create a client secret in Azure AD, you get **TWO things**:

### **1. Secret ID** 
- **Format**: `12345678-1234-1234-1234-123456789012`
- **Purpose**: Just an identifier for the secret
- **❌ DON'T USE THIS** as the environment variable

### **2. Secret Value**
- **Format**: `abc123XYZ~defgh.ijklmn_opqrs456`
- **Purpose**: The actual secret password
- **✅ USE THIS** as the `AZURE_CLIENT_SECRET` environment variable

## 🎯 **What You Need for Environment Variables:**

```
AZURE_CLIENT_ID = 56ef6166-2828-42e2-a302-dbec5e409201
AZURE_CLIENT_SECRET = [The SECRET VALUE, not the Secret ID]
```

## 🔍 **How to Get the Secret Value:**

### **Step 1: Go to Azure Portal**
1. Navigate to [Azure Portal](https://portal.azure.com)
2. Go to **Azure Active Directory** > **App registrations**
3. Find your app with Client ID: `56ef6166-2828-42e2-a302-dbec5e409201`

### **Step 2: Get or Create Secret**
1. Click **"Certificates & secrets"** in left menu
2. Under **"Client secrets"**:
   - If you have an existing secret: **You can only see the VALUE once when created**
   - If you need a new secret: Click **"New client secret"**

### **Step 3: Create New Secret (if needed)**
1. Click **"New client secret"**
2. **Description**: `Static Web App Auth`
3. **Expires**: `24 months` (recommended)
4. Click **"Add"**
5. **COPY THE VALUE IMMEDIATELY** - you can't see it again!

### **Step 4: Set Environment Variable**
Use the **VALUE** (not the ID) in your Azure Static Web Apps:
```
AZURE_CLIENT_SECRET = abc123XYZ~defgh.ijklmn_opqrs456
```

## ⚠️ **Important Notes:**

- **Secret VALUE** can only be viewed **once** when created
- If you lost the value, you must **create a new secret**
- **Secret ID** is just for identification - not used in authentication
- Secrets expire - set a reminder to renew them

## 🔧 **Alternative: GitHub Token for File Operations**

For the custom editor to work properly, you also need:
```
GITHUB_TOKEN = ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

This allows the admin interface to commit changes directly to GitHub.

### **How to Get GitHub Token:**
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. **Scopes needed**: `repo` (full repository access)
4. Copy the token and add as `GITHUB_TOKEN` environment variable

## 🎯 **Complete Environment Variables Setup:**

```
AZURE_CLIENT_ID = 56ef6166-2828-42e2-a302-dbec5e409201
AZURE_CLIENT_SECRET = [Your Azure AD app secret VALUE]
GITHUB_TOKEN = [Your GitHub personal access token]
GITHUB_CLIENT_ID = [If you want GitHub auth as backup]
GITHUB_CLIENT_SECRET = [If you want GitHub auth as backup]
```

## 🧪 **Testing:**

After setting up environment variables:
1. Go to https://red-plant-033de6c1e.2.azurestaticapps.net/admin/auth-setup
2. Try Azure AD login
3. Should redirect to Microsoft login
4. After login, should show admin interface
5. Try editing a file and saving - should commit to GitHub automatically

The custom editor will then work with **automatic GitHub commits** every time you save!