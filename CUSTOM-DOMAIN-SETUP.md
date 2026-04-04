# 🌐 Custom Domain Setup Guide

## ✅ Domain Registration - COMPLETED

**Domain**: `priyankac.qzz.io`
**Registrar**: FreeDomain (DigitalPlat - qzz.io)
**Registration Date**: April 3, 2026
**Expiration**: April 3, 2027 (free renewal available)

---

## 📋 Steps Completed

### **Step 1: Created Azure DNS Zone** ✅

**Resource**: Azure DNS Zone
- **Name**: `priyankac.qzz.io`
- **Resource Group**: `piu-portfolio-website`
- **Subscription**: Visual Studio Enterprise Subscription

**Azure Nameservers** (provided to FreeDomain):
```
ns1-09.azure-dns.com
ns2-09.azure-dns.net
```

---

### **Step 2: Registered Domain with FreeDomain** ✅

**What we did**:
1. Went to: https://github.com/DigitalPlatDev/FreeDomain
2. Chose domain: `priyankac.qzz.io`
3. Provided 2 Azure nameservers (from Step 1)
4. Submitted registration
5. **Approved**: April 3, 2026

**Nothing else needed on FreeDomain** - nameservers are set and working! ✅

---

### **Step 3: Connected Custom Domain to Azure Static Web App** ✅

**What we did**:
1. Went to Azure Static Web Apps → `piuwebsite`
2. Clicked "Custom domains" → "+ Add"
3. Selected DNS zone: `priyankac.qzz.io`
4. Left subdomain blank (using root domain)
5. Clicked "Add"

**Azure Automatically**:
- ✅ Created DNS records in Azure DNS Zone
- ✅ Validated domain ownership
- ✅ Provisioned free SSL certificate
- ✅ Configured Static Web App to accept traffic

---

## 🌐 Your Live URLs

**Azure Default URL** (still works):
```
https://lemon-coast-0d8cb9510.7.azurestaticapps.net
```

**Custom Domain** (your new URL):
```
https://priyankac.qzz.io
```

Both URLs point to the same website! ✅

---

## 🔒 SSL Certificate

**Status**: Automatically provisioned by Azure
- ✅ Free SSL certificate
- ✅ HTTPS enabled
- ✅ Auto-renewed by Azure

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| **Domain Registration** | **FREE** (via FreeDomain) |
| **Azure DNS Zone** | **~$0.50/month** |
| **Azure Static Web Apps** | **FREE** (Free tier) |
| **SSL Certificate** | **FREE** (included) |
| **Total** | **~$0.50/month** |

---

## 🔄 How to Update Your Site

### **Method 1: VS Code + Copilot** (Current Setup)

```bash
# Make changes to your files
# Then commit and push:
git add .
git commit -m "Updated content"
git push origin main
```

**Site updates automatically** at both URLs in 1-2 minutes!

---

### **Method 2: Edit on GitHub**

1. Go to: https://github.com/psc2902/piuwebsite
2. Click any file → Edit (pencil icon)
3. Make changes → Commit
4. Auto-deploys!

---

## 📊 DNS Management

**To view/edit DNS records**:
1. Azure Portal → DNS zones
2. Click: `priyankac.qzz.io`
3. See all DNS records (A, CNAME, TXT, etc.)

**Current DNS records** (automatically created by Azure):
- `@` → Points to your Static Web App
- `_dnsauth` → Domain verification TXT record
- Other records as needed

---

## 🔧 Domain Renewal

**Renewal Date**: April 3, 2027

**How to Renew** (180 days before expiry):
1. Go to FreeDomain
2. Request free renewal
3. Domain renewed for 1 more year (free)

**Or renew earlier for 2 years** with a renewal key (check FreeDomain docs)

---

## ✅ Complete Setup Summary

**What You Have**:
- ✅ Portfolio website live on Azure
- ✅ Custom domain: `priyankac.qzz.io`
- ✅ Free SSL certificate (HTTPS)
- ✅ Automatic deployments from GitHub
- ✅ Azure DNS Zone managing DNS
- ✅ FreeDomain registration (free)
- ✅ Global CDN (Azure)

**Total Cost**: ~$0.50/month (just Azure DNS)

---

## 🆘 Troubleshooting

### **Domain not loading?**
- Wait 5-15 minutes for DNS propagation
- Clear browser cache: `Cmd + Shift + R` (Mac)
- Check DNS records in Azure DNS Zone
- Verify custom domain shows "Configured" in Azure Static Web Apps

### **SSL certificate error?**
- Wait up to 30 minutes for SSL provisioning
- Azure automatically handles SSL - no action needed

### **Want to remove custom domain?**
1. Azure Static Web Apps → Custom domains
2. Click on `priyankac.qzz.io`
3. Click "Delete"

---

## 🎯 What's Configured Where

### **FreeDomain (No Further Action Needed)**
- ✅ Domain registered: `priyankac.qzz.io`
- ✅ Nameservers set to Azure DNS
- ✅ Valid until: April 3, 2027

### **Azure DNS Zone**
- ✅ Hosts all DNS records
- ✅ Points domain to Static Web App
- ✅ Automatically managed by Azure

### **Azure Static Web Apps**
- ✅ Accepts traffic from both:
  - `lemon-coast-0d8cb9510.7.azurestaticapps.net`
  - `priyankac.qzz.io`
- ✅ SSL enabled on both
- ✅ Auto-deploys from GitHub

### **GitHub Repository**
- ✅ Source code: https://github.com/psc2902/piuwebsite
- ✅ GitHub Actions deploys automatically
- ✅ Every push = live update

---

## 🎉 You're All Set!

Your portfolio is now live with a custom domain!

**Share your URL**: https://priyankac.qzz.io 🌟

---

**No further action needed on FreeDomain!** Everything is configured and working! ✅
