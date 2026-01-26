import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Profile, SocialLink } from '../App';
import { Mail, ExternalLink, Download } from 'lucide-react';

interface ContactProps { profile: Profile | null; }

export default function Contact({ profile }: ContactProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const { data } = await supabase.from('social_links').select('*');
        setSocialLinks(data || []);
      } catch (error) {
        console.error('Error fetching social links:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSocialLinks();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, string> = { github: '🐙', linkedin: '💼', twitter: '𝕏', instagram: '📷', email: '✉️' };
    return icons[platform] || '🔗';
  };

  const downloadResume = () => {
    if (profile?.resume_url) window.open(profile.resume_url, '_blank');
    else alert('Resume URL not configured. Add resume_url to your profile.');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-emerald-950/10 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white animate-fade-up">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-slide-left">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-400 leading-relaxed">I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!</p>
            </div>
            <div className="space-y-4 mb-8">
              {socialLinks.length === 0 ? (
                <p className="text-gray-400 text-sm">Add social links to your profile to display here.</p>
              ) : (
                socialLinks.map((link, index) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-all duration-300 group animate-fade-up hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-2xl">{getSocialIcon(link.platform)}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white capitalize">{link.platform}</p>
                      <p className="text-gray-400 text-sm truncate group-hover:text-emerald-400 transition-colors">{link.url.replace(/^(https?:\/\/|mailto:)/, '')}</p>
                    </div>
                    <ExternalLink size={16} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))
              )}
            </div>
            {profile?.resume_url && (
              <button onClick={downloadResume} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <Download size={20} />
                Download Resume
              </button>
            )}
          </div>
          <div className="animate-slide-right">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors" placeholder="your@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className="w-full px-4 py-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none" placeholder="Your message..." required></textarea>
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105">
                <Mail size={20} />
                Send Message
              </button>
              {submitted && (
                <div className="p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-center animate-fade-up">
                  Message submitted! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
