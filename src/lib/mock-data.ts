export type Market = "Dubai" | "Istanbul";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Meeting" | "Offer Sent" | "Reservation" | "Closed" | "Lost";
export type LeadSource = "Meta Ads" | "Google Ads" | "WhatsApp" | "Referral" | "Walk-in" | "Website";
export type Role = "GM" | "Manager" | "Agent";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  nationality: string;
  language: string;
  market: Market;
  source: LeadSource;
  status: LeadStatus;
  budget: string;
  budgetNum: number;
  propertyType: string;
  location: string;
  purpose: "Investment" | "End-use";
  score: number;
  agent: string;
  createdAt: string;
  lastContact: string;
  notes: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  type: "call" | "whatsapp" | "note" | "status" | "email" | "meeting";
  content: string;
  date: string;
  author: string;
}

export interface Deal {
  id: string;
  leadId: string;
  leadName: string;
  property: string;
  developer: string;
  market: Market;
  agent: string;
  salePrice: number;
  currency: string;
  devCommPct: number;
  grossComm: number;
  agentCommPct: number;
  agentNet: number;
  tax: number;
  marketingCost: number;
  agentPayout: number;
  companyNet: number;
  paymentMethod: "Bank" | "Cash";
  paymentStatus: "Pending" | "Partially Paid" | "Paid";
  closedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  initials: string;
  role: Role;
  market: Market;
  target: number;
  achieved: number;
  leads: number;
  meetings: number;
  closed: number;
  commissionEarned: number;
}

export const currentUser = {
  name: "Hassan L.",
  initials: "HL",
  role: "GM" as Role,
  market: "Dubai" as Market,
};

export const agents: Agent[] = [
  { id: "a1", name: "Sara Kovač", initials: "SK", role: "Agent", market: "Dubai", target: 150000, achieved: 128000, leads: 48, meetings: 22, closed: 7, commissionEarned: 128000 },
  { id: "a2", name: "Omar Al-Rashid", initials: "OR", role: "Agent", market: "Dubai", target: 120000, achieved: 94000, leads: 37, meetings: 18, closed: 5, commissionEarned: 94000 },
  { id: "a3", name: "Elena Morozova", initials: "EM", role: "Agent", market: "Istanbul", target: 80000, achieved: 71000, leads: 29, meetings: 14, closed: 4, commissionEarned: 71000 },
  { id: "a4", name: "Karim Benali", initials: "KB", role: "Manager", market: "Dubai", target: 200000, achieved: 186000, leads: 61, meetings: 31, closed: 11, commissionEarned: 186000 },
  { id: "a5", name: "Yuki Tanaka", initials: "YT", role: "Agent", market: "Istanbul", target: 60000, achieved: 38000, leads: 21, meetings: 9, closed: 2, commissionEarned: 38000 },
];

