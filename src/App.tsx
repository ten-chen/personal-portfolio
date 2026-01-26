import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  resume_url: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await supabase.from('profile').select('*').maybeSingle();
        if (data) setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse-glow rounded-full w-12 h-12 border-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <Navigation />
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects />
      <Skills />
      <Experience />
      <Contact profile={profile} />
      <Footer />
    </div>
  );
}

export default App;
