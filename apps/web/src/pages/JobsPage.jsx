import { Search, MapPin, Briefcase } from 'lucide-react';

export default function JobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Job Feed</h1>
        <p className="text-gray-500">Discover your next career move.</p>
      </div>

      {/* Minimalist Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search roles, companies..." 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors">
          Search
        </button>
      </div>

      {/* Placeholder Job Card */}
      <div className="grid gap-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Senior Frontend Engineer</h3>
                <p className="text-sm text-gray-500 mt-1">TechCorp Inc.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                Full-time
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5"><MapPin size={14}/> Remote</div>
              <div className="flex items-center gap-1.5"><Briefcase size={14}/> $120k - $150k</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
