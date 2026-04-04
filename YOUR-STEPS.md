# 🚀 Your Personalized Setup Steps

## ✅ Step 1: Git Identity - DONE!
Your Git is now configured with:
- Name: Priyanka Chaudhari
- Email: pc24840n@pace.edu

---

## 📋 Step 2: Create GitHub Repository

### DO THIS NOW:

1. **Open your browser** and go to: https://github.com/new

2. **Sign in to GitHub** with your GitHub account
   - If you don't have a GitHub account, create one at: https://github.com/signup

3. **Fill in the form:**
   ```
   Repository name: piuwebsite
   Description: My portfolio website
   Visibility: ✅ Public (or Private if you prefer)
   
   ❌ DO NOT CHECK: "Add a README file"
   ❌ DO NOT CHECK: "Add .gitignore"  
   ❌ DO NOT CHECK: "Choose a license"
   ```

4. **Click**: "Create repository"

5. **After creation**, you'll see a page with setup commands
   - **IMPORTANT**: Copy your GitHub repository URL
   - It will look like: `https://github.com/YOUR-USERNAME/piuwebsite.git`
   - **Write down YOUR-USERNAME here**: _________________

---

## 📋 Step 3: Push Your Code to GitHub

### AFTER you create the GitHub repo, come back here and run:

**Replace `YOUR-USERNAME` with your actual GitHub username below!**

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/piuwebsite.git

# Rename branch to main
git branch -M main

# Push to GitHub (you'll be asked for password)
git push -u origin main
```

### When prompted for credentials:
- **Username**: Enter your GitHub username
- **Password**: Instead of password, use a **Personal Access Token**

---

## 🔑 If You Need a Personal Access Token:

GitHub no longer accepts passwords for command line. You need a token:

1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token" → "Generate new token (classic)"
3. Give it a name: "Portfolio Deployment"
4. Select scope: ✅ **repo** (check the box)
5. Click: "Generate token" at bottom
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your "password" when Git asks

**Save your token somewhere safe!**

---

## 📋 Next Steps After GitHub Push Succeeds:

Once your code is on GitHub, I'll help you:
1. ✅ Create Azure Static Web App
2. ✅ Connect it to your GitHub repo
3. ✅ Get your live website URL

---

## 🆘 Having Issues?

### Issue: "Permission denied"
**Solution**: You need a Personal Access Token (see above)

### Issue: "Repository not found"
**Solution**: Double-check your GitHub username in the URL

### Issue: "Already exists"
**Solution**: Run `git remote remove origin` first, then try again

---

## ✅ WHAT TO DO RIGHT NOW:

1. [ ] Go to https://github.com/new
2. [ ] Create repository named "piuwebsite"
3. [ ] Copy your GitHub username: _________________
4. [ ] Come back and tell me your username
5. [ ] I'll give you the exact command to run!

**Tell me when you've created the GitHub repo!** 🚀
