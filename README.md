# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing your design work, resume, and blog articles.

## 🚀 Features

- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Resume Section**: Comprehensive layout ready for your professional information
- **Blog Platform**: Dedicated section for your product design articles
- **Fast Loading**: Optimized for performance with lazy loading and efficient code
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Azure Ready**: Pre-configured for Azure Static Web Apps deployment

## 📁 Project Structure

```
piuwebsite/
├── index.html          # Home page
├── resume.html         # Resume/CV page
├── blog.html           # Blog listing page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # Image assets
├── blog/               # Individual blog posts
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # Azure deployment workflow
├── staticwebapp.config.json           # Azure configuration
├── vercel.json         # Vercel deployment config (alternative)
└── README.md           # This file
```

## 🛠️ Customization

### Personal Information
1. Replace "Your Name" throughout the HTML files with your actual name
2. Update email addresses, phone numbers, and social media links
3. Add your professional photo to the `images/` folder and update image references

### Resume Content
1. Open `resume.html`
2. Update the placeholder content with your actual:
   - Professional summary
   - Work experience
   - Education
   - Skills
   - Certifications
   - Projects

### Blog Articles
1. Create individual HTML files in the `blog/` folder for each article
2. Update the blog post links in `blog.html`
3. Add your actual blog content and images

### Styling
- Modify CSS custom properties in `:root` to change colors, fonts, and spacing
- All styles are in `css/style.css` with clear organization
- Responsive breakpoints are already configured

## 🚀 Deployment

### Azure Static Web Apps (Recommended)

1. **Prerequisites**:
   - Azure account
   - GitHub repository

2. **Steps**:
   - Push your code to a GitHub repository
   - Go to Azure Portal → Create Resource → Static Web Apps
   - Connect your GitHub repository
   - Set build configuration:
     - App location: `/`
     - Output location: (leave empty)
   - Azure will automatically create a GitHub Actions workflow

3. **Custom Domain** (Optional):
   - In Azure Portal, go to your Static Web App
   - Navigate to "Custom domains"
   - Add your domain and configure DNS

### Alternative Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
- Connect your GitHub repository to Netlify
- Set build command: (none needed)
- Set publish directory: `/`

#### GitHub Pages
- Go to repository Settings → Pages
- Select source branch (main)
- Your site will be available at `https://yourusername.github.io/repository-name`

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/piuwebsite.git
   cd piuwebsite
   ```

2. **Open with a local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**: `http://localhost:8000`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px  
- **Mobile**: Below 768px

## 🎨 Color Scheme

The website uses CSS custom properties for easy theme customization:

- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#64748b` (Slate)
- **Accent**: `#f59e0b` (Amber)
- **Text**: `#1e293b` (Dark slate)
- **Background**: `#ffffff` (White)

## 📧 Contact Form Integration

To add a working contact form:

1. **Using Formspree**:
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

2. **Using Netlify Forms**:
   ```html
   <form netlify>
   ```

3. **Using Azure Functions**:
   - Create an Azure Function for form processing
   - Update the form action URL

## 🔍 SEO Optimization

- Meta descriptions and titles are included
- Semantic HTML structure
- Open Graph tags for social media sharing
- Structured data markup ready to add

## 📊 Analytics Integration

Add Google Analytics or other analytics:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚀 Performance Features

- Lazy loading for images
- Minified CSS and JavaScript
- Optimized fonts loading
- Efficient animations
- Mobile-first responsive design

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 💡 Tips for Success

1. **Keep it updated**: Regularly update your resume and add new blog posts
2. **Show your work**: Include case studies and project details
3. **Write regularly**: Consistent blogging shows expertise and thought leadership
4. **Optimize images**: Compress images for faster loading
5. **Test thoroughly**: Check on different devices and browsers

---

**Built with ❤️ for designers and creative professionals**