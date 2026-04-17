import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Union } from '../types';
import { MOCK_UNIONS } from '../constants';
import Layout from '../components/Layout';
import UnionCard from '../components/UnionCard';
import { Search, Loader2, Filter } from 'lucide-react';

export default function Unions() {
  const [unions, setUnions] = useState<Union[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const industries = ['Mining', 'Education', 'Transport', 'Retail', 'Manufacturing', 'Government'];

  useEffect(() => {
    async function fetchUnions() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('unions')
          .select('*');

        if (error) throw error;
        
        if (!data || data.length === 0) {
          setUnions(MOCK_UNIONS);
        } else {
          setUnions(data);
        }
      } catch (err: any) {
        console.error('Error fetching unions:', err);
        setUnions(MOCK_UNIONS);
      } finally {
        setLoading(false);
      }
    }

    fetchUnions();
  }, []);

  const filteredUnions = unions.filter(union => {
    const matchesSearch = union.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         union.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry ? union.industry.includes(selectedIndustry) : true;
    return matchesSearch && matchesIndustry;
  });

  return (
    <Layout>
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">Union Directory</h2>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search unions..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Industry Filter */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold px-1">
            <Filter size={18} className="text-red-700" />
            <h3 className="text-sm uppercase tracking-widest">Filter By Industry</h3>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            <button 
              onClick={() => setSelectedIndustry(null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${!selectedIndustry ? 'bg-red-700 border-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-white border-slate-100 text-slate-500'}`}
            >
              All
            </button>
            {industries.map(industry => (
              <button 
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${selectedIndustry === industry ? 'bg-red-700 border-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-white border-slate-100 text-slate-500'}`}
              >
                {industry}
              </button>
            ))}
          </div>
        </section>

        {/* Union Grid */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p className="text-sm font-medium">Loading directory...</p>
            </div>
          ) : filteredUnions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredUnions.map(union => (
                // @ts-ignore
                <UnionCard key={union.id} union={union} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium">No unions found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
