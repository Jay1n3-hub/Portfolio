import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Resume } from './pages/Resume';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';

type Page = 'home' | 'about' | 'projects' | 'resume' | 'contact' | 'admin' | 'login';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const hash = window.location.hash.slice(1) as Page;
    if (hash && ['home', 'about', 'projects', 'resume', 'contact', 'admin', 'login'].includes(hash)) {
      setCurrentPage(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent" />
      </div>
    );
  }

  if (currentPage === 'login') {
    return <Login onLoginSuccess={() => setCurrentPage('admin')} />;
  }

  if (currentPage === 'admin') {
    if (!user) {
      setCurrentPage('login');
      return null;
    }
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <main>
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'projects' && <Projects />}
        {currentPage === 'resume' && <Resume />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Portfolio</h3>
              <p className="text-gray-400">
                Building innovative digital solutions that drive real business value.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Me
                </button>
                <button
                  onClick={() => setCurrentPage('projects')}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Projects
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <p className="text-gray-400 mb-2">
                Let's work together on your next project.
              </p>
              <button
                onClick={() => setCurrentPage('login')}
                className="text-gray-500 hover:text-gray-400 text-xs transition-colors"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
