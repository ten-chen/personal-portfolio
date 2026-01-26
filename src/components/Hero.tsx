import { ArrowRight, Code2, Sparkles } from 'lucide-react';
import { Profile } from '../App';

interface HeroProps { profile: Profile | null; }

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="home" className="min-h-screen pt-20 bg-gradient-to-b from-black via-black to-emerald-950/10 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-700/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full">
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Welcome to my digital portfolio</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-left">
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            {profile?.name || 'Portfolio'}
          </span>
        </h1>
        <h2 className="text-2xl md:text-4xl text-gray-300 mb-8 animate-slide-right">
          {profile?.title || 'Computer Engineer'}
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up">
          {profile?.bio || 'Building innovative solutions with code and creativity'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up">
          <a href="#projects" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all hover:scale-105">
            <Code2 size={20} />
            View My Work
            <ArrowRight size={20} />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-emerald-500/50 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-950/20 transition-all">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
