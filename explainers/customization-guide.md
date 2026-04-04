# Customization Guide

This guide shows you exactly how to personalize your portfolio website with your own content and branding.

## 📝 Step 1: Personal Information

### Replace "Your Name" Throughout

**Files to update:**
- `index.html`
- `resume.html`
- `blog.html`
- `404.html`

**Search and replace:**
- Find: `Your Name`
- Replace with: `[Your Actual Name]`

**Specific locations:**
```html
<!-- Navigation logo -->
<div class="nav-logo">
    <a href="index.html">John Smith</a>  <!-- Replace here -->
</div>

<!-- Hero section -->
<h1 class="hero-title">Hello, I'm <span class="highlight">John Smith</span></h1>

<!-- Resume name -->
<h2 class="resume-name">John Smith</h2>

<!-- Footer -->
<p>&copy; 2025 John Smith. All rights reserved.</p>
```

### Update Contact Information

**In `index.html` (Contact Section):**
```html
<a href="mailto:john.smith@example.com" class="contact-link">
    <i class="fas fa-envelope"></i>
    Email
</a>
<a href="https://linkedin.com/in/johnsmith" target="_blank" class="contact-link">
    <i class="fab fa-linkedin"></i>
    LinkedIn
</a>
```

**In `resume.html` (Contact Info):**
```html
<div class="contact-item">
    <i class="fas fa-envelope"></i>
    <span>john.smith@example.com</span>
</div>
<div class="contact-item">
    <i class="fas fa-phone"></i>
    <span>+1 (555) 123-4567</span>
</div>
<div class="contact-item">
    <i class="fas fa-map-marker-alt"></i>
    <span>San Francisco, CA</span>
</div>
```

## 🎨 Step 2: Brand Colors & Styling

### Change Your Color Scheme

Open `css/style.css` and find the `:root` section (around line 10):

```css
:root {
    /* Update these colors to match your brand */
    --primary-color: #2563eb;        /* Main brand color */
    --primary-dark: #1d4ed8;         /* Darker shade for hover */
    --secondary-color: #64748b;      /* Secondary text color */
    --accent-color: #f59e0b;         /* Accent highlights */
    --text-primary: #1e293b;         /* Main text color */
    --text-secondary: #64748b;       /* Lighter text */
    --text-muted: #94a3b8;          /* Muted text */
    --background: #ffffff;           /* Page background */
    --background-alt: #f8fafc;       /* Alternate background */
    --border-color: #e2e8f0;         /* Borders and lines */
}
```

**Popular Color Schemes:**

**Professional Blue:**
```css
--primary-color: #0066cc;
--primary-dark: #0052a3;
--accent-color: #ff6b35;
```

**Creative Purple:**
```css
--primary-color: #7c3aed;
--primary-dark: #6d28d9;
--accent-color: #fbbf24;
```

**Modern Green:**
```css
--primary-color: #059669;
--primary-dark: #047857;
--accent-color: #f59e0b;
```

### Change Typography

Replace the Google Fonts import in all HTML files:

**Current font:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Popular alternatives:**

**For modern look:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**For professional look:**
```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update the CSS:
```css
:root {
    --font-family: 'Poppins', system-ui, -apple-system, sans-serif;
}
```

## 📸 Step 3: Add Your Photos

### Profile Photo

1. **Prepare your photo:**
   - Size: 400x400 pixels (square)
   - Format: JPG or PNG
   - File size: Under 100KB for fast loading

2. **Save as:** `images/profile.jpg`

3. **Update HTML:**

**In `index.html`:**
```html
<!-- Replace this div -->
<div class="profile-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- With this img tag -->
<img src="images/profile.jpg" alt="Your Name" class="profile-image">
```

**Add this CSS:**
```css
.profile-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--shadow-xl);
}
```

**In `resume.html`:**
```html
<!-- Replace the placeholder -->
<div class="profile-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- With your photo -->
<img src="images/profile.jpg" alt="Your Name" class="resume-profile-image">
```

### Project Images

1. **Create folders:**
   - `images/projects/`
   - `images/blog/`

2. **Optimize images:**
   - Project images: 600x400 pixels
   - Blog images: 800x400 pixels
   - Keep under 200KB each

3. **Update HTML:**
```html
<!-- Replace placeholder divs -->
<div class="work-placeholder">
    <i class="fas fa-image"></i>
</div>

<!-- With actual images -->
<img src="images/projects/project1.jpg" alt="Project Name">
```

## 📄 Step 4: Resume Content

### Professional Summary

In `resume.html`, replace the placeholder text:

```html
<p>
    Experienced Product Designer with 5+ years creating user-centered digital experiences. 
    Passionate about solving complex problems through research-driven design and strategic thinking. 
    Led design initiatives that increased user engagement by 40% and conversion rates by 25%.
</p>
```

### Work Experience

Replace each job entry:

```html
<div class="experience-item">
    <div class="experience-header">
        <h4 class="job-title">Senior Product Designer</h4>
        <span class="job-period">2022 - Present</span>
    </div>
    <p class="company">TechCorp Inc. | San Francisco, CA</p>
    <ul class="job-responsibilities">
        <li>Led design for mobile app used by 100K+ users, improving user satisfaction by 35%</li>
        <li>Collaborated with engineering teams to implement design system, reducing development time by 30%</li>
        <li>Conducted user research sessions with 50+ users to inform product decisions</li>
        <li>Mentored 2 junior designers and established design review processes</li>
    </ul>
</div>
```

### Skills Section

Update your actual skills:

```html
<div class="skill-category">
    <h4>Design Tools</h4>
    <ul class="skill-list">
        <li>Figma (Expert)</li>
        <li>Adobe Creative Suite</li>
        <li>Sketch</li>
        <li>Principle</li>
        <li>Framer</li>
    </ul>
</div>
```

## 📝 Step 5: Blog Content

### Creating Blog Posts

1. **Create file:** `blog/my-first-post.html`

2. **Use this template:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post Title - Your Name</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <!-- Navigation (copy from other pages) -->
    
    <article class="blog-post-content">
        <div class="container">
            <header class="post-header">
                <h1>Your Blog Post Title</h1>
                <div class="post-meta">
                    <span>October 9, 2025</span>
                    <span>5 min read</span>
                </div>
            </header>
            
            <div class="post-body">
                <p>Your blog content goes here...</p>
                <!-- Add images, headings, etc. -->
            </div>
        </div>
    </article>
</body>
</html>
```

### Update Blog Links

In `blog.html`, update the post links:

```html
<h2 class="post-title">
    <a href="blog/design-systems-guide.html">The Complete Guide to Building Design Systems</a>
</h2>
```

## 🔧 Advanced Customizations

### Add Animation Delays

```css
.work-item:nth-child(1) { animation-delay: 0.1s; }
.work-item:nth-child(2) { animation-delay: 0.2s; }
.work-item:nth-child(3) { animation-delay: 0.3s; }
```

### Custom Button Styles

```css
.btn-custom {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
    border: none;
}
```

### Dark Mode Support

Add to CSS:
```css
@media (prefers-color-scheme: dark) {
    :root {
        --background: #1a1a1a;
        --text-primary: #ffffff;
        --text-secondary: #a0a0a0;
    }
}
```

---
**Next Step**: Check out `azure-deployment-guide.md` to publish your site online!