import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  FileText, 
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Building,
  Upload,
  Calendar
} from 'lucide-react';
import { MOCK_DISPUTES } from '../constants';
import { supabase } from '../lib/supabase';

export default function DisputeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dispute, setDispute] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDispute() {
      try {
        const { data, error } = await supabase
          .from('disputes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setDispute(data);
        } else {
          // Fallback to mock data
          const mock = MOCK_DISPUTES.find(d => d.id === id);
          setDispute(mock);
        }
      } catch (error) {
        console.error('Error fetching dispute:', error);
        // Fallback to mock data
        const mock = MOCK_DISPUTES.find(d => d.id === id);
        setDispute(mock);
      } finally {
        setLoading(false);
      }
    }

    fetchDispute();
  }, [id]);

  if (loading) {
    return (
      <Layout hideNav>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
        </div>
      </Layout>
    );
  }

  if (!dispute) {
    return (
      <Layout hideNav>
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dispute Not Found</h2>
          <button 
            onClick={() => navigate('/my-disputes')}
            className="text-red-700 font-bold text-sm"
          >
            Back to My Disputes
          </button>
        </div>
      </Layout>
    );
  }

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

  return (
    <Layout hideNav>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h2 className="text-xl font-bold text-slate-900">Dispute Details</h2>
        </div>

        {/* Status Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-start">
            <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusColor(dispute.status)}`}>
              {dispute.status}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Clock size={12} />
              Reported: {new Date(dispute.created_at).toLocaleDateString()}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{dispute.dispute_type}</h1>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Building size={16} />
            Employer: <span className="font-bold text-slate-700">{dispute.employer}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Incident Date</p>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Calendar size={14} className="text-slate-400" />
              {new Date(dispute.incident_date).toLocaleDateString()}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Urgency</p>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <AlertTriangle size={14} className="text-orange-500" />
              {dispute.urgency} Priority
            </div>
          </div>
        </div>

        {/* Workplace Location */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Workplace Location</p>
          <div className="flex items-center gap-3 text-slate-700 font-medium">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
              <MapPin size={18} />
            </div>
            <span className="text-sm">{dispute.workplace_location}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <FileText size={18} className="text-red-700" />
            <h3 className="text-sm uppercase tracking-widest">Description</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
            {dispute.description}
          </p>
        </div>

        {/* Evidence */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Upload size={18} className="text-blue-600" />
            <h3 className="text-sm uppercase tracking-widest">Evidence</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-slate-400 gap-2">
                <FileText size={24} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Evidence_{i}.pdf</span>
              </div>
            ))}
          </div>
        </div>

        {/* Union Response */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-xl shadow-slate-900/20">
          <div className="flex items-center gap-2 font-bold">
            <MessageSquare size={18} className="text-red-500" />
            <h3 className="text-sm uppercase tracking-widest">Union Response</h3>
          </div>
          {dispute.union_response ? (
            <p className="text-slate-300 text-sm leading-relaxed">
              {dispute.union_response}
            </p>
          ) : (
            <div className="flex items-center gap-3 text-slate-400 italic text-sm">
              <Clock size={16} />
              Awaiting response from union representative...
            </div>
          )}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">NUMSA Legal Team</span>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center gap-1">
              Message Union
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        <div className="pb-10">
          <button 
            onClick={() => navigate('/my-disputes')}
            className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-sm shadow-sm"
          >
            Back to All Issues
          </button>
        </div>
      </div>
    </Layout>
  );
}
