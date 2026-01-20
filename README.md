# Professional Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Supabase. This portfolio showcases professional work, skills, achievements, and provides an admin dashboard for content management.

## Features

### Public-Facing Features
- **Homepage**: Professional hero section with profile information and call-to-action buttons
- **About Me**: Detailed biography with skills categorized by type and proficiency levels
- **Projects**: Grid of project cards with images, descriptions, tech stack, and links
- **Resume**: Web-based resume with downloadable PDF option
- **Achievements**: Grid layout showcasing certifications and accomplishments
- **Contact**: Form for visitors to send messages with validation

### Admin Features
- **Secure Login**: Email/password authentication for admin access
- **Profile Management**: Update personal information, bio, and contact details
- **Project Management**: Full CRUD operations for projects
- **Message Management**: View and manage contact form submissions
- **Achievement Management**: Upload and organize achievements and certifications
- **Resume Management**: Update work experience, education, and certifications

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

### Backend & Database
- Supabase (PostgreSQL database)
- Supabase Auth for authentication
- Supabase Storage for images
- Row Level Security (RLS) policies for data protection

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. The Supabase database is already configured with:
   - Database tables and relationships
   - Row Level Security policies
   - Storage buckets for images
   - Sample dummy data

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

## Admin Access

To access the admin dashboard:

1. Navigate to the homepage
2. Click "Admin" in the footer (or go to `/#login`)
3. Sign in with admin credentials

**Creating an Admin User:**

You need to create a user account in your Supabase project:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Users
3. Click "Add user" > "Create new user"
4. Enter an email and password
5. Click "Create user"

Now you can use these credentials to log into the admin dashboard.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Main navigation bar
│   └── admin/          # Admin dashboard components
│       ├── AdminProfile.tsx
│       ├── AdminProjects.tsx
│       └── AdminMessages.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── lib/               # Utilities and configurations
│   ├── supabase.ts    # Supabase client
│   └── database.types.ts # TypeScript types
├── pages/             # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Resume.tsx
│   ├── Contact.tsx
│   ├── Admin.tsx
│   └── Login.tsx
├── App.tsx            # Main app component with routing
├── main.tsx          # Application entry point
└── index.css         # Global styles and animations
```

## Database Schema

The application uses the following Supabase tables:

- `profile` - User profile information
- `skills` - Technical skills with categories and proficiency levels
- `projects` - Portfolio projects
- `achievements` - Certifications and accomplishments
- `resume_sections` - Work experience, education, certifications
- `contact_messages` - Contact form submissions

All tables are protected with Row Level Security policies:
- Public read access for portfolio content
- Authenticated write access for admin operations
- Contact messages can be submitted by anyone

## Customization

### Colors
The portfolio uses a black, white, and light blue color scheme. To modify:
- Edit color classes in component files
- Update Tailwind config if needed

### Content
All content can be updated through the admin dashboard or directly in the Supabase database.

### Images
Images are stored using Supabase Storage in three buckets:
- `portfolio-images` - Profile and general images
- `project-images` - Project screenshots
- `achievement-images` - Achievement and certification images

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect Vite and configure build settings
4. Deploy

### Backend
Supabase is already hosted and managed. No additional backend deployment needed.

## Security Features

- Password hashing via Supabase Auth
- Row Level Security on all database tables
- Protected admin routes
- Secure authentication state management
- Input validation on forms
- CSRF protection via Supabase

## Performance Optimizations

- Optimized images from Pexels
- Code splitting via Vite
- Lazy loading of images
- Efficient database queries
- Responsive images for different screen sizes

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast text
- Responsive design for all devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
