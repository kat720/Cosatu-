import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Union } from '../types';
import { MOCK_UNIONS } from '../constants';
import Layout from '../components/Layout';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  User, 
  CreditCard, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Briefcase, 
  Upload, 
  FileText, 
  X, 
  Check,
  ShieldCheck
} from 'lucide-react';

export default function Apply() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [union, setUnion] = useState<Union | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    id_number: '',
    phone_number: '',
    email: '',
    residential_address: '',
    employer: '',
    job_title: '',
    bank_name: '',
    account_number: ''
  });

  const [files, setFiles] = useState<{
    id_front: File | null;
    id_back: File | null;
    cv: File | null;
  }>({
    id_front: null,
    id_back: null,
    cv: null
  });

  const [uploadProgress, setUploadProgress] = useState<{
    id_front: 'idle' | 'uploading' | 'success' | 'error';
    id_back: 'idle' | 'uploading' | 'success' | 'error';
    cv: 'idle' | 'uploading' | 'success' | 'error';
  }>({
    id_front: 'idle',
    id_back: 'idle',
    cv: 'idle'
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id_front' | 'id_back' | 'cv') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} is too large. Max size is 10MB.`);
        return;
      }
      setFiles(prev => ({ ...prev, [type]: file }));
      setUploadProgress(prev => ({ ...prev, [type]: 'idle' }));
    }
  };

  const removeFile = (type: 'id_front' | 'id_back' | 'cv') => {
    setFiles(prev => ({ ...prev, [type]: null }));
    setUploadProgress(prev => ({ ...prev, [type]: 'idle' }));
  };

  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const fullPath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('member_documents')
      .upload(fullPath, file);

    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!files.id_front || !files.id_back || !files.cv) {
      setError('Please upload all required documents (ID Front, ID Back, and CV).');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // 1. Upload files
      setUploadProgress(prev => ({ ...prev, id_front: 'uploading' }));
      const idFrontUrl = await uploadFile(files.id_front, 'ids/front');
      setUploadProgress(prev => ({ ...prev, id_front: 'success' }));

      setUploadProgress(prev => ({ ...prev, id_back: 'uploading' }));
      const idBackUrl = await uploadFile(files.id_back, 'ids/back');
      setUploadProgress(prev => ({ ...prev, id_back: 'success' }));

      setUploadProgress(prev => ({ ...prev, cv: 'uploading' }));
      const cvUrl = await uploadFile(files.cv, 'cv');
      setUploadProgress(prev => ({ ...prev, cv: 'success' }));

      // 2. Insert application
      const { error } = await supabase
        .from('membership_applications')
        .insert([
          {
            ...formData,
            union_id: id,
            id_front_url: idFrontUrl,
            id_back_url: idBackUrl,
            cv_url: cvUrl,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application. Please try again.');
      // Reset upload progress on error to allow retry
      setUploadProgress({
        id_front: 'idle',
        id_back: 'idle',
        cv: 'idle'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Loading..." showBack>
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="text-sm font-medium">Preparing application...</p>
        </div>
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout title="Success" showBack>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
          <p className="text-slate-600 mb-8 max-w-xs mx-auto">
            Your application to join <strong>{union?.name}</strong> has been received and is currently being processed.
          </p>
          
          <div className="w-full space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full py-4 bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-700/20 flex items-center justify-center gap-2"
            >
              Back to Home
            </button>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest pt-4">
              A union representative will contact you soon.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const FileUploadBox = ({ 
    id, 
    label, 
    type, 
    accept, 
    file, 
    progress 
  }: { 
    id: string, 
    label: string, 
    type: 'id_front' | 'id_back' | 'cv', 
    accept: string, 
    file: File | null,
    progress: string
  }) => (
    <div className="space-y-2">
      <p className="text-xs font-bold text-slate-700 ml-1">{label}</p>
      {!file ? (
        <label 
          htmlFor={id}
          className="block border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 cursor-pointer hover:border-red-500 hover:bg-slate-100 transition-all"
        >
          <input 
            type="file" 
            id={id}
            className="hidden" 
            accept={accept}
            onChange={(e) => handleFileChange(e, type)}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
              <Upload size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Tap to upload</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Max size: 10MB</p>
            </div>
          </div>
        </label>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              {progress === 'success' ? <Check size={20} /> : <FileText size={20} />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]">{file.name}</p>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                {progress === 'uploading' ? 'Uploading...' : 'File Ready ✓'}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => removeFile(type)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <Layout title="Membership Application" showBack>
      <div className="mb-6">
        <div className="bg-slate-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-700 font-bold shadow-sm">
            {union?.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Joining Union</p>
            <p className="font-bold text-slate-900">{union?.name}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-800 text-sm font-medium">
            <AlertCircle size={20} className="text-red-500 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <User size={18} className="text-red-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Personal Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input 
                required
                type="text" 
                name="full_name"
                placeholder="Full Name" 
                className="w-full pl-4 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input 
                required
                type="text" 
                name="id_number"
                placeholder="ID Number" 
                className="w-full pl-4 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                value={formData.id_number}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input 
                required
                type="tel" 
                name="phone_number"
                placeholder="Phone Number" 
                className="w-full pl-4 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input 
                required
                type="email" 
                name="email"
                placeholder="Email Address" 
                className="w-full pl-4 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <textarea 
                required
                name="residential_address"
                placeholder="Residential Address" 
                rows={2}
                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium resize-none"
                value={formData.residential_address}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Building size={18} className="text-red-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Employment Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              required
              type="text" 
              name="employer"
              placeholder="Employer Name" 
              className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
              value={formData.employer}
              onChange={handleChange}
            />

            <input 
              required
              type="text" 
              name="job_title"
              placeholder="Job Title" 
              className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
              value={formData.job_title}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Identity Verification */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <ShieldCheck size={18} className="text-red-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Identity Verification</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUploadBox 
              id="id_front"
              label="Upload ID (Front)"
              type="id_front"
              accept=".jpg,.jpeg,.png,.pdf"
              file={files.id_front}
              progress={uploadProgress.id_front}
            />
            <FileUploadBox 
              id="id_back"
              label="Upload ID (Back)"
              type="id_back"
              accept=".jpg,.jpeg,.png,.pdf"
              file={files.id_back}
              progress={uploadProgress.id_back}
            />
          </div>
        </div>

        {/* Employment Documents */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <FileText size={18} className="text-red-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Employment Documents</h3>
          </div>
          
          <FileUploadBox 
            id="cv"
            label="Upload CV / Resume"
            type="cv"
            accept=".pdf,.doc,.docx"
            file={files.cv}
            progress={uploadProgress.cv}
          />
        </div>

        {/* Banking Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <CreditCard size={18} className="text-red-700" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Banking Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              required
              type="text" 
              name="bank_name"
              placeholder="Bank Name" 
              className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
              value={formData.bank_name}
              onChange={handleChange}
            />

            <input 
              required
              type="text" 
              name="account_number"
              placeholder="Account Number" 
              className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
              value={formData.account_number}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="pt-4 pb-10">
          <button 
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-700/20 hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight size={20} />
              </>
            )}
          </button>
          <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
            By submitting, you agree to the union's terms and conditions.
          </p>
        </div>
      </form>
    </Layout>
  );
}