export const leads: Lead[] = [
  {
    id: "l1", name: "Alexander Petrov", phone: "+7 916 234 5678", email: "a.petrov@gmail.com",
    nationality: "Russian", language: "Russian", market: "Dubai", source: "Meta Ads",
    status: "Qualified", budget: "$750K–$1M", budgetNum: 875000,
    propertyType: "2BR Apartment", location: "Dubai Marina", purpose: "Investment",
    score: 94, agent: "Sara Kovač", createdAt: "2026-03-15", lastContact: "2026-04-06",
    notes: "Client mentioned he has 750K USD, looking for 2BR in Marina for investment. Coming from Moscow next month for a site visit.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created from Meta Ads", date: "2026-03-15 09:12", author: "System" },
      { id: "t2", type: "call", content: "AI qualification call — 4 min. Budget confirmed $750K, interested in Marina. Booked visit for April 20.", date: "2026-03-15 09:13", author: "AI Agent" },
      { id: "t3", type: "whatsapp", content: "Sent property brochure for Emaar Beachfront 2BR", date: "2026-03-18 14:30", author: "Sara Kovač" },
      { id: "t4", type: "note", content: "Client very interested in ROI. Wants to see 6–8% net yield. Flexible on unit size.", date: "2026-03-22 11:00", author: "Sara Kovač" },
      { id: "t5", type: "status", content: "Status changed: Contacted → Qualified", date: "2026-03-22 11:01", author: "Sara Kovač" },
      { id: "t6", type: "whatsapp", content: "Confirmed April 20 visit. Sent hotel recommendation near the properties.", date: "2026-04-06 10:15", author: "Sara Kovač" },
    ]
  },
  {
    id: "l2", name: "Fatima Al-Hassan", phone: "+971 50 123 4567", email: "fatima.h@outlook.com",
    nationality: "Emirati", language: "Arabic", market: "Dubai", source: "Referral",
    status: "Meeting", budget: "$1.5M–$2M", budgetNum: 1750000,
    propertyType: "3BR Villa", location: "Palm Jumeirah", purpose: "End-use",
    score: 88, agent: "Omar Al-Rashid", createdAt: "2026-03-20", lastContact: "2026-04-05",
    notes: "Referred by Sheikh Mansoor family. Looking for a primary residence on Palm. Husband is a business owner.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created — Referral from Sheikh Mansoor", date: "2026-03-20 11:00", author: "Omar Al-Rashid" },
      { id: "t2", type: "call", content: "20-min intro call. Very specific requirements: sea view, 3BR+maid, private pool.", date: "2026-03-21 15:00", author: "Omar Al-Rashid" },
      { id: "t3", type: "whatsapp", content: "Shared 3 Palm Jumeirah villa options with floor plans", date: "2026-03-24 09:30", author: "Omar Al-Rashid" },
      { id: "t4", type: "status", content: "Status changed: Contacted → Meeting", date: "2026-04-05 10:00", author: "Omar Al-Rashid" },
    ]
  },
  {
    id: "l3", name: "Wang Fang", phone: "+86 138 0013 8000", email: "wangfang@163.com",
    nationality: "Chinese", language: "Chinese", market: "Dubai", source: "Google Ads",
    status: "Offer Sent", budget: "$500K–$700K", budgetNum: 600000,
    propertyType: "1BR Apartment", location: "JVC", purpose: "Investment",
    score: 79, agent: "Sara Kovač", createdAt: "2026-02-28", lastContact: "2026-04-04",
    notes: "Investor from Shenzhen. Has 3 properties already. Looking for off-plan with payment plan.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created from Google Ads", date: "2026-02-28 08:00", author: "System" },
      { id: "t2", type: "call", content: "AI call — 3 min. Prefers WeChat communication.", date: "2026-02-28 08:01", author: "AI Agent" },
      { id: "t3", type: "note", content: "Switched to WeChat. Sent Damac Hills 2 options.", date: "2026-03-10 12:00", author: "Sara Kovač" },
      { id: "t4", type: "status", content: "Status changed: Qualified → Offer Sent", date: "2026-04-04 16:00", author: "Sara Kovač" },
    ]
  },
  {
    id: "l4", name: "Ahmed Yilmaz", phone: "+90 532 111 2233", email: "ahmed.y@hotmail.com",
    nationality: "Turkish", language: "Turkish", market: "Istanbul", source: "WhatsApp",
    status: "Reservation", budget: "$200K–$400K", budgetNum: 300000,
    propertyType: "2BR Apartment", location: "Beylikdüzü", purpose: "Investment",
    score: 91, agent: "Elena Morozova", createdAt: "2026-03-01", lastContact: "2026-04-07",
    notes: "Turkish citizenship investor. Targeting $400K minimum for citizenship. Very motivated.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created via WhatsApp inquiry", date: "2026-03-01 10:00", author: "System" },
      { id: "t2", type: "whatsapp", content: "AI chatbot replied instantly, qualified in 5 messages.", date: "2026-03-01 10:02", author: "AI Agent" },
      { id: "t3", type: "meeting", content: "Office visit — 2hr. Shown 4 projects.", date: "2026-03-15 14:00", author: "Elena Morozova" } as TimelineEvent,
      { id: "t4", type: "status", content: "Status changed: Meeting → Reservation", date: "2026-04-07 11:00", author: "Elena Morozova" },
    ]
  },
  {
    id: "l5", name: "Dmitri Volkov", phone: "+7 903 777 8899", email: "d.volkov@yandex.ru",
    nationality: "Russian", language: "Russian", market: "Dubai", source: "Meta Ads",
    status: "New", budget: "$300K–$500K", budgetNum: 400000,
    propertyType: "Studio / 1BR", location: "Business Bay", purpose: "Investment",
    score: 62, agent: "Omar Al-Rashid", createdAt: "2026-04-08", lastContact: "2026-04-08",
    notes: "Fresh lead from Facebook ad. AI called — no answer. WhatsApp sent.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created from Meta Ads", date: "2026-04-08 07:45", author: "System" },
      { id: "t2", type: "call", content: "AI qualification call — no answer. Left voicemail.", date: "2026-04-08 07:46", author: "AI Agent" },
      { id: "t3", type: "whatsapp", content: "AI sent welcome message in Russian with 2 Business Bay options.", date: "2026-04-08 07:47", author: "AI Agent" },
    ]
  },
  {
    id: "l6", name: "Sophia Laurent", phone: "+33 6 12 34 56 78", email: "s.laurent@gmail.com",
    nationality: "French", language: "French", market: "Dubai", source: "Website",
    status: "Contacted", budget: "$600K–$900K", budgetNum: 750000,
    propertyType: "2BR Penthouse", location: "Downtown Dubai", purpose: "Investment",
    score: 75, agent: "Sara Kovač", createdAt: "2026-04-01", lastContact: "2026-04-03",
    notes: "Relocated to Dubai 6 months ago. Working in finance. Wants ROI-focused investment.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created from website form", date: "2026-04-01 16:20", author: "System" },
      { id: "t2", type: "email", content: "Welcome email sent with Dubai market overview PDF", date: "2026-04-01 16:21", author: "System" },
      { id: "t3", type: "call", content: "15-min call with Sara. Scheduled follow-up for next week.", date: "2026-04-03 11:00", author: "Sara Kovač" },
    ]
  },
  {
    id: "l7", name: "Mohammed Al-Qassimi", phone: "+971 55 987 6543", email: "mq@business.ae",
    nationality: "Emirati", language: "Arabic", market: "Dubai", source: "Referral",
    status: "Closed", budget: "$2M+", budgetNum: 2500000,
    propertyType: "4BR Villa", location: "Emirates Hills", purpose: "End-use",
    score: 99, agent: "Karim Benali", createdAt: "2026-01-10", lastContact: "2026-03-28",
    notes: "UHNW client. Purchased Emirates Hills Villa for AED 9.2M. Full payment via bank transfer.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created — Referral from Karim network", date: "2026-01-10 10:00", author: "Karim Benali" },
      { id: "t2", type: "status", content: "Status changed: Reservation → Closed (SPA Signed)", date: "2026-03-28 14:00", author: "Karim Benali" },
    ]
  },
  {
    id: "l8", name: "Priya Sharma", phone: "+91 98765 43210", email: "priya.s@techco.in",
    nationality: "Indian", language: "English", market: "Dubai", source: "Google Ads",
    status: "Qualified", budget: "$400K–$600K", budgetNum: 500000,
    propertyType: "1BR Apartment", location: "Dubai Hills", purpose: "Investment",
    score: 81, agent: "Omar Al-Rashid", createdAt: "2026-03-25", lastContact: "2026-04-02",
    notes: "NRI investor. Has property in Bangalore. First Dubai investment. Very research-oriented.",
    timeline: [
      { id: "t1", type: "status", content: "Lead created from Google Ads", date: "2026-03-25 13:00", author: "System" },
      { id: "t2", type: "call", content: "AI qualification call — 6 min. Answered all questions. Very engaged.", date: "2026-03-25 13:01", author: "AI Agent" },
      { id: "t3", type: "whatsapp", content: "Sent Dubai Hills Estate overview and ROI analysis", date: "2026-03-28 10:00", author: "Omar Al-Rashid" },
    ]
  },
];

