import { useState, FormEvent } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const { error: submitError } = await supabase
      .from('contact_messages')
      .insert([formData]);

    if (submitError) {
      setError('Failed to send message. Please try again.');
      setSubmitting(false);
    } else {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
        setSubmitting(false);
      }, 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-sky-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's talk!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                I'm always interested in hearing about new projects, opportunities, and collaborations. Whether you have a question or just want to say hello, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:alex.johnson@example.com"
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                  <Mail className="text-sky-600 group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">alex.johnson@example.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                  <Linkedin className="text-sky-600 group-hover:text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">LinkedIn</p>
                  <p className="text-gray-600">Connect with me</p>
                </div>
              </a>

              <a
                href="https://github.com/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-black transition-colors">
                  <Github className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">GitHub</p>
                  <p className="text-gray-600">Check out my code</p>
                </div>
              </a>
            </div>
          </div>

          <div className="animate-fade-in-delay">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send a Message
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
