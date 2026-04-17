import { Link } from 'react-router-dom';
import { Union } from '../types';

interface UnionCardProps {
  union: Union;
}

// @ts-ignore
export default function UnionCard({ union }: UnionCardProps) {
  const fee = union.membership_fee || union.monthly_fee;
  
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all mb-4">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 shrink-0 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-100">
          {union.logo_url ? (
            <img 
              src={union.logo_url} 
              alt={union.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-red-700 font-bold text-xl">{union.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-slate-900 leading-tight mb-1">{union.name}</h2>
          <span className="inline-block px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
            {union.industry}
          </span>
        </div>
      </div>
      
      <p className="text-slate-500 text-sm mb-5 leading-relaxed line-clamp-2">
        {union.description}
      </p>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
          <div>Members: <span className="text-slate-900">{union.member_count || '100,000+'}</span></div>
          <div>Fee: <span className="text-emerald-600">R{fee}/mo</span></div>
        </div>
        
        <Link 
          to={`/unions/${union.id}`}
          className="w-full py-3.5 bg-slate-900 text-white text-center rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
        >
          View Union
        </Link>
      </div>
    </div>
  );
}
