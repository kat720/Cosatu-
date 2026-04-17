import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Union } from '../types';
import { MOCK_UNIONS } from '../constants';
import Layout from '../components/Layout';
import { Loader2, AlertCircle, CheckCircle2, Calendar, Users } from 'lucide-react';

export default function UnionDetail() {
  const { id } = useParams<{ id: string }>();
  const [union, setUnion] = useState<Union | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUnion() {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('unions')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          const mock = MOCK_UNIONS.find(u => u.id === id);
          if (mock) {
            setUnion(mock);
          } else {
            throw error;
          }
        } else {
          setUnion(data);
        }
      } catch (err: any) {
        console.error('Error fetching union:', err);
        const mock = MOCK_UNIONS.find(u => u.id === id);
        if (mock) {
          setUnion(mock);
        } else {
          setError('Failed to load union details.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUnion();
  }, [id]);

  if (loading) {
    return (
      <Layout hideNav>
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="text-sm font-medium">Loading details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !union) {
    return (
      <Layout hideNav>
        <div className="p-4">
          <div className="bg-red-50 border border-red-100 rounded-3xl p-6 text-center">
            <AlertCircle className="mx-auto text-red-500 mb-2" size={32} />
            <p className="text-red-800 font-medium">{error || 'Union not found'}</p>
            <Link to="/" className="mt-4 inline-block px-6 py-2 bg-red-700 text-white rounded-xl font-bold">
              Back to Home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="relative">
        {/* Header */}
        <div className="bg-white p-6 border-b border-slate-100 text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-slate-50 rounded-3xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
            {union.logo_url ? (
              <img 
                src={union.logo_url} 
                alt={union.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-red-700 font-bold text-4xl">{union.name.charAt(0)}</span>
            )}
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">{union.name}</h2>
            <p className="text-sm font-bold text-red-700 uppercase tracking-widest">{union.industry}</p>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <Users size={16} className="text-slate-400" />
                <span>{union.member_count || '250,000+'}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Members</span>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-900 font-bold">
                <Calendar size={16} className="text-slate-400" />
                <span>{union.founded_year || '1987'}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founded</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-8 pb-24">
          {/* About Section */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">About the Union</h3>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm leading-relaxed text-slate-600 text-sm">
              {union.full_description || union.description}
            </div>
          </section>

          {/* Offers Section */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">What the Union Offers</h3>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <ul className="space-y-4">
                {(union.benefits || [
                  'Legal assistance',
                  'Wage negotiations',
                  'Workplace representation',
                  'Worker training programs'
                ]).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="text-emerald-500" size={14} />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Fee Section */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Membership Fee</h3>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <p className="text-2xl font-bold text-emerald-600">
                R{union.membership_fee || union.monthly_fee} <span className="text-sm text-slate-400 font-medium">per month</span>
              </p>
            </div>
          </section>
        </div>

        {/* Sticky Apply Button */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 z-50">
          <Link 
            to={`/apply/${union.id}`}
            className="w-full py-4 bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-700/20 hover:bg-red-800 transition-all flex items-center justify-center gap-2"
          >
            Apply for Membership
          </Link>
        </div>
      </div>
    </Layout>
  );
}
