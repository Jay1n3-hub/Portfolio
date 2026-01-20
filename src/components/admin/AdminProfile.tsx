import { useState, useEffect, FormEvent } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ProfileData {
  full_name: string;
  title: string;
  bio: string;
  value_statement: string;
  email: string;
  linkedin_url: string;
  github_url: string;
}

export function AdminProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    title: '',
    bio: '',
    value_statement: '',
    email: '',
    linkedin_url: '',
    github_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profile')
      .select('*')
      .maybeSingle();

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        title: data.title || '',
        bio: data.bio || '',
        value_statement: data.value_statement || '',
        email: data.email || '',
        linkedin_url: data.linkedin_url || '',
        github_url: data.github_url || '',
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { data: existingProfile } = await supabase
      .from('profile')
      .select('id')
      .maybeSingle();

    if (existingProfile) {
      await supabase
        .from('profile')
        .update({ ...profile, updated_at: new Date().toISOString() })
        .eq('id', existingProfile.id);
    } else {
      await supabase.from('profile').insert([profile]);
    }

    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Profile updated successfully!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={profile.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Value Statement
        </label>
        <input
          type="text"
          name="value_statement"
          value={profile.value_statement}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bio
        </label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none resize-none"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            name="linkedin_url"
            value={profile.linkedin_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={profile.github_url}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        <Save size={20} />
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
