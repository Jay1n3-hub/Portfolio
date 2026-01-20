import { useState, useEffect } from 'react';
import { Mail, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setMessages(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    await supabase.from('contact_messages').delete().eq('id', id);
    fetchMessages();
  };

  const markAsRead = async (id: string) => {
    await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No messages yet
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl p-6 ${
                message.read ? 'bg-gray-50' : 'bg-sky-50 border-2 border-sky-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {message.name}
                    </h3>
                    {!message.read && (
                      <span className="px-2 py-1 bg-sky-600 text-white text-xs rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{message.email}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  {!message.read && (
                    <button
                      onClick={() => markAsRead(message.id)}
                      className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Mail size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(message.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">
                  {message.subject}
                </p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
