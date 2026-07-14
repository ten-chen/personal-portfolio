import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../App';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 bg-slate-950 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white animate-fade-up">Featured Projects</h2>
        {projects.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3 animate-fade-up">
            {categories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${selectedCategory === category ? 'bg-sky-500 text-slate-950' : 'bg-sky-950/30 text-sky-400 hover:bg-sky-950/50 border border-sky-500/30'}`}>
                {category}
              </button>
            ))}
          </div>
        )}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>Add projects to get started. Projects will appear here with filters.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="group rounded-lg overflow-hidden bg-gradient-to-br from-sky-950/30 to-slate-950 border border-sky-500/20 hover:border-sky-500/50 transition-all duration-300 animate-fade-up hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video bg-gradient-to-br from-sky-600/20 to-cyan-800/20 flex items-center justify-center overflow-hidden">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl font-bold text-sky-400/30">IMG</div>
                      <p className="text-sky-300/30 mt-2 text-sm">Add image URL to database</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-sky-950/50 text-sky-300 text-xs rounded border border-sky-500/30">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-sky-950/50 text-sky-300 text-xs rounded border border-sky-500/30">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-sky-950/30 hover:bg-sky-950/60 text-sky-400 rounded transition-colors border border-sky-500/30">
                        <Github size={16} />
                        Code
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-sky-500 hover:bg-sky-600 text-slate-950 font-semibold rounded transition-colors">
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
