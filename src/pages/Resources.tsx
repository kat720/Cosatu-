import Layout from '../components/Layout';
import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  ChevronRight, 
  BookOpen,
  Gavel,
  Stethoscope,
  MessageSquare
} from 'lucide-react';

export default function Resources() {
  return (
    <Layout>
      <div className="p-4 space-y-8">
        <h2 className="text-2xl font-bold text-slate-900">Worker Resources</h2>

        {/* Know Your Labour Rights */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold px-1">
            <Scale size={20} className="text-red-700" />
            <h3 className="text-sm uppercase tracking-widest">Know Your Labour Rights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
            {[
              { title: 'Dismissal Rights', desc: 'What to do if you are unfairly fired', icon: ShieldCheck },
              { title: 'Minimum Wage', desc: 'Current rates for your sector in 2026', icon: BookOpen },
              { title: 'Overtime Laws', desc: 'How many hours you can legally work', icon: Gavel },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-700">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm lg:text-base">{item.title}</h4>
                  <p className="text-slate-500 text-xs lg:text-sm">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* Legal Help */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold px-1">
            <AlertTriangle size={20} className="text-amber-600" />
            <h3 className="text-sm uppercase tracking-widest">Legal Help</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
            {[
              { title: 'Report Unfair Dismissal', desc: 'Step-by-step guide to CCMA reporting', icon: Scale },
              { title: 'Workplace Harassment', desc: 'Confidential help and reporting tools', icon: MessageSquare },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm lg:text-base">{item.title}</h4>
                  <p className="text-slate-500 text-xs lg:text-sm">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </section>

        {/* Workplace Tools */}
        <section className="space-y-4 pb-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold px-1">
            <FileText size={20} className="text-blue-600" />
            <h3 className="text-sm uppercase tracking-widest">Workplace Tools</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
            {[
              { title: 'Contract Templates', desc: 'Standard employment agreement forms', icon: FileText },
              { title: 'Safety Checklists', desc: 'Daily OHS inspection forms', icon: Stethoscope },
              { title: 'Grievance Forms', desc: 'Formal complaint submission templates', icon: FileText },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm text-left hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <item.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm lg:text-base">{item.title}</h4>
                  <p className="text-slate-500 text-xs lg:text-sm">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
