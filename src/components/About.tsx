import { Profile } from '../App';

interface AboutProps { profile: Profile | null; }

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-black relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white animate-fade-up">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-left">
            <div className="rounded-lg overflow-hidden bg-gradient-to-br from-emerald-500/10 to-emerald-700/5 p-8 border border-emerald-500/20">
              <div className="aspect-video bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-emerald-400 opacity-20">OAA</div>
                  <p className="text-emerald-300/50 mt-2">Your photo here</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 animate-slide-right">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-3">Full-Stack Developer</h3>
              <p className="text-gray-300 leading-relaxed">
                Currently pursuing my passion at Asia Pacific University (APU) in Kuala Lumpur, Malaysia. Deeply interested in solving complex problems through code and creating impactful solutions.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white">What I Do</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-1">•</span>
                  <span>Develop full-stack web applications and software solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-1">•</span>
                  <span>Explore emerging technologies and best practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold mt-1">•</span>
                  <span>Build projects that demonstrate creativity and technical excellence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
