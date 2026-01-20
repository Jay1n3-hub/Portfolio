import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  featured: boolean;
}

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Project>>({});

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('display_order');

    if (data) setProjects(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    await supabase.from('projects').delete().eq('id', id);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditing(project.id);
    setEditData(project);
  };

  const handleSave = async () => {
    if (!editing) return;

    await supabase
      .from('projects')
      .update({
        ...editData,
        tech_stack: editData.tech_stack,
        updated_at: new Date().toISOString(),
      })
      .eq('id', editing);

    setEditing(null);
    setEditData({});
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
        <button className="px-4 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-50 rounded-xl p-6">
            {editing === project.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.title || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
                  placeholder="Project Title"
                />

                <textarea
                  value={editData.description || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none resize-none"
                  placeholder="Description"
                />

                <input
                  type="text"
                  value={editData.tech_stack?.join(', ') || ''}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      tech_stack: e.target.value.split(',').map((s) => s.trim()),
                    }))
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none"
                  placeholder="Tech Stack (comma separated)"
                />

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(null);
                      setEditData({});
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
