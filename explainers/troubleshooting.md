# Troubleshooting Guide

Common issues and solutions for your portfolio website.

## 🔧 Development Issues

### Website Not Loading Locally

**Problem:** Cannot view site on localhost
**Solutions:**
1. **Use a local server:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

2. **Open browser to:** `http://localhost:8000`
3. **Don't open HTML files directly** - use a server for proper functionality

### CSS/JS Not Loading

**Problem:** Styles or scripts missing
**Check:**
- [ ] File paths are correct (`css/style.css`, `js/script.js`)
- [ ] Files exist in correct folders
- [ ] No typos in file names
- [ ] Using forward slashes `/` not backslashes `\`

**Fix broken paths:**
```html
<!-- Wrong -->
<link rel="stylesheet" href="css\style.css">

<!-- Correct -->
<link rel="stylesheet" href="css/style.css">
```

### Mobile Menu Not Working

**Problem:** Hamburger menu doesn't open on mobile
**Solutions:**
1. **Check JavaScript errors** in browser console (F12)
2. **Verify HTML IDs match:**
   ```html
   <div class="hamburger" id="hamburger">
   <div class="nav-menu" id="nav-menu">
   ```
3. **Ensure script.js is loaded** at bottom of page

### Images Not Displaying

**Problem:** Placeholder icons instead of photos
**Solutions:**
1. **Check image paths:**
   ```html
   <!-- Make sure file exists -->
   <img src="images/profile.jpg" alt="Your Name">
   ```

2. **Optimize image size:**
   - Max width: 1200px
   - File size: Under 500KB
   - Format: JPG, PNG, or WebP

3. **Add images to correct folder:**
   ```
   images/
   ├── profile.jpg
   ├── projects/
   │   ├── project1.jpg
   │   └── project2.jpg
   └── blog/
       ├── post1.jpg
       └── post2.jpg
   ```

## 🌐 Deployment Issues

### Azure Build Fails

**Problem:** GitHub Actions shows red X
**Solutions:**
1. **Check Actions log:**
   - Go to GitHub repository
   - Click "Actions" tab
   - Click failed workflow
   - Read error messages

2. **Common fixes:**
   ```bash
   # Fix file permissions
   git add .
   git commit -m "Fix file permissions"
   git push origin main
   ```

3. **Validate HTML:**
   - Use [W3C Validator](https://validator.w3.org/)
   - Fix any syntax errors
   - Ensure all tags are properly closed

### Site Shows Default Azure Page

**Problem:** Azure URL shows placeholder instead of your site
**Solutions:**
1. **Wait for deployment** (up to 10 minutes)
2. **Check build status** in GitHub Actions
3. **Force refresh** (Ctrl+F5 or Cmd+Shift+R)
4. **Clear browser cache**

### Custom Domain Not Working

**Problem:** Your domain doesn't show the website
**Check DNS Setup:**
1. **Verify DNS records:**
   ```bash
   # Check if DNS is propagated
   nslookup your-domain.com
   ```

2. **Common DNS issues:**
   - TTL too high (should be 300-3600)
   - Wrong record type (use CNAME for www, A record for root)
   - Typos in Azure URL

3. **DNS propagation tools:**
   - [whatsmydns.net](https://www.whatsmydns.net/)
   - [dnschecker.org](https://dnschecker.org/)

### SSL Certificate Issues

**Problem:** "Not Secure" warning in browser
**Solutions:**
1. **Wait for Azure** to provision SSL (up to 24 hours)
2. **Force HTTPS** in `staticwebapp.config.json`:
   ```json
   {
     "routes": [
       {
         "route": "/*",
         "serve": "/index.html",
         "statusCode": 200
       }
     ],
     "globalHeaders": {
       "Strict-Transport-Security": "max-age=31536000"
     }
   }
   ```

## 📱 Responsive Issues

### Layout Breaks on Mobile

**Problem:** Website looks wrong on phones/tablets
**Debug Steps:**
1. **Use browser dev tools:**
   - Press F12
   - Click device toggle icon
   - Test different screen sizes

2. **Common fixes:**
   ```css
   /* Add to CSS if missing */
   @media (max-width: 768px) {
       .hero-container {
           grid-template-columns: 1fr;
       }
   }
   ```

3. **Test on real devices:**
   - iPhone Safari
   - Android Chrome
   - iPad Safari

### Text Too Small on Mobile

**Problem:** Hard to read on small screens
**Fix:**
```css
/* Increase base font size for mobile */
@media (max-width: 768px) {
    :root {
        --font-size-base: 1.1rem;
    }
}
```

## 📧 Contact Form Issues

### Form Not Submitting

**Problem:** Contact form doesn't work
**Solutions:**
1. **Add form handler:**
   ```html
   <!-- Use Formspree (free) -->
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

