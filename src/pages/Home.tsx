import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { MOCK_UNIONS } from '../constants';
import UnionCard from '../components/UnionCard';
import { 
  Users, 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  ArrowRight, 
  Newspaper,
  BookOpen,
  FileText,
  Stethoscope
} from 'lucide-react';

export default function Home() {
  const recommendedUnions = MOCK_UNIONS.slice(0, 2);

  return (
    <Layout>
      <div className="p-4 space-y-8">
        {/* Quick Actions */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <Link to="/unions" className="bg-red-700 p-4 lg:p-6 rounded-3xl text-white shadow-lg shadow-red-700/20 flex flex-col gap-3 hover:scale-[1.02] transition-transform">
              <Users size={24} />
              <span className="font-bold text-sm lg:text-base leading-tight">Join a Union</span>
            </Link>
            <Link to="/resources" className="bg-slate-900 p-4 lg:p-6 rounded-3xl text-white shadow-lg shadow-slate-900/20 flex flex-col gap-3 hover:scale-[1.02] transition-transform">
              <ShieldCheck size={24} />
              <span className="font-bold text-sm lg:text-base leading-tight">Know Your Rights</span>
            </Link>
            <Link to="/resources" className="bg-white p-4 lg:p-6 rounded-3xl text-slate-900 border border-slate-100 shadow-sm flex flex-col gap-3 hover:scale-[1.02] transition-transform">
              <Scale size={24} className="text-red-700" />
              <span className="font-bold text-sm lg:text-base leading-tight">Find Legal Help</span>
            </Link>
            <Link to="/resources" className="bg-white p-4 lg:p-6 rounded-3xl text-slate-900 border border-slate-100 shadow-sm flex flex-col gap-3 hover:scale-[1.02] transition-transform">
              <AlertTriangle size={24} className="text-red-700" />
              <span className="font-bold text-sm lg:text-base leading-tight">Workplace Issues</span>
            </Link>
          </div>
        </section>

        {/* Trending Worker News */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg lg:text-xl font-bold text-slate-900">Trending Worker News</h2>
            <Link to="/resources" className="text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              See All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-red-700">
                <Newspaper size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Labour Law</span>
              </div>
              <h3 className="font-bold text-slate-900 leading-snug lg:text-lg">New Minimum Wage Adjustments for 2026</h3>
              <p className="text-slate-500 text-xs lg:text-sm line-clamp-2">The Department of Employment and Labour has announced new sectoral determinations...</p>
            </div>
            
            <div className="bg-white rounded-3xl p-5 lg:p-6 border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Strike Update</span>
              </div>
              <h3 className="font-bold text-slate-900 leading-snug lg:text-lg">Mining Sector Negotiations Reach Critical Phase</h3>
              <p className="text-slate-500 text-xs lg:text-sm line-clamp-2">NUM and mining houses continue talks as the current wage agreement nears expiration...</p>
            </div>

            <div className="hidden lg:block bg-white rounded-3xl p-5 lg:p-6 border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-blue-600">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Member Benefits</span>
              </div>
              <h3 className="font-bold text-slate-900 leading-snug lg:text-lg">New Healthcare Partnerships for COSATU Members</h3>
              <p className="text-slate-500 text-xs lg:text-sm line-clamp-2">We are proud to announce expanded medical coverage options through our latest partnership...</p>
            </div>
          </div>
        </section>

        {/* Recommended Unions */}
        <section className="space-y-4">
          <h2 className="text-lg lg:text-xl font-bold text-slate-900 px-1">Recommended Unions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {recommendedUnions.map(union => (
              // @ts-ignore
              <UnionCard key={union.id} union={union} />
            ))}
          </div>
        </section>

        {/* Worker Resources */}
        <section className="space-y-4 pb-4">
          <h2 className="text-lg lg:text-xl font-bold text-slate-900 px-1">Worker Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
            <Link to="/resources" className="flex items-center gap-4 bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-700">
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm lg:text-base">Labour Rights Guide</h4>
                <p className="text-slate-500 text-xs lg:text-sm">Understand your basic rights at work</p>
              </div>
              <ArrowRight size={16} className="text-slate-300" />
            </Link>
            
            <Link to="/resources" className="flex items-center gap-4 bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm lg:text-base">Contract Templates</h4>
                <p className="text-slate-500 text-xs lg:text-sm">Standard employment agreement forms</p>
              </div>
              <ArrowRight size={16} className="text-slate-300" />
            </Link>
            
            <Link to="/resources" className="flex items-center gap-4 bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700">
                <Stethoscope size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm lg:text-base">Safety Guides</h4>
                <p className="text-slate-500 text-xs lg:text-sm">Health and safety protocols for your sector</p>
              </div>
              <ArrowRight size={16} className="text-slate-300" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
