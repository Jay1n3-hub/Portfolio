import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Profile {
  full_name: string;
  bio: string;
  profile_image_url: string | null;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export function About() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('full_name, bio, profile_image_url')
        .maybeSingle();

      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('display_order');

      if (profileError) console.error('Profile error:', profileError);
      if (skillsError) console.error('Skills error:', skillsError);

      if (profileData) {
        setProfile(profileData);
      } else {
        setProfile({
          full_name: 'Alex Johnson',
          bio: 'Passionate technology professional with expertise in software development, system architecture, and digital transformation.',
          profile_image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        });
      }

      if (skillsData && skillsData.length > 0) {
        setSkills(skillsData);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-sky-600 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900">
              Who I Am
            </h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed">
              {profile.bio.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-delay">
            <div className="relative">
              <div className="absolute -inset-4 bg-sky-100 rounded-2xl transform rotate-3" />
              <img
                src={profile.profile_image_url || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'}
                alt={profile.full_name}
                className="relative rounded-2xl shadow-xl w-full object-cover aspect-square"
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-in-delay">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Skills & Technologies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div
                key={category}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {skill.proficiency}/5
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-600 rounded-full transition-all duration-500"
                          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
