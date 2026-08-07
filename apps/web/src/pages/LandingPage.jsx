import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="max-w-3xl text-center space-y-8">
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-tight">
          The future of <br className="hidden md:block"/> hiring is <span className="text-blue-600">here.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          A premium, unified platform designed to seamlessly connect top-tier talent with world-class employers. 
          No clutter. Just opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            to="/jobs" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20"
          >
            Find a Job
            <ArrowRight size={16} />
          </Link>
          <Link 
            to="/employer" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-200 px-8 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:bg-gray-50 hover:border-gray-300"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
}
