import { Link } from 'react-router-dom';
import { Briefcase, User, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
              <Briefcase size={20} />
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              CareerBridge
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link to="/jobs" className="text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors">
            Find Work
          </Link>
          <Link to="/employer" className="text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors">
            Hire Talent
          </Link>
          
          <div className="h-4 w-px bg-gray-200"></div>
          
          {/* Minimalist Auth Buttons (Placeholders for Clerk) */}
          <Link to="/jobs" className="text-sm font-medium text-slate-900 hover:text-slate-700 transition-colors">
            Log in
          </Link>
          <Link to="/jobs" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden">
          <button className="text-gray-600 hover:text-slate-900 p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
