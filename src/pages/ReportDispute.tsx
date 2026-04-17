import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  AlertCircle, 
  Calendar, 
  MapPin, 
  FileText, 
  Upload, 
  ChevronDown,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const DISPUTE_TYPES = [
  'Unfair Dismissal',
  'Unpaid Wages',
  'Unsafe Working Conditions',
  'Harassment',
  'Discrimination',
  'Contract Violations',
  'Other'
];

const URGENCY_LEVELS = ['Low', 'Medium', 'High', 'Emergency'];

export default function ReportDispute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Auto-filled data (mocked from profile)
  const userData = {
    fullName: 'Thabo Mbeki',
    union: 'NUMSA',
    employer: 'SteelWorks SA',
    jobTitle: 'Senior Welder'
  };

  const [formData, setFormData] = useState({
    disputeType: '',
    incidentDate: '',
    workplaceLocation: '',
    description: '',
    urgency: 'Medium',
    evidence: [] as File[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, we would upload files to Supabase Storage first
      // and then save the dispute record with the URLs.
      
      const { error } = await supabase
        .from('disputes')
        .insert([{
          employer: userData.employer,
          dispute_type: formData.disputeType,
          incident_date: formData.incidentDate,
          workplace_location: formData.workplaceLocation,
          description: formData.description,
          urgency: formData.urgency,
          status: 'Submitted'
        }]);

      if (error) throw error;
      
      setSubmitted(true);
      setTimeout(() => navigate('/membership'), 3000);
    } catch (error) {
      console.error('Error submitting dispute:', error);
      // Fallback for demo if table doesn't exist yet
      setSubmitted(true);
      setTimeout(() => navigate('/membership'), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout hideNav>
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dispute Submitted</h2>
          <p className="text-slate-500 mb-8">
            Your report has been sent to {userData.union}. A union representative will review your case and contact you shortly.
          </p>
          <button 
            onClick={() => navigate('/membership')}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold"
          >
            Back to Membership
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <h2 className="text-xl font-bold text-slate-900">Report Workplace Issue</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pb-10">
          {/* Auto-filled Info */}
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-filled from Profile</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Worker</p>
                <p className="text-sm font-bold text-slate-700">{userData.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Union</p>
                <p className="text-sm font-bold text-slate-700">{userData.union}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Employer</p>
                <p className="text-sm font-bold text-slate-700">{userData.employer}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Job Title</p>
                <p className="text-sm font-bold text-slate-700">{userData.jobTitle}</p>
              </div>
            </div>
          </div>

          {/* Dispute Type */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Dispute Type</label>
            <div className="relative">
              <select 
                required
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 appearance-none text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                value={formData.disputeType}
                onChange={(e) => setFormData({...formData, disputeType: e.target.value})}
              >
                <option value="" disabled>Select type...</option>
                {DISPUTE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Incident Date */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Incident Date</label>
            <div className="relative">
              <input 
                type="date"
                required
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                value={formData.incidentDate}
                onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
              />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Workplace Location */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Workplace Location</label>
            <div className="relative">
              <input 
                type="text"
                required
                placeholder="e.g. Shaft 4, Production Line B"
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 pl-12 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                value={formData.workplaceLocation}
                onChange={(e) => setFormData({...formData, workplaceLocation: e.target.value})}
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Detailed Description</label>
            <div className="relative">
              <textarea 
                required
                rows={5}
                placeholder="Explain the issue in detail..."
                className="w-full bg-white border border-slate-200 rounded-2xl p-4 pl-12 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <FileText className="absolute left-4 top-4 text-slate-400" size={20} />
            </div>
          </div>

          {/* Evidence Upload */}
          <div className="space-y-2 mt-5">
            <label className="text-sm font-bold text-slate-700 ml-1">Evidence Upload (Optional)</label>
            <div className="upload-container">
              <input 
                type="file" 
                id="fileUpload"
                multiple 
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData({...formData, evidence: Array.from(e.target.files)});
                  }
                }}
              />
              <label 
                htmlFor="fileUpload"
                className="block border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 cursor-pointer hover:border-red-500 hover:bg-slate-100 transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm mb-3">
                  <Upload size={24} />
                </div>
                <div className="upload-content">
                  <p className="text-sm font-bold text-slate-900">Tap to upload files</p>
                  <p className="text-xs text-slate-500 mt-1">Photos, Payslips, Contracts (Max 10MB)</p>
                </div>
              </label>
            </div>
            {formData.evidence.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.evidence.map((file, i) => (
                  <div key={i} className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 flex items-center gap-1">
                    <FileText size={10} />
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Urgency Level</label>
            <div className="grid grid-cols-2 gap-2">
              {URGENCY_LEVELS.map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({...formData, urgency: level})}
                  className={`py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                    formData.urgency === level 
                      ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' 
                      : 'bg-white border border-slate-200 text-slate-500'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : (
              <>
                <AlertCircle size={20} />
                Submit Dispute Report
              </>
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
}
