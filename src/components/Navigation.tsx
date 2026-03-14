import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-emerald-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home"><img src={'${import.meta.env.BASE_URL}logo.png'} alt="OAA Logo" className="h-24 w-auto" /></a>
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors text-sm font-medium">
                {link.name}
              </a>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-emerald-400">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden py-4 border-t border-emerald-900/30">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block py-2 text-gray-300 hover:text-emerald-400" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
