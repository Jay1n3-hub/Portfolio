import { useEffect, useState } from 'react';
import { ChevronDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Profile {
  full_name: string;
  title: string;
  value_statement: string;
  profile_image_url: string | null;
  email: string;
  linkedin_url: string | null;
  github_url: string | null;
}

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
      } else if (data) {
        setProfile(data);
      } else {
        console.warn('No profile data found in database');
        setProfile({
          full_name: 'Alex Johnson',
          title: 'ICT & Informatics Professional',
          value_statement: 'Building innovative digital solutions that drive real business value',
          profile_image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
          email: 'alex@example.com',
          linkedin_url: 'https://linkedin.com',
          github_url: 'https://github.com',
        });
      }
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      setProfile({
        full_name: 'Alex Johnson',
        title: 'ICT & Informatics Professional',
        value_statement: 'Building innovative digital solutions that drive real business value',
        profile_image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        email: 'alex@example.com',
        linkedin_url: 'https://linkedin.com',
        github_url: 'https://github.com',
      });
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-sky-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="text-sm font-semibold text-sky-600 tracking-wider uppercase">
                  Portfolio
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                {profile.full_name}
              </h1>

              <p className="text-2xl lg:text-3xl text-gray-600 font-light">
                {profile.title}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {profile.value_statement}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => onNavigate('projects')}
                  className="px-8 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 hover:scale-105"
                >
                  View Projects
                </button>

                <button
                  onClick={() => onNavigate('resume')}
                  className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-200"
                >
                  <Download size={20} className="inline mr-2" />
                  Resume
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-all duration-200 hover:scale-105"
                >
                  <Mail size={20} className="inline mr-2" />
                  Contact Me
                </button>
              </div>

              <div className="flex gap-6 pt-4">
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-sky-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                )}
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={24} />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-gray-600 hover:text-sky-600 transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={24} />
                  </a>
                )}
              </div>
            </div>

            <div className="relative lg:block hidden animate-fade-in-delay">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-sky-600 rounded-full opacity-10 animate-pulse-slow" />
                <div className="absolute inset-8 bg-sky-400 rounded-full opacity-20 animate-pulse-slower" />
                <img
                  src={profile.profile_image_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'}
                  alt={profile.full_name}
                  className="absolute inset-16 w-auto h-auto rounded-full object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>
    </div>
  );
}
