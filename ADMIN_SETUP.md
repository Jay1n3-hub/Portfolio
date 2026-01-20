# Admin Setup Guide

This guide explains how to set up and use the admin dashboard for managing your portfolio content.

## Creating Your Admin Account

Since the database is already set up with Supabase, you need to create an admin user account:

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard at https://app.supabase.com
2. Navigate to **Authentication** > **Users** in the left sidebar
3. Click the **Add user** button
4. Select **Create new user**
5. Enter your email address (this will be your admin login)
6. Enter a secure password
7. Click **Create user**

That's it! You can now use these credentials to log into the admin dashboard.

### Method 2: Using Supabase SQL Editor

If you prefer, you can also create a user via SQL:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this query (replace with your email and password):

```sql
-- This will be handled by Supabase Auth API, use the dashboard method above instead
```

## Logging In

1. Open your portfolio website
2. Scroll to the footer and click **Admin** (or navigate to `/#login`)
3. Enter your email and password
4. Click **Sign In**

You will be redirected to the admin dashboard.

## Admin Dashboard Features

### Profile Management
- Update your full name, title, and professional bio
- Edit your value statement (shown on homepage)
- Update contact information (email, LinkedIn, GitHub)
- Change profile image URL

### Projects Management
- View all projects
- Edit project details (title, description, tech stack)
- Mark projects as featured
- Delete projects
- Add new projects (feature coming soon)

### Messages
- View contact form submissions
- Mark messages as read
- Delete messages
- See sender details and timestamps

### Achievements (Coming Soon)
- Upload achievement images
- Add descriptions and dates
- Manage certifications

### Resume (Coming Soon)
- Update work experience
- Edit education history
- Manage certifications

## Security Best Practices

1. **Use a Strong Password**: At least 12 characters with a mix of letters, numbers, and symbols
2. **Don't Share Credentials**: Keep your admin login private
3. **Log Out**: Always log out when finished managing content
4. **Regular Backups**: Supabase handles database backups automatically

## Troubleshooting

### Can't Log In?
- Verify your email and password are correct
- Check that you created the user in the correct Supabase project
- Ensure your Supabase project is active

### Changes Not Showing?
- Refresh the page after making updates
- Clear browser cache if needed
- Check browser console for any errors

### Forgot Password?
Currently, password reset must be done through the Supabase dashboard:
1. Go to Authentication > Users
2. Find your user
3. Click the three dots menu
4. Select "Reset password"
5. You'll receive a reset email

## Content Management Tips

### Profile
- Keep your bio concise but informative (2-3 paragraphs)
- Use a professional headshot or avatar
- Update your value statement to reflect your current focus

### Projects
- Use high-quality project images (16:9 aspect ratio works best)
- Write clear, benefit-focused descriptions
- Include 3-5 key technologies in the tech stack
- Add both live demo and GitHub links when available

### Contact Messages
- Check messages regularly
- Respond promptly to inquiries
- Archive or delete old messages to keep the list clean

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase project is running
3. Ensure the database tables and policies are set up correctly

## Future Features

Planned enhancements for the admin dashboard:
- Full CRUD operations for all content types
- Image upload directly in the admin panel
- Bulk operations for projects and achievements
- Analytics dashboard
- Email notification settings
- Draft/publish workflow for projects
