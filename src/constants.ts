import { Union } from './types';

export const MOCK_UNIONS: Union[] = [
  {
    id: 'num',
    name: 'National Union of Mineworkers (NUM)',
    industry: 'Mining',
    description: 'Represents workers in the mining, energy, and construction sectors.',
    full_description: 'The National Union of Mineworkers is one of the largest labour unions in South Africa. It has historically played a major role in advocating for mine worker safety, fair wages, and improved working conditions in the mining industry.',
    monthly_fee: 120,
    member_count: '300,000+',
    founded_year: 1982,
    benefits: [
      'Wage negotiations with mining companies',
      'Legal assistance for workplace disputes',
      'Health and safety representation',
      'Death and disability benefits',
      'Training and worker education programs'
    ],
    logo_url: 'https://picsum.photos/seed/mining/200/200'
  },
  {
    id: 'numsa',
    name: 'National Union of Metalworkers of South Africa (NUMSA)',
    industry: 'Manufacturing',
    description: 'Represents workers in the metal, engineering, automotive, and manufacturing sectors.',
    full_description: 'NUMSA is one of the largest unions in the industrial sector and focuses on improving wages, working conditions, and benefits for factory and engineering workers.',
    monthly_fee: 100,
    member_count: '350,000+',
    founded_year: 1987,
    benefits: [
      'Collective wage bargaining',
      'Legal protection in labour disputes',
      'Workplace safety monitoring',
      'Skills development programs',
      'Strike support and worker representation'
    ],
    logo_url: 'https://picsum.photos/seed/metal/200/200'
  },
  {
    id: 'sadtu',
    name: 'South African Democratic Teachers Union (SADTU)',
    industry: 'Education',
    description: 'Represents teachers and education staff in public schools.',
    full_description: 'SADTU works to protect the rights of teachers, improve education systems, and negotiate fair wages and working conditions for educators.',
    monthly_fee: 90,
    member_count: '250,000+',
    founded_year: 1990,
    benefits: [
      'Salary negotiations with government',
      'Legal assistance for workplace disputes',
      'Professional development workshops',
      'Teacher advocacy and representation',
      'Support during disciplinary hearings'
    ],
    logo_url: 'https://picsum.photos/seed/education/200/200'
  },
  {
    id: 'samwu',
    name: 'South African Municipal Workers Union (SAMWU)',
    industry: 'Government',
    description: 'Represents municipal workers across South Africa including sanitation and utilities.',
    full_description: 'SAMWU advocates for better wages, benefits, and job security for municipal workers who provide essential services.',
    monthly_fee: 85,
    member_count: '160,000+',
    founded_year: 1987,
    benefits: [
      'Labour dispute representation',
      'Negotiation with municipalities',
      'Worker benefits programs',
      'Legal support and disciplinary representation'
    ],
    logo_url: 'https://picsum.photos/seed/city/200/200'
  },
  {
    id: 'satawu',
    name: 'South African Transport and Allied Workers Union (SATAWU)',
    industry: 'Transport',
    description: 'Represents workers in the transport industry including taxi and truck drivers.',
    full_description: 'SATAWU focuses on protecting workers in transport sectors, ensuring fair pay and safe working conditions.',
    monthly_fee: 95,
    member_count: '150,000+',
    founded_year: 2000,
    benefits: [
      'Wage negotiations with transport companies',
      'Legal protection for transport workers',
      'Workplace safety advocacy',
      'Industry representation'
    ],
    logo_url: 'https://picsum.photos/seed/transport/200/200'
  },
  {
    id: 'cwu',
    name: 'Communication Workers Union (CWU)',
    industry: 'Telecommunications',
    description: 'Represents workers in telecommunications, broadcasting, and postal services.',
    full_description: 'CWU advocates for fair employment practices and job protection for workers in the communications sector.',
    monthly_fee: 80,
    member_count: '40,000+',
    founded_year: 1996,
    benefits: [
      'Workplace representation',
      'Legal support for disputes',
      'Wage negotiations',
      'Worker training initiatives'
    ],
    logo_url: 'https://picsum.photos/seed/telecom/200/200'
  }
];

export const MOCK_DISPUTES: any[] = [
  {
    id: 'd1',
    dispute_type: 'Unpaid Wages',
    employer: 'ABC Mining',
    status: 'Under Review',
    incident_date: '2026-03-05',
    created_at: '2026-03-10',
    workplace_location: 'Shaft 4, Johannesburg',
    description: 'My employer has not paid overtime wages for the past 3 months even though we are working extra hours.',
    urgency: 'High',
    union_response: 'Union has contacted employer. We are awaiting a response regarding the payroll records.'
  },
  {
    id: 'd2',
    dispute_type: 'Unsafe Working Conditions',
    employer: 'XYZ Factory',
    status: 'Submitted',
    incident_date: '2026-03-05',
    created_at: '2026-03-05',
    workplace_location: 'Production Line B, Cape Town',
    description: 'The ventilation system has been broken for 2 weeks. Several workers are reporting breathing difficulties due to dust.',
    urgency: 'Emergency'
  }
];
