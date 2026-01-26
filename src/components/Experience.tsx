import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Experience as ExperienceType } from '../App';
import { Calendar, MapPin } from 'lucide-react';

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  const education = experiences.filter((e) => e.type === 'education');
  const work = experiences.filter((e) => e.type === 'work');

  return (
    <section id="experience" className="py-20 bg-black relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white animate-fade-up">Experience & Education</h2>
        <div className="space-y-12">
          {education.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-3 animate-fade-up">
                <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent rounded"></span>
                Education
              </h3>
              <div className="space-y-6">
                {education.map((item, index) => (
                  <div key={item.id} className="relative pl-8 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black animate-pulse-glow"></div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-950/20 to-black border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-white">{item.title}</h4>
                          <p className="text-emerald-400 font-medium">{item.organization}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap">
                          <Calendar size={16} />
                          {formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : 'Present'}
                        </div>
                      </div>
                      {item.location && (<p className="text-gray-400 text-sm mb-3 flex items-center gap-2"><MapPin size={16} />{item.location}</p>)}
                      {item.description && <p className="text-gray-300 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {work.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-3 animate-fade-up">
                <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-transparent rounded"></span>
                Work Experience
              </h3>
              <div className="space-y-6">
                {work.map((item, index) => (
                  <div key={item.id} className="relative pl-8 animate-fade-up" style={{ animationDelay: `${(education.length + index) * 0.1}s` }}>
                    <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black animate-pulse-glow"></div>
                    <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-950/20 to-black border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-white">{item.title}</h4>
                          <p className="text-emerald-400 font-medium">{item.organization}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm whitespace-nowrap">
                          <Calendar size={16} />
                          {formatDate(item.start_date)} - {item.end_date ? formatDate(item.end_date) : 'Present'}
                        </div>
                      </div>
                      {item.location && (<p className="text-gray-400 text-sm mb-3 flex items-center gap-2"><MapPin size={16} />{item.location}</p>)}
                      {item.description && <p className="text-gray-300 leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {education.length === 0 && work.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>Add your education and work experience to build your timeline.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
