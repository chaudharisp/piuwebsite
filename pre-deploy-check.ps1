# Azure Deployment Pre-Check Script
# Run this before deploying to verify everything is ready

Write-Host "🚀 Azure Portfolio Deployment Pre-Check" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
$currentDir = Get-Location
$expectedPath = "piuwebsite"

if ($currentDir.Path -notlike "*$expectedPath*") {
    Write-Host "❌ Please run this script from your piuwebsite directory" -ForegroundColor Red
    Write-Host "Current directory: $currentDir" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Running from correct directory: $currentDir" -ForegroundColor Green

# Check for required files
$requiredFiles = @(
    "index.html",
    "resume.html", 
    "blog.html",
    "css\style.css",
    "js\script.js",
    "staticwebapp.config.json",
    "admin\index.html",
    "admin\config.yml",
    "_data\settings.yml"
)

Write-Host ""
Write-Host "📁 Checking required files..." -ForegroundColor Yellow

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file" -ForegroundColor Red
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "❌ Missing required files. Please ensure all files are present before deploying." -ForegroundColor Red
    exit 1
}

# Check Git status
Write-Host ""
Write-Host "📝 Checking Git status..." -ForegroundColor Yellow

try {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
        git status --short
        Write-Host ""
        Write-Host "🔧 Run these commands to commit changes:" -ForegroundColor Cyan
        Write-Host "git add ." -ForegroundColor White
        Write-Host "git commit -m 'Prepare for Azure deployment with admin interface'" -ForegroundColor White
        Write-Host "git push origin main" -ForegroundColor White
    } else {
        Write-Host "✅ All changes committed" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Git not initialized or not in a Git repository" -ForegroundColor Red
    Write-Host "🔧 Initialize Git with:" -ForegroundColor Cyan
    Write-Host "git init" -ForegroundColor White
    Write-Host "git add ." -ForegroundColor White
    Write-Host "git commit -m 'Initial commit'" -ForegroundColor White
}

# Check admin configuration
Write-Host ""
Write-Host "⚙️  Checking admin configuration..." -ForegroundColor Yellow

$configPath = "admin\config.yml"
if (Test-Path $configPath) {
    $configContent = Get-Content $configPath -Raw
    
    if ($configContent -match "yourusername/your-repo-name") {
        Write-Host "⚠️  Admin config still has placeholder values" -ForegroundColor Yellow
        Write-Host "🔧 Update admin\config.yml with your actual GitHub repo" -ForegroundColor Cyan
    } else {
        Write-Host "✅ Admin config looks updated" -ForegroundColor Green
    }
    
    if ($configContent -match "your-site-name.azurestaticapps.net") {
        Write-Host "⚠️  Admin config has placeholder Azure URL" -ForegroundColor Yellow
        Write-Host "🔧 Update with your actual Azure Static Web App URL after deployment" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ Admin config file missing" -ForegroundColor Red
}

# Check file sizes
Write-Host ""
Write-Host "📊 Checking file sizes..." -ForegroundColor Yellow

$largeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 5MB }
if ($largeFiles) {
    Write-Host "⚠️  Large files detected (>5MB):" -ForegroundColor Yellow
    $largeFiles | ForEach-Object { 
        $sizeMB = [math]::Round($_.Length / 1MB, 2)
        Write-Host "   $($_.Name) - ${sizeMB}MB" -ForegroundColor Yellow
    }
    Write-Host "🔧 Consider optimizing images or moving large files to external storage" -ForegroundColor Cyan
} else {
    Write-Host "✅ All files are reasonably sized" -ForegroundColor Green
}

# Final summary
Write-Host ""
Write-Host "📋 Pre-Deployment Summary" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

if ($missingFiles.Count -eq 0) {
    Write-Host "✅ All required files present" -ForegroundColor Green
} else {
    Write-Host "❌ Missing files need to be created" -ForegroundColor Red
}

Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Commit any remaining changes to GitHub" -ForegroundColor White
Write-Host "2. Follow AZURE-DEPLOYMENT-TESTING.md for complete deployment" -ForegroundColor White
Write-Host "3. Use DEPLOYMENT-CHECKLIST.md as your deployment guide" -ForegroundColor White
Write-Host ""
Write-Host "📖 Key files to reference:" -ForegroundColor Yellow
Write-Host "   • AZURE-DEPLOYMENT-TESTING.md - Complete deployment guide" -ForegroundColor White
Write-Host "   • DEPLOYMENT-CHECKLIST.md - Quick checklist to follow" -ForegroundColor White
Write-Host "   • AZURE-ADMIN-SETUP.md - Admin interface configuration" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Ready to deploy to Azure Static Web Apps!" -ForegroundColor Green