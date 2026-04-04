module.exports = async function (context, req) {
    context.log('Azure Static Web Apps Roles API called');

    // Get user claims from the request
    const userDetails = req.body;
    
    context.log('User details:', JSON.stringify(userDetails, null, 2));

    try {
        // Extract user information from claims
        const userId = userDetails.userId || userDetails.identityProvider_userId;
        const userEmail = userDetails.userDetails || userDetails.identityProvider_userDetails;
        const identityProvider = userDetails.identityProvider;

        context.log(`Assigning roles for user: ${userEmail} (${userId}) from ${identityProvider}`);

        // Define your role assignment logic here
        let roles = ['authenticated']; // Default role for all authenticated users

        // Add admin role for specific users (customize this!)
        const adminUsers = [
            'krnch', // Replace with your GitHub username
            'your-github-username', // Add more usernames as needed
            // Add email addresses if needed:
            // 'your-email@example.com'
        ];

        // Check if user should get admin role
        if (adminUsers.includes(userEmail) || adminUsers.includes(userId)) {
            roles.push('admin');
            context.log(`Admin role assigned to user: ${userEmail}`);
        }

        // You can add more role logic here:
        // - Editor role for specific users
        // - Viewer role for others
        // - Organization-based roles
        // - Database lookups for roles

        /*
        Example of more complex role assignment:
        
        if (userEmail.endsWith('@yourcompany.com')) {
            roles.push('employee');
        }
        
        if (specificEditors.includes(userEmail)) {
            roles.push('editor');
        }
        */

        context.log(`Final roles assigned: ${roles.join(', ')}`);

        // Return the roles array
        context.res = {
            status: 200,
            body: {
                roles: roles
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

    } catch (error) {
        context.log.error('Error in roles assignment:', error);
        
        // Fallback: return basic authenticated role
        context.res = {
            status: 200,
            body: {
                roles: ['authenticated']
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};