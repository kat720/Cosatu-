import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  Filter
} from 'lucide-react';
import { MOCK_DISPUTES } from '../constants';
import { supabase } from '../lib/supabase';

export default function MyDisputes() {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState<any[]>(MOCK_DISPUTES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDisputes() {
      try {
        const { data, error } = await supabase
          .from('disputes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setDisputes(data);
        }
      } catch (error) {
        console.error('Error fetching disputes:', error);
        // Fallback to mock data
      } finally {
        setLoading(false);
      }
    }

    fetchDisputes();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Under Review': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Union Contacted Employer': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Resolved': return 'bg-green-50 text-green-600 border-green-100';
      case 'Closed': return 'bg-slate-50 text-slate-600 border-slate-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Low': return 'text-slate-400';
      case 'Medium': return 'text-amber-500';
      case 'High': return 'text-orange-600';
      case 'Emergency': return 'text-red-600';
      default: return 'text-slate-400';
    }
  };

  return (
    <Layout hideNav>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h2 className="text-xl font-bold text-slate-900">My Workplace Issues</h2>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search issues..." 
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
          <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600">
            <Filter size={20} />
          </button>
        </div>

        {/* Disputes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-10">
          {disputes.map((dispute) => (
            <button 
              key={dispute.id}
              onClick={() => navigate(`/disputes/${dispute.id}`)}
              className="w-full bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-left group hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusColor(dispute.status)}`}>
                  {dispute.status}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Clock size={12} />
                  {new Date(dispute.created_at).toLocaleDateString()}
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{dispute.dispute_type}</h3>
              <p className="text-sm text-slate-500 mb-4">Employer: <span className="font-bold text-slate-700">{dispute.employer}</span></p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className={getUrgencyColor(dispute.urgency)} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${getUrgencyColor(dispute.urgency)}`}>
                    {dispute.urgency} Priority
                  </span>
                </div>
                <div className="flex items-center gap-1 text-red-700 font-bold text-xs group-hover:translate-x-1 transition-transform">
                  View Details
                  <ChevronRight size={14} />
                </div>
              </div>
            </button>
          ))}

          {disputes.length === 0 && !loading && (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-slate-500 font-medium">No workplace issues reported yet.</p>
              <button 
                onClick={() => navigate('/report-dispute')}
                className="text-red-700 font-bold text-sm"
              >
                Report an issue now
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