export const deals: Deal[] = [
  {
    id: "d1", leadId: "l7", leadName: "Mohammed Al-Qassimi", property: "Emirates Hills Villa 4BR",
    developer: "Emaar", market: "Dubai", agent: "Karim Benali",
    salePrice: 2505000, currency: "USD", devCommPct: 4, grossComm: 100200,
    agentCommPct: 50, agentNet: 50100, tax: 5010, marketingCost: 2000,
    agentPayout: 43090, companyNet: 50100, paymentMethod: "Bank", paymentStatus: "Paid",
    closedAt: "2026-03-28"
  },
  {
    id: "d2", leadId: "l4", leadName: "Ahmed Yilmaz", property: "Beylikdüzü 2BR Unit 14A",
    developer: "Torunlar GYO", market: "Istanbul", agent: "Elena Morozova",
    salePrice: 380000, currency: "USD", devCommPct: 3, grossComm: 11400,
    agentCommPct: 45, agentNet: 5130, tax: 513, marketingCost: 800,
    agentPayout: 3817, companyNet: 5700, paymentMethod: "Bank", paymentStatus: "Pending",
    closedAt: "2026-04-07"
  },
  {
    id: "d3", leadId: "l1", leadName: "Alexander Petrov", property: "Marina Gate 2BR Floor 22",
    developer: "Select Group", market: "Dubai", agent: "Sara Kovač",
    salePrice: 820000, currency: "USD", devCommPct: 4, grossComm: 32800,
    agentCommPct: 50, agentNet: 16400, tax: 1640, marketingCost: 1200,
    agentPayout: 13560, companyNet: 15800, paymentMethod: "Bank", paymentStatus: "Partially Paid",
    closedAt: "2026-03-10"
  },
];

