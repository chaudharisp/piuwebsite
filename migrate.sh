#!/bin/bash
# CMS Migration Helper Script
# Run this script to help automate the migration process

echo "🚀 CMS Migration Helper"
echo "======================"

read -p "Enter new GitHub username: " NEW_USERNAME
read -p "Enter new repository name (or press Enter for 'piuwebsite'): " NEW_REPO
NEW_REPO=${NEW_REPO:-piuwebsite}

echo ""
echo "📋 Migration Summary:"
echo "New Repository: ${NEW_USERNAME}/${NEW_REPO}"
echo "Current Repository: krnch/piuwebsite"
echo ""

read -p "Continue with migration? (y/N): " CONFIRM
if [[ $CONFIRM != [yY] ]]; then
    echo "Migration cancelled."
    exit 0
fi

echo ""
echo "🔄 Step 1: Updating git remote..."
git remote set-url origin "https://github.com/${NEW_USERNAME}/${NEW_REPO}.git"
echo "✅ Git remote updated"

echo ""
echo "📝 Step 2: Updating CMS configuration..."
# Update the repository name in admin/index.html
sed -i.bak "s/repo: 'krnch\/piuwebsite'/repo: '${NEW_USERNAME}\/${NEW_REPO}'/" admin/index.html
if [ $? -eq 0 ]; then
    echo "✅ CMS configuration updated"
    echo "📁 Backup created: admin/index.html.bak"
else
    echo "❌ Failed to update CMS configuration"
    echo "Please manually update admin/index.html"
fi

echo ""
echo "📤 Step 3: Committing changes..."
git add admin/index.html
git commit -m "Update CMS configuration for repository migration to ${NEW_USERNAME}/${NEW_REPO}"

echo ""
echo "🎯 Next Steps:"
echo "1. Create OAuth app at: https://github.com/settings/developers"
echo "2. Update Azure environment variables:"
echo "   - GITHUB_CLIENT_ID"
echo "   - GITHUB_CLIENT_SECRET"
echo "3. Reconnect Azure Static Web Apps to new repository"
echo "4. Test the CMS at your admin URL"
echo ""
echo "📖 Full guide available in: MIGRATION_GUIDE.md"
echo "✅ Migration helper complete!"