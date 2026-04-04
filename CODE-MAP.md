# 🗺️ Code Navigation Map

Quick reference for finding specific functionality in your portfolio website.

## 🔍 **What Am I Looking For?** → **Where Do I Find It?**

### 🏠 **Homepage Content**
| What | File | Lines (Approx) | Purpose |
|------|------|---------------|---------|
| Main heading "Senior Product Manager" | `index.html` | 40-50 | Hero section title |
| Your intro paragraph | `index.html` | 50-60 | Hero description |
| About section text | `index.html` | 80-120 | About you content |
| Skills list | `index.html` | 140-180 | Your competencies |
| Featured projects | `index.html` | 200-280 | Portfolio work |
| Blog preview | `index.html` | 300-340 | Recent posts |
| Analytics dashboard | `index.html` | 180-200 | Visitor stats |

### 📄 **Resume Page**
| What | File | Lines (Approx) | Purpose |
|------|------|---------------|---------|
| Professional summary | `resume.html` | 155-165 | Your PM summary |
| Work experience | `resume.html` | 170-220 | Job history |
| Skills sections | `resume.html` | 100-140 | Technical skills |
| Education | `resume.html` | 225-245 | Degrees |
| Certifications | `resume.html` | 250-270 | Professional certs |

### 📝 **Blog Page**
| What | File | Lines (Approx) | Purpose |
|------|------|---------------|---------|
| Blog post listings | `blog.html` | 50-150 | Article previews |
| Categories | `blog.html` | 160-200 | Topic filters |
| Blog intro text | `blog.html` | 40-50 | Page description |

### 🎨 **Visual Styling**
| What | File | Lines (Approx) | Purpose |
|------|------|---------------|---------|
| Colors (blue, text, etc.) | `css/style.css` | 1-50 | Color variables |
| Navigation bar styling | `css/style.css` | 100-200 | Top menu |
| Hero section design | `css/style.css` | 200-300 | Main banner |
| Analytics cards styling | `css/style.css` | 350-450 | Stats design |
| PRD modal design | `css/style.css` | 1100-1300 | Popup styling |
| Mobile responsiveness | `css/style.css` | 900-1100 | Phone/tablet |

### ⚡ **Interactive Features**
| What | File | Lines (Approx) | Purpose |
|------|------|---------------|---------|
| Mobile menu toggle | `js/script.js` | 1-30 | Hamburger menu |
| Analytics animations | `js/script.js` | 60-150 | Counting effects |
| PRD modal popups | `js/script.js` | 200-350 | PRD dialogs |
| Visitor map data | `js/script.js` | 120-200 | Country stats |
| Click tracking | `js/script.js` | 350-400 | User analytics |

### ⚙️ **Configuration**
| What | File | Purpose |
|------|------|---------|
| Azure hosting rules | `staticwebapp.config.json` | Server configuration |
| Auto-deployment | `.github/workflows/azure-static-web-apps.yml` | CI/CD pipeline |
| Project info | `README.md` | Documentation |

---

## 🎯 **Common Customization Tasks**

### ✏️ **I Want to Change My Name**
**Files to Update:**
1. `index.html` → Line ~25 (navigation), Line ~45 (hero), Line ~275 (footer)
2. `resume.html` → Line ~25 (navigation), Line ~70 (resume header)
3. `blog.html` → Line ~25 (navigation)

**Search Tip:** Use VS Code's Find & Replace (`Ctrl+Shift+H`) to search for "Your Name"

### 📧 **I Want to Update Contact Info**
**Files to Update:**
1. `index.html` → Lines ~350-380 (contact section)
2. `resume.html` → Lines ~75-95 (contact details)

**Search Tip:** Look for "your.email@example.com" and phone numbers

### 🎨 **I Want to Change Colors**
**File:** `css/style.css`
**Lines:** 1-50 (CSS variables section)
**Key Variables:**
```css
--primary-color: #2563eb;     ← Main blue color
--accent-color: #f59e0b;      ← Orange highlights  
--text-primary: #1e293b;      ← Main text color
--surface-color: #f8fafc;     ← Light backgrounds
```

### 📊 **I Want to Update Analytics Data**
**File:** `js/script.js`
**Lines:** ~70-80 (analyticsData object)
```javascript
const analyticsData = {
    totalVisitors: 45000,        ← Change this number
    countries: 85,               ← Change this number
    prdDownloads: 3200,         ← Change this number
    engagementRate: '89.5%'     ← Change this percentage
};
```

### 🔗 **I Want to Add Real PRD Links**
**Files to Update:**
1. `index.html` → Lines ~250-280 (featured work PRD links)
2. `js/script.js` → Lines ~380-420 (download/view functions)

**What to Change:**
- Replace `#` in PRD links with actual file URLs
- Update `downloadPRD()` and `viewPRDOnline()` functions

---

## 🔧 **Developer Tools Shortcuts**

### **Finding Code Quickly**
1. **VS Code Search:** `Ctrl+Shift+F` → Search across all files
2. **Find in File:** `Ctrl+F` → Search within current file  
3. **Go to Line:** `Ctrl+G` → Jump to specific line number
4. **Symbol Search:** `Ctrl+Shift+O` → Find functions/classes

### **Browser DevTools**
1. **Inspect Element:** Right-click any element → "Inspect"
2. **Console:** `F12` → Console tab → Run JavaScript commands
3. **Network:** `F12` → Network tab → See what files load
4. **Mobile View:** `F12` → Device toolbar → Test mobile design

### **Quick Edits**
1. **Multi-cursor:** `Alt+Click` → Edit multiple places at once
2. **Duplicate Line:** `Shift+Alt+Down` → Copy current line
3. **Move Line:** `Alt+Up/Down` → Move line up/down
4. **Comment Code:** `Ctrl+/` → Add/remove comments

---

## 🚨 **Common Issues & Where to Look**

### **Site Doesn't Load**
**Check:** `staticwebapp.config.json` → Routing rules
**Check:** `.github/workflows/` → Deployment status

### **Styles Look Wrong**
**Check:** `css/style.css` → CSS syntax errors
**Check:** `index.html` → CSS link tags (lines 10-15)

### **JavaScript Not Working**
**Check:** Browser console (`F12`) → Error messages
**Check:** `js/script.js` → JavaScript syntax
**Check:** `index.html` → Script tags (line ~270)

### **Mobile Layout Broken**
**Check:** `css/style.css` → Lines 900-1100 (media queries)
**Check:** `index.html` → Viewport meta tag (line ~5)

### **Analytics Not Showing**
**Check:** `js/script.js` → Lines 60-150 (analytics functions)
**Check:** `index.html` → Analytics section HTML (lines 180-200)

---

## 📚 **Learning Path by Complexity**

### **🟢 Beginner (Start Here)**
1. Change text content in HTML files
2. Update CSS color variables
3. Modify analytics numbers
4. Replace contact information

### **🟡 Intermediate**
1. Add new sections to pages
2. Customize CSS layouts
3. Modify JavaScript functions
4. Add new blog posts

### **🔴 Advanced**
1. Create new interactive features
2. Integrate real APIs
3. Add new pages
4. Customize deployment pipeline

---

## 🎯 **Quick Start Actions**

**Want to see immediate changes?** Try these 5-minute modifications:

1. **Change Primary Color:**
   - Open `css/style.css`
   - Line 2: Change `--primary-color: #2563eb;` to `--primary-color: #dc2626;`
   - Refresh browser → Everything blue becomes red!

2. **Update Analytics Numbers:**
   - Open `js/script.js`
   - Line ~75: Change `totalVisitors: Math.floor(Math.random() * 50000) + 10000,`
   - To: `totalVisitors: 75000,`
   - Refresh browser → See your new visitor count!

3. **Change Your Title:**
   - Open `index.html`
   - Line ~45: Change "Senior Product Manager & Strategy Leader"
   - To: "Senior Product Manager & Innovation Expert"
   - Refresh browser → See your new title!

**🎉 Congratulations! You just modified your website code!**

---

**💡 Pro Tip:** Always test changes locally before deploying. Use `Ctrl+Z` to undo if something breaks!