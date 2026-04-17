export interface Union {
  id: string;
  name: string;
  industry: string;
  description: string;
  monthly_fee: number;
  membership_fee?: number;
  logo_url?: string;
  full_description?: string;
  benefits?: string[];
  member_count?: string;
  founded_year?: number;
}

export interface Dispute {
  id: string;
  member_id?: string;
  union_id?: string;
  employer: string;
  dispute_type: string;
  incident_date: string;
  workplace_location: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Submitted' | 'Under Review' | 'Union Contacted Employer' | 'Resolved' | 'Closed';
  created_at: string;
  evidence_urls?: string[];
  union_response?: string;
}

export interface MemberApplication {
  id?: string;
  full_name: string;
  id_number: string;
  phone_number: string;
  email: string;
  residential_address: string;
  employer: string;
  job_title: string;
  union_id: string;
  id_front_url?: string;
  id_back_url?: string;
  cv_url?: string;
  bank_name?: string;
  account_number?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}
