import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Skill } from '../App';

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await supabase.from('skills').select('*').order('category', { ascending: true });
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'from-yellow-600 to-yellow-700';
      case 'intermediate': return 'from-emerald-500 to-emerald-600';
      case 'advanced': return 'from-emerald-400 to-emerald-500';
      default: return 'from-emerald-500 to-emerald-600';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'beginner': return 'w-1/3';
      case 'intermediate': return 'w-2/3';
      case 'advanced': return 'w-full';
      default: return 'w-2/3';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black to-emerald-950/5 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white animate-fade-up">Skills & Technologies</h2>
        {Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>Add skills to showcase your expertise. Skills will appear here organized by category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
              <div key={category} className="space-y-6 animate-fade-up" style={{ animationDelay: `${categoryIndex * 0.2}s` }}>
                <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-sm">{categorySkills.length}</span>
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 font-medium group-hover:text-emerald-400 transition-colors">{skill.name}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{skill.level}</span>
                      </div>
                      <div className="h-2 bg-emerald-950/40 rounded-full overflow-hidden border border-emerald-500/20">
                        <div className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)} transition-all duration-500 rounded-full`} style={{ width: getLevelWidth(skill.level) }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