2. **Or use Netlify forms:**
   ```html
   <form netlify>
   ```

3. **Add JavaScript validation:**
   ```javascript
   // Already included in script.js
   // Check console for errors
   ```

## 🔍 SEO Issues

### Site Not Appearing in Google

**Problem:** Website doesn't show up in search results
**Solutions:**
1. **Submit to Google Search Console:**
   - [search.google.com/search-console](https://search.google.com/search-console)
   - Add your site
   - Submit sitemap

2. **Add meta tags:**
   ```html
   <meta name="description" content="Portfolio of [Your Name] - Product Designer">
   <meta name="keywords" content="product design, UX design, portfolio">
   ```

3. **Create sitemap.xml:**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
           <loc>https://yoursite.com/</loc>
           <changefreq>monthly</changefreq>
           <priority>1.0</priority>
       </url>
       <url>
           <loc>https://yoursite.com/resume.html</loc>
           <changefreq>monthly</changefreq>
           <priority>0.8</priority>
       </url>
   </urlset>
   ```

## 📊 Performance Issues

### Site Loading Slowly

**Problem:** Website takes too long to load
**Solutions:**
1. **Optimize images:**
   ```bash
   # Use online tools to compress images
   # TinyPNG.com
   # Squoosh.app
   ```

2. **Enable gzip compression** in `staticwebapp.config.json`:
   ```json
   {
     "globalHeaders": {
       "Content-Encoding": "gzip"
     }
   }
   ```

3. **Minimize HTTP requests:**
   - Combine CSS files
   - Use CSS sprites for small icons
   - Remove unused fonts

### JavaScript Errors

**Problem:** Console shows red errors
**Common fixes:**
1. **Check for typos** in script.js
2. **Ensure jQuery/libraries** are loaded if used
3. **Test in different browsers**

## 🆘 Emergency Fixes

### Site Completely Broken

**Quick recovery:**
1. **Revert to last working commit:**
   ```bash
   git log --oneline  # Find last good commit
   git revert [commit-hash]
   git push origin main
   ```

2. **Or restore from backup:**
   - Download previous version from GitHub
   - Fix issues locally
   - Push corrected version

### Database/Content Issues

**For static sites:** Content is in HTML files
**Recovery:**
1. **Keep backups** of all content
2. **Use version control** (Git) religiously
3. **Test changes locally** before deploying

## 📞 Getting Additional Help

### Resources
1. **MDN Web Docs:** [developer.mozilla.org](https://developer.mozilla.org/)
2. **Azure Documentation:** [docs.microsoft.com/azure](https://docs.microsoft.com/en-us/azure/)
3. **Stack Overflow:** Search for specific error messages

### Before Asking for Help
1. **Check browser console** for error messages
2. **Try in incognito/private browsing** mode
3. **Test on different devices/browsers**
4. **Note what you changed** before the issue started

### Provide This Information
- **Exact error message**
- **Browser and version**
- **Device type** (desktop/mobile)
- **Steps to reproduce** the issue
- **What you expected** to happen

---

**Remember:** Most issues have simple solutions. Take your time, read error messages carefully, and don't hesitate to search for specific error messages online.