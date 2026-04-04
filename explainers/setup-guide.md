# Portfolio Website Setup Guide

Welcome to your new portfolio website! This guide will walk you through everything you need to know to customize and deploy your site.

## 🚀 Quick Start Checklist

### 1. Personalize Your Content (30 minutes)
- [ ] Replace "Your Name" with your actual name in all HTML files
- [ ] Update email addresses and contact information
- [ ] Add your professional photo to the `images/` folder
- [ ] Update social media links (LinkedIn, Dribbble, etc.)

### 2. Customize Your Resume (45 minutes)
- [ ] Add your professional summary
- [ ] Update work experience with actual jobs
- [ ] List your real education and certifications
- [ ] Add your skills and technologies
- [ ] Include notable projects

### 3. Set Up Your Blog (30 minutes)
- [ ] Plan your first 3-5 blog post topics
- [ ] Create individual blog post HTML files
- [ ] Add featured images for each post
- [ ] Update blog links in `blog.html`

### 4. Visual Customization (15 minutes)
- [ ] Choose your brand colors
- [ ] Select your preferred fonts
- [ ] Add your logo or personal branding
- [ ] Test on different screen sizes

### 5. Deploy to Azure (20 minutes)
- [ ] Create GitHub repository
- [ ] Push your code to GitHub
- [ ] Set up Azure Static Web App
- [ ] Configure custom domain (optional)

## 📁 File Structure Overview

```
piuwebsite/
├── index.html              # Your home page
├── resume.html             # Professional resume
├── blog.html              # Blog listing page
├── 404.html               # Error page
├── css/
│   └── style.css          # All your styles
├── js/
│   └── script.js          # Interactive features
├── images/                # Your photos and graphics
├── blog/                  # Individual blog posts
├── explainers/            # This folder - helpful guides
└── deployment files       # Azure/Vercel configs
```

## 🎨 Customization Priority

**High Priority (Do First):**
1. Personal information and contact details
2. Professional photo
3. Resume content
4. Brand colors

**Medium Priority (Do Soon):**
1. First blog posts
2. Project portfolio items
3. Custom domain setup

**Low Priority (Nice to Have):**
1. Advanced animations
2. Analytics integration
3. Contact form functionality

## 🔧 Common Customizations

### Changing Colors
Edit the `:root` section in `css/style.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* etc. */
}
```

### Adding Your Photo
1. Save your photo as `profile.jpg` in the `images/` folder
2. Replace the placeholder divs with:
```html
<img src="images/profile.jpg" alt="Your Name" class="profile-photo">
```

### Social Media Links
Update these sections in your HTML files:
- Contact section in `index.html`
- Contact info in `resume.html`
- Footer links (if added)

## 📱 Testing Your Site

Before going live, test:
- [ ] All links work correctly
- [ ] Mobile responsiveness
- [ ] Load times are fast
- [ ] Contact information is correct
- [ ] Images display properly

## 🚨 Common Mistakes to Avoid

1. **Broken Links**: Always test internal links
2. **Missing Images**: Ensure all image paths are correct
3. **Outdated Content**: Keep resume and portfolio current
4. **Poor Mobile Experience**: Test on actual mobile devices
5. **Slow Loading**: Optimize images before uploading

## 📞 Need Help?

If you run into issues:
1. Check the `troubleshooting.md` file in this folder
2. Refer to the `azure-deployment-guide.md` for hosting help
3. Look at `customization-examples.md` for specific changes

---
**Next Step**: Open `customization-guide.md` for detailed instructions on personalizing your site.