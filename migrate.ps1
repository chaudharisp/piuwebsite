# CMS Migration Helper Script for Windows PowerShell
# Run this script to help automate the migration process

Write-Host "🚀 CMS Migration Helper" -ForegroundColor Green
Write-Host "======================"

$NEW_USERNAME = Read-Host "Enter new GitHub username"
$NEW_REPO = Read-Host "Enter new repository name (or press Enter for 'piuwebsite')"
if ([string]::IsNullOrWhiteSpace($NEW_REPO)) {
    $NEW_REPO = "piuwebsite"
}

Write-Host ""
Write-Host "📋 Migration Summary:" -ForegroundColor Yellow
Write-Host "New Repository: $NEW_USERNAME/$NEW_REPO"
Write-Host "Current Repository: krnch/piuwebsite"
Write-Host ""

$CONFIRM = Read-Host "Continue with migration? (y/N)"
if ($CONFIRM -ne "y" -and $CONFIRM -ne "Y") {
    Write-Host "Migration cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🔄 Step 1: Updating git remote..." -ForegroundColor Blue
& "C:\Program Files\Git\bin\git.exe" remote set-url origin "https://github.com/$NEW_USERNAME/$NEW_REPO.git"
Write-Host "✅ Git remote updated" -ForegroundColor Green

Write-Host ""
Write-Host "📝 Step 2: Updating CMS configuration..." -ForegroundColor Blue

# Read the current admin/index.html file
$content = Get-Content "admin/index.html" -Raw

# Create backup
$content | Set-Content "admin/index.html.bak"

# Replace the repository reference
$newContent = $content -replace "repo: 'krnch/piuwebsite'", "repo: '$NEW_USERNAME/$NEW_REPO'"

# Write the updated content back
$newContent | Set-Content "admin/index.html"

Write-Host "✅ CMS configuration updated" -ForegroundColor Green
Write-Host "📁 Backup created: admin/index.html.bak" -ForegroundColor Gray

Write-Host ""
Write-Host "📤 Step 3: Committing changes..." -ForegroundColor Blue
& "C:\Program Files\Git\bin\git.exe" add admin/index.html
& "C:\Program Files\Git\bin\git.exe" commit -m "Update CMS configuration for repository migration to $NEW_USERNAME/$NEW_REPO"

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Create OAuth app at: https://github.com/settings/developers"
Write-Host "2. Update Azure environment variables:"
Write-Host "   - GITHUB_CLIENT_ID"
Write-Host "   - GITHUB_CLIENT_SECRET"
Write-Host "3. Reconnect Azure Static Web Apps to new repository"
Write-Host "4. Test the CMS at your admin URL"
Write-Host ""
Write-Host "📖 Full guide available in: MIGRATION_GUIDE.md" -ForegroundColor Cyan
Write-Host "✅ Migration helper complete!" -ForegroundColor Green