# Migration Checklist

## Pre-Migration Setup
- [ ] New GitHub account ready
- [ ] Access to Azure Static Web Apps dashboard
- [ ] Current CMS working and tested

## Repository Migration
- [ ] Repository transferred/forked to new account
- [ ] Local git remote updated: `git remote set-url origin https://github.com/NEW_USERNAME/piuwebsite.git`
- [ ] Test push to new repository works

## GitHub OAuth Setup
- [ ] New OAuth app created at: https://github.com/settings/developers
- [ ] OAuth app configured with:
  - Homepage URL: `https://red-plant-033de6c1e.2.azurestaticapps.net`
  - Callback URL: `https://red-plant-033de6c1e.2.azurestaticapps.net/api/auth`
- [ ] Client ID copied: `________________`
- [ ] Client Secret copied: `________________`

## Azure Configuration
- [ ] Environment variables updated in Azure Static Web Apps:
  - [ ] `GITHUB_CLIENT_ID` = new client ID
  - [ ] `GITHUB_CLIENT_SECRET` = new client secret
- [ ] Deployment source updated to new repository
- [ ] Build triggers working

## Code Updates
- [ ] `admin/index.html` updated with new repository name:
  ```javascript
  repo: 'NEW_USERNAME/piuwebsite'  // Updated this line
  ```
- [ ] Changes committed and pushed
- [ ] Azure deployment triggered

## Testing
- [ ] Admin page loads: https://red-plant-033de6c1e.2.azurestaticapps.net/admin/
- [ ] GitHub login works with new account
- [ ] Can see existing homepage content
- [ ] Can see existing resume content
- [ ] Can edit and save content
- [ ] Changes appear in new GitHub repository
- [ ] Live site updates with changes

## Cleanup
- [ ] Old OAuth app deleted from previous GitHub account
- [ ] Old repository archived/deleted (after verification)
- [ ] Team members notified of new repository

## Notes
Current repo: krnch/piuwebsite
New repo: ________________
Migration date: ________________
Issues encountered: ________________