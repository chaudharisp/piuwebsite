# Migrating Netlify CMS to a Different GitHub Account

## Overview
This guide covers how to migrate your existing Netlify CMS setup from one GitHub account to another while preserving all content, functionality, and CI/CD pipelines.

## Prerequisites
- [ ] Access to both GitHub accounts (source and destination)
- [ ] Admin access to Azure Static Web Apps
- [ ] Current CMS is working with existing GitHub account

## Step-by-Step Migration Plan

### Phase 1: Repository Migration
1. **Fork/Transfer Repository**
   - Option A: Transfer repository ownership in GitHub settings
   - Option B: Fork repository to new account and update remote URLs
   - Option C: Create new repository and push existing code

2. **Update Remote URLs**
   ```bash
   # If keeping same repository name
   git remote set-url origin https://github.com/NEW_USERNAME/piuwebsite.git
   
   # If changing repository name
   git remote set-url origin https://github.com/NEW_USERNAME/NEW_REPO_NAME.git
   ```

### Phase 2: GitHub OAuth App Migration
3. **Create New GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create new OAuth application with:
     - Application name: "Portfolio CMS" (or your choice)
     - Homepage URL: `https://your-site.azurestaticapps.net`
     - Authorization callback URL: `https://your-site.azurestaticapps.net/api/auth`
   - Save Client ID and Client Secret

4. **Delete Old OAuth App** (after migration is complete)
   - Remove the old OAuth app from the previous GitHub account

### Phase 3: Azure Configuration Updates
5. **Update Environment Variables**
   - In Azure Static Web Apps > Configuration > Environment variables:
     ```
     GITHUB_CLIENT_ID=new_client_id_here
     GITHUB_CLIENT_SECRET=new_client_secret_here
     SITE_URL=https://your-site.azurestaticapps.net
     ```

6. **Update Deployment Configuration**
   - In Azure Static Web Apps > Deployment > GitHub:
     - Disconnect current repository
     - Connect to new repository/account
     - Verify build and deployment settings

### Phase 4: CMS Configuration Updates
7. **Update admin/index.html**
   - Change repository reference in CMS config:
     ```javascript
     backend: {
         name: 'github',
         repo: 'NEW_USERNAME/NEW_REPO_NAME',  // Update this line
         branch: 'main'
     }
     ```

8. **Update API Authentication** (if using custom auth endpoint)
   - Verify api/auth/index.js works with new OAuth credentials
   - Test OAuth flow with new GitHub account

### Phase 5: Testing and Verification
9. **Test Authentication Flow**
   - [ ] CMS loads without errors
   - [ ] GitHub login works with new account
   - [ ] Can see existing content in CMS
   - [ ] Can edit and save content
   - [ ] Changes create commits in new repository

10. **Test CI/CD Pipeline**
    - [ ] Changes trigger Azure deployment
    - [ ] Site builds and deploys successfully
    - [ ] Content changes appear on live site

### Phase 6: DNS and Final Steps
11. **Custom Domain Migration** (if applicable)
    - Update DNS records if domain needs to point to new deployment
    - Verify SSL certificates are working

12. **Update Documentation**
    - Update README.md with new repository URLs
    - Update any documentation referring to old GitHub account
    - Update contributor guidelines if applicable

## Critical Configuration Files to Update

### 1. admin/index.html
```javascript
// Update this section:
backend: {
    name: 'github',
    repo: 'NEW_USERNAME/REPO_NAME',  // ← Change this
    branch: 'main'
}
```

### 2. Azure Static Web Apps Environment Variables
```
GITHUB_CLIENT_ID=your_new_client_id
GITHUB_CLIENT_SECRET=your_new_client_secret
SITE_URL=https://your-site.azurestaticapps.net
```

### 3. Git Remote (Local Development)
```bash
git remote set-url origin https://github.com/NEW_USERNAME/REPO_NAME.git
```

## Common Issues and Solutions

### Issue: "Repository not found" error
**Solution**: Verify the new repository name in admin/index.html matches exactly

### Issue: OAuth authentication fails
**Solution**: 
1. Check OAuth app callback URL matches your Azure domain
2. Verify environment variables are set correctly
3. Clear browser cache and localStorage

### Issue: CMS shows empty content
**Solution**: 
1. Ensure _data/ directory exists in new repository
2. Verify file paths in CMS collection configuration
3. Check repository permissions (CMS needs read/write access)

### Issue: CI/CD pipeline broken
**Solution**:
1. Reconnect Azure Static Web Apps to new repository
2. Verify GitHub Actions have proper permissions
3. Check workflow files reference correct repository

## Security Considerations
- [ ] Remove OAuth app from old GitHub account after migration
- [ ] Update any API keys or tokens stored in Azure
- [ ] Review repository permissions for the new account
- [ ] Audit any webhooks or integrations pointing to old repository

## Rollback Plan
If migration fails:
1. Keep old repository and OAuth app active until migration is verified
2. Have backup of environment variables from old setup
3. Can quickly revert admin/index.html repository configuration
4. Reconnect Azure to original repository if needed

## Post-Migration Checklist
- [ ] All authentication flows working
- [ ] Content editing and saving works
- [ ] Deployments trigger correctly
- [ ] Live site updates when content changes
- [ ] All team members can access CMS with new account
- [ ] Old OAuth app and repository references cleaned up

## Timeline Estimate
- **Planning**: 30 minutes
- **Repository migration**: 15 minutes
- **OAuth setup**: 15 minutes
- **Azure configuration**: 20 minutes
- **Testing**: 30 minutes
- **Total**: ~2 hours

## Notes
- Migration can be done with zero downtime if planned properly
- Keep old setup active until new setup is fully verified
- Consider doing migration during low-traffic hours
- Test thoroughly in a staging environment if possible