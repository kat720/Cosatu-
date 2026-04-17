import Layout from '../components/Layout';
import { 
  User, 
  Phone, 
  Mail, 
  Building, 
  Briefcase, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight,
  Camera
} from 'lucide-react';

export default function Profile() {
  return (
    <Layout>
      <div className="p-4 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="relative">
            <div className="w-28 h-28 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 overflow-hidden border-4 border-white shadow-md">
              <User size={64} />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-red-700 rounded-full border-4 border-white flex items-center justify-center text-white shadow-sm">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Thabo Mbeki</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Manufacturing Worker</p>
          </div>
        </div>

        {/* Personal Details & Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Personal Details</h3>
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full">
              {[
                { label: 'Phone', value: '+27 82 123 4567', icon: Phone },
                { label: 'Email', value: 'thabo.m@example.com', icon: Mail },
                { label: 'Employer', value: 'SteelWorks SA', icon: Building },
                { label: 'Job Title', value: 'Senior Welder', icon: Briefcase },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-5 ${i !== 3 ? 'border-b border-slate-50' : ''}`}>
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-slate-900 font-bold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Settings & Logout */}
          <div className="space-y-8">
            <section className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Settings</h3>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {[
                  { label: 'Notifications', icon: Bell },
                  { label: 'Security', icon: Shield },
                ].map((item, i) => (
                  <button key={i} className={`w-full flex items-center justify-between p-5 ${i === 0 ? 'border-b border-slate-50' : ''} hover:bg-slate-50 transition-colors`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <item.icon size={18} />
                      </div>
                      <span className="text-slate-900 font-bold text-sm">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </button>
                ))}
              </div>
            </section>

            {/* Logout */}
            <div className="pb-4">
              <button className="w-full py-4 bg-white border border-red-100 text-red-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-red-50 transition-colors">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
