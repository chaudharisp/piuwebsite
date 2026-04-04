# TinaCMS Setup for Azure Static Web Apps

## Quick Setup Steps:

1. **Create Tina Account**: https://app.tina.io/
2. **Connect GitHub Repo**: `krnch/piuwebsite`
3. **Add Tina to Your Site**:

```bash
npm install tinacms
```

4. **Create tina/config.js**:
```javascript
import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "your-tina-client-id",
  token: "your-tina-token",
  build: {
    outputFolder: "admin",
    publicFolder: "",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "_data",
        format: "yml",
        fields: [
          { type: "string", name: "hero_title", label: "Hero Title" },
          { type: "string", name: "hero_subtitle", label: "Hero Subtitle" },
          { type: "rich-text", name: "about", label: "About Section" },
        ],
      },
    ],
  },
});
```

5. **Benefits**:
   - ✅ No DOM manipulation issues
   - ✅ Modern React-based interface
   - ✅ GitHub OAuth built-in
   - ✅ Works perfectly with Azure Static Web Apps
   - ✅ Visual editing capabilities

## Alternative: Sanity.io (Most Robust)

**Pros**:
- Separate backend (no Azure Static Web Apps conflicts)
- Multiple authentication providers
- Real-time collaboration
- Excellent API and webhooks
- Professional support

**Setup**:
1. Create Sanity project: `npm create sanity@latest`
2. Deploy Sanity Studio to `yoursite.com/admin`
3. Use Sanity API to fetch content

Would you like me to:
1. **Set up TinaCMS** (quickest, similar to what we had)
2. **Set up Sanity.io** (most robust, but requires API integration)
3. **Try a different approach** with the current Decap CMS setup?