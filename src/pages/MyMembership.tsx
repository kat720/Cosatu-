import Layout from '../components/Layout';
import { 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  Bell, 
  ChevronRight, 
  AlertCircle,
  FileText,
  Scale,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyMembership() {
  const navigate = useNavigate();

  // Mock membership data
  const membership = {
    union: 'NUMSA',
    status: 'Active',
    memberSince: 'March 2026',
    memberId: 'NUM-88291-SA',
    nextPayment: '1 April 2026',
    paymentAmount: 'R160.00',
    announcements: [
      { id: 1, title: 'Strike notice: Automotive Sector', date: '2 hours ago' },
      { id: 2, title: 'Wage negotiations update', date: 'Yesterday' },
    ]
  };

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">My Membership</h2>

        {/* Membership Status Card */}
        <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Union</p>
                <h3 className="text-2xl font-bold">{membership.union}</h3>
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/30">
                {membership.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Since</p>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Calendar size={14} className="text-red-500" />
                  {membership.memberSince}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member ID</p>
                <div className="flex items-center gap-2 font-bold text-sm">
                  <ShieldCheck size={14} className="text-red-500" />
                  {membership.memberId}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workplace Support Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold px-1">
            <Scale size={18} className="text-red-700" />
            <h3 className="text-sm uppercase tracking-widest">Workplace Support</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-6">
            <button 
              onClick={() => navigate('/report-dispute')}
              className="bg-white p-5 lg:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 group active:scale-95 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-700 group-hover:bg-red-700 group-hover:text-white transition-colors">
                <AlertCircle size={24} />
              </div>
              <span className="text-xs lg:text-sm font-bold text-slate-900">Report Workplace Issue</span>
            </button>
            <button 
              onClick={() => navigate('/my-disputes')}
              className="bg-white p-5 lg:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3 group active:scale-95 transition-all hover:shadow-md"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <span className="text-xs lg:text-sm font-bold text-slate-900">View My Disputes</span>
            </button>
          </div>
        </section>

        {/* Payment Status */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Payment Status</h3>
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Next Payment</p>
                <p className="text-slate-900 font-bold text-sm">{membership.nextPayment}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Amount</p>
              <p className="text-red-700 font-bold text-sm">{membership.paymentAmount}</p>
            </div>
          </div>
        </section>

        {/* Union Announcements */}
        <section className="space-y-3 pb-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Union Announcements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-6">
            {membership.announcements.map((announcement) => (
              <button key={announcement.id} className="w-full bg-white p-5 lg:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-700">
                    <Bell size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900 text-sm lg:text-base">{announcement.title}</h4>
                    <p className="text-slate-400 text-[10px] lg:text-xs font-bold uppercase tracking-widest">{announcement.date}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