export const kpis = {
  dubai: {
    newLeads: 142,
    newLeadsChange: 18,
    pipelineValue: 3200000,
    pipelineChange: 24,
    commissionMTD: 128000,
    commissionChange: 9,
    avgAiScore: 87,
    aiScoreChange: 4,
  },
  istanbul: {
    newLeads: 51,
    newLeadsChange: 12,
    pipelineValue: 980000,
    pipelineChange: 15,
    commissionMTD: 38000,
    commissionChange: 7,
    avgAiScore: 81,
    aiScoreChange: 2,
  },
};

export const pipelineStages: LeadStatus[] = [
  "New", "Contacted", "Qualified", "Meeting", "Offer Sent", "Reservation", "Closed"
];

export const sourceColors: Record<LeadSource, string> = {
  "Meta Ads": "bg-blue-100 text-blue-800",
  "Google Ads": "bg-green-100 text-green-800",
  "WhatsApp": "bg-emerald-100 text-emerald-800",
  "Referral": "bg-purple-100 text-purple-800",
  "Walk-in": "bg-orange-100 text-orange-800",
  "Website": "bg-cyan-100 text-cyan-800",
};

export const statusColors: Record<LeadStatus, string> = {
  "New": "bg-gray-100 text-gray-700",
  "Contacted": "bg-blue-100 text-blue-700",
  "Qualified": "bg-yellow-100 text-yellow-800",
  "Meeting": "bg-orange-100 text-orange-800",
  "Offer Sent": "bg-purple-100 text-purple-800",
  "Reservation": "bg-indigo-100 text-indigo-800",
  "Closed": "bg-green-100 text-green-800",
  "Lost": "bg-red-100 text-red-700",
};

export function formatCurrency(amount: number, currency = "USD"): string {
  if (currency === "USD") {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  }
  return `${amount.toLocaleString()} ${currency}`;
}

export function getScoreColor(score: number): string {
  if (score >= 85) return "text-green-600";
  if (score >= 65) return "text-yellow-600";
  return "text-red-500";
}

export function getScoreBg(score: number): string {
  if (score >= 85) return "bg-green-500";
  if (score >= 65) return "bg-yellow-500";
  return "bg-red-400";
}
