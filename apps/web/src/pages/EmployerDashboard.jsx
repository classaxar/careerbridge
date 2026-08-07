import { Plus, Users, Briefcase, Activity } from 'lucide-react';

export default function EmployerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Employer Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your job postings and candidates.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} />
          Post New Job
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Active Jobs', value: '3', icon: Briefcase },
          { label: 'Total Applicants', value: '142', icon: Users },
          { label: 'Profile Views', value: '8.4k', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-400">
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Table Placeholder */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-semibold text-slate-900">Recent Applications</h3>
        </div>
        <div className="p-6 text-center text-gray-500 text-sm">
          No recent applications found.
        </div>
      </div>
    </div>
  );
}
