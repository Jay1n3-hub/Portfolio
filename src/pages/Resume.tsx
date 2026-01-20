import { useEffect, useState } from 'react';
import { Download, Mail, Linkedin, Github, MapPin, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Profile {
  full_name: string;
  title: string;
  email: string;
  linkedin_url: string | null;
  github_url: string | null;
  resume_pdf_url: string | null;
}

interface ResumeSection {
  id: string;
  section_type: string;
  title: string;
  organization: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  date_earned: string | null;
}

export function Resume() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sections, setSections] = useState<ResumeSection[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('full_name, title, email, linkedin_url, github_url, resume_pdf_url')
        .maybeSingle();

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('resume_sections')
        .select('*')
        .order('display_order');

      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('display_order');

      if (profileError) console.error('Profile error:', profileError);
      if (sectionsError) console.error('Sections error:', sectionsError);
      if (achievementsError) console.error('Achievements error:', achievementsError);

      if (profileData) {
        setProfile(profileData);
      } else {
        setProfile({
          full_name: 'Alex Johnson',
          title: 'ICT & Informatics Professional',
          email: 'alex@example.com',
          linkedin_url: 'https://linkedin.com',
          github_url: 'https://github.com',
          resume_pdf_url: null,
        });
      }

      if (sectionsData) setSections(sectionsData);
      if (achievementsData) setAchievements(achievementsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const groupedSections = sections.reduce((acc, section) => {
    if (!acc[section.section_type]) {
      acc[section.section_type] = [];
    }
    acc[section.section_type].push(section);
    return acc;
  }, {} as Record<string, ResumeSection[]>);

  const sectionTitles: Record<string, string> = {
    experience: 'Work Experience',
    education: 'Education',
    certification: 'Certifications',
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-32">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 shadow-lg animate-fade-in">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {profile.full_name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{profile.title}</p>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <a href={`mailto:${profile.email}`} className="hover:text-sky-600">
                    {profile.email}
                  </a>
                </div>
                {profile.linkedin_url && (
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} />
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-600"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {profile.github_url && (
                  <div className="flex items-center gap-2">
                    <Github size={16} />
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-600"
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            {profile.resume_pdf_url && (
              <button
                onClick={() => window.open(profile.resume_pdf_url!, '_blank')}
                className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                Download PDF
              </button>
            )}
          </div>

          <div className="border-t-2 border-gray-200 pt-12 space-y-12">
            {Object.entries(groupedSections).map(([type, items]) => (
              <div key={type}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-sky-600 rounded-full" />
                  {sectionTitles[type] || type}
                </h2>

                <div className="space-y-8 ml-4">
                  {items.map((item) => (
                    <div key={item.id} className="relative pl-8 border-l-2 border-gray-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-sky-600 rounded-full" />

                      <div className="mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.title}
                        </h3>
                        {item.organization && (
                          <p className="text-lg text-gray-700 font-medium">
                            {item.organization}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        {item.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {item.location}
                          </div>
                        )}
                        {(item.start_date || item.end_date) && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {item.start_date} {item.end_date && `- ${item.end_date}`}
                          </div>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {achievements.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-sky-600 rounded-full" />
                  Achievements & Certifications
                </h2>

                <div className="grid md:grid-cols-2 gap-6 ml-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      {achievement.image_url && (
                        <img
                          src={achievement.image_url}
                          alt={achievement.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="font-bold text-gray-900 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {achievement.description}
                      </p>
                      {achievement.date_earned && (
                        <p className="text-xs text-gray-500">
                          Earned: {new Date(achievement.date_earned).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
