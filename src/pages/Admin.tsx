import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Mail, FolderOpen, Award, FileText, User } from 'lucide-react';
import { AdminProjects } from '../components/admin/AdminProjects';
import { AdminProfile } from '../components/admin/AdminProfile';
import { AdminMessages } from '../components/admin/AdminMessages';

type AdminTab = 'profile' | 'projects' | 'achievements' | 'resume' | 'messages';

export function Admin() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('profile');

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'profile' as AdminTab, label: 'Profile', icon: User },
    { id: 'projects' as AdminTab, label: 'Projects', icon: FolderOpen },
    { id: 'achievements' as AdminTab, label: 'Achievements', icon: Award },
    { id: 'resume' as AdminTab, label: 'Resume', icon: FileText },
    { id: 'messages' as AdminTab, label: 'Messages', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-sky-600 border-b-2 border-sky-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'profile' && <AdminProfile />}
            {activeTab === 'projects' && <AdminProjects />}
            {activeTab === 'messages' && <AdminMessages />}
            {activeTab === 'achievements' && (
              <div className="text-center py-12 text-gray-500">
                Achievement management coming soon...
              </div>
            )}
            {activeTab === 'resume' && (
              <div className="text-center py-12 text-gray-500">
                Resume management coming soon...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
