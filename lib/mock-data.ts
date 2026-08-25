export interface Client {
  id: string
  name: string
  entityType: '1040' | '1120-S' | '1065' | '990' | '1120'
  taxYear: string
  status: 'Needs Attention' | 'Active Work' | 'Completed' | 'On Hold'
  attentionNote?: string
  urgentDocCount?: number
  lastActive: string
  assignedStaff: string
  missingDocuments?: { name: string; category: string; daysOverdue: number }[]
  activeWorkflowId?: string
  avatarColor?: string
}

export interface Workflow {
  id: string
  title: string
  scope: 'cross-client' | 'single-client'
  clientCount?: number
  clientId?: string
  clientName?: string
  status: 'In Progress' | 'Review Ready' | 'Drafting' | 'Action Needed'
  progressPercent: number
  currentStep: number
  totalSteps: number
  dueDate: string
  description: string
  steps?: { title: string; completed: boolean }[]
  targetClients?: { id: string; name: string; entityType: string; status: string; detail: string }[]
}

export interface NeedsAttentionItem {
  id: string
  clientId: string
  clientName: string
  entityType: string
  reason: string
  urgency: 'high' | 'medium'
  badgeText: string
  actionText: string
  dueDate: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant' | 'system'
  text: string
  timestamp: string
  actions?: { label: string; type: 'workflow' | 'client' | 'filter' | 'resolve' | 'action'; targetId?: string; actionId?: string }[]
  clientContext?: string
  workflowContext?: string
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'c-krishan',
    name: 'Krishan K',
    entityType: '1040',
    taxYear: 'TY2025',
    status: 'Needs Attention',
    attentionNote: 'Missing 2 tax documents (W-2 & 1099-INT)',
    urgentDocCount: 2,
    lastActive: '10 mins ago',
    assignedStaff: 'Shubham S.',
    activeWorkflowId: 'wf-krishan-1040',
    missingDocuments: [
      { name: 'W-2 (Stripe Inc)', category: 'Income', daysOverdue: 12 },
      { name: '1099-INT (First Republic)', category: 'Interest', daysOverdue: 5 },
    ],
    avatarColor: 'bg-emerald-950 text-emerald-300 border-emerald-700/50',
  },
  {
    id: 'c-acme',
    name: 'Acme Holdings LLC',
    entityType: '1120-S',
    taxYear: 'TY2025',
    status: 'Needs Attention',
    attentionNote: 'Form 7004 extension filing due Sep 15',
    urgentDocCount: 1,
    lastActive: '1 hour ago',
    assignedStaff: 'Shubham S.',
    activeWorkflowId: 'wf-acme-ext',
    missingDocuments: [
      { name: 'Final K-1 from Subsidiary A', category: 'Pass-through', daysOverdue: 8 },
    ],
    avatarColor: 'bg-blue-950 text-blue-300 border-blue-700/50',
  },
  {
    id: 'c-sarah',
    name: 'Sarah Chen',
    entityType: '1040',
    taxYear: 'TY2025',
    status: 'Needs Attention',
    attentionNote: 'Form 8879 signature authorization required',
    urgentDocCount: 0,
    lastActive: '3 hours ago',
    assignedStaff: 'Elena R.',
    activeWorkflowId: 'wf-sarah-review',
    avatarColor: 'bg-purple-950 text-purple-300 border-purple-700/50',
  },
  {
    id: 'c-apex',
    name: 'Apex Logistics Inc',
    entityType: '1065',
    taxYear: 'TY2025',
    status: 'Active Work',
    attentionNote: 'Partnership capital account reconciliation',
    lastActive: 'Yesterday',
    assignedStaff: 'Shubham S.',
    activeWorkflowId: 'wf-q3-estimates',
    avatarColor: 'bg-amber-950 text-amber-300 border-amber-700/50',
  },
  {
    id: 'c-horizon',
    name: 'Horizon Capital Management',
    entityType: '1120-S',
    taxYear: 'TY2025',
    status: 'Active Work',
    attentionNote: 'Q3 Estimated tax calculation draft ready',
    lastActive: '2 days ago',
    assignedStaff: 'Shubham S.',
    activeWorkflowId: 'wf-q3-estimates',
    avatarColor: 'bg-cyan-950 text-cyan-300 border-cyan-700/50',
  },
  {
    id: 'c-greentree',
    name: 'Green Tree Foundation',
    entityType: '990',
    taxYear: 'TY2025',
    status: 'Active Work',
    attentionNote: 'Form 990 Schedule A public support test verified',
    lastActive: '3 days ago',
    assignedStaff: 'Marcus V.',
    avatarColor: 'bg-teal-950 text-teal-300 border-teal-700/50',
  },
  {
    id: 'c-vanguard',
    name: 'Vanguard BioTech Partners',
    entityType: '1065',
    taxYear: 'TY2025',
    status: 'Active Work',
    attentionNote: 'R&D credit study documentation in progress',
    lastActive: '4 days ago',
    assignedStaff: 'Elena R.',
    avatarColor: 'bg-indigo-950 text-indigo-300 border-indigo-700/50',
  },
  {
    id: 'c-solis',
    name: 'Solis Real Estate Group',
    entityType: '1120-S',
    taxYear: 'TY2025',
    status: 'Completed',
    lastActive: '1 week ago',
    assignedStaff: 'Shubham S.',
    avatarColor: 'bg-zinc-800 text-zinc-300 border-zinc-700/50',
  },
]

export const MOCK_NEEDS_ATTENTION: NeedsAttentionItem[] = [
  {
    id: 'na-1',
    clientId: 'c-krishan',
    clientName: 'Krishan K',
    entityType: '1040',
    reason: 'Missing 2 key tax documents (W-2 & 1099-INT)',
    urgency: 'high',
    badgeText: '2 docs missing',
    actionText: 'Send Smart Follow-up',
    dueDate: 'Overdue by 12d',
  },
  {
    id: 'na-2',
    clientId: 'c-acme',
    clientName: 'Acme Holdings LLC',
    entityType: '1120-S',
    reason: 'Form 7004 extension filing due Sep 15',
    urgency: 'high',
    badgeText: 'Extension Sep 15',
    actionText: 'Generate Draft 7004',
    dueDate: 'Due in 21 days',
  },
  {
    id: 'na-3',
    clientId: 'c-sarah',
    clientName: 'Sarah Chen',
    entityType: '1040',
    reason: 'Review required for Form 8879 e-file authorization',
    urgency: 'medium',
    badgeText: 'Review Required',
    actionText: 'Review Return',
    dueDate: 'Pending Sign-off',
  },
]

export const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-q3-estimates',
    title: 'Q3 Estimated Tax Reminders',
    scope: 'cross-client',
    clientCount: 18,
    status: 'In Progress',
    progressPercent: 72,
    currentStep: 3,
    totalSteps: 4,
    dueDate: 'Sep 15, 2026',
    description: 'Automated calculation and reminder dispatch for Q3 1040-ES and 1120-W payments across eligible individual and corporate clients.',
    steps: [
      { title: 'Identify eligible Q3 tax payment clients', completed: true },
      { title: 'Calculate safe-harbor and projected Q3 payments', completed: true },
      { title: 'Draft personalized client emails & payment vouchers', completed: true },
      { title: 'Execute batch send & record client portal reminders', completed: false },
    ],
    targetClients: [
      { id: 'c-krishan', name: 'Krishan K', entityType: '1040', status: 'Pending Voucher', detail: 'Q3 Payment: $4,250' },
      { id: 'c-apex', name: 'Apex Logistics Inc', entityType: '1065', status: 'Ready to Send', detail: 'Partner Q3: $12,800' },
      { id: 'c-horizon', name: 'Horizon Capital', entityType: '1120-S', status: 'Sent', detail: 'Q3 Voucher Delivered' },
      { id: 'c-sarah', name: 'Sarah Chen', entityType: '1040', status: 'Ready to Send', detail: 'Q3 Payment: $6,100' },
    ],
  },
  {
    id: 'wf-w2-followup',
    title: 'Missing W-2 & 1099 Follow-up Batch',
    scope: 'cross-client',
    clientCount: 7,
    status: 'Action Needed',
    progressPercent: 45,
    currentStep: 2,
    totalSteps: 4,
    dueDate: 'Sep 01, 2026',
    description: 'Smart multi-channel follow-up sequence targeting clients with incomplete wage and interest tax statements.',
    steps: [
      { title: 'Scan client intake folders for missing schedules', completed: true },
      { title: 'Group clients by document bottleneck type', completed: true },
      { title: 'Draft targeted upload request links', completed: false },
      { title: 'Notify accounting managers', completed: false },
    ],
    targetClients: [
      { id: 'c-krishan', name: 'Krishan K', entityType: '1040', status: 'Missing W-2', detail: 'Stripe Inc W-2 pending' },
      { id: 'c-acme', name: 'Acme Holdings', entityType: '1120-S', status: 'Missing K-1', detail: 'Subsidiary K-1 pending' },
    ],
  },
  {
    id: 'wf-krishan-1040',
    title: 'Krishan K - 1040 Tax Return Preparation',
    scope: 'single-client',
    clientId: 'c-krishan',
    clientName: 'Krishan K',
    status: 'In Progress',
    progressPercent: 60,
    currentStep: 3,
    totalSteps: 5,
    dueDate: 'Oct 15, 2026',
    description: 'Full Individual Tax Return preparation including Schedule C sole proprietorship expenses and Schedule E rental income.',
    steps: [
      { title: 'Intake document OCR & parsing', completed: true },
      { title: 'Schedule C income reconciliation', completed: true },
      { title: 'Verify missing W-2 & 1099-INT statements', completed: false },
      { title: 'Run Instead Tax Audit & Diagnostic Check', completed: false },
      { title: 'Final CPA Review & Client Sign-off', completed: false },
    ],
  },
  {
    id: 'wf-acme-ext',
    title: 'Acme Holdings - Extension Preparation (Form 7004)',
    scope: 'single-client',
    clientId: 'c-acme',
    clientName: 'Acme Holdings LLC',
    status: 'Review Ready',
    progressPercent: 85,
    currentStep: 4,
    totalSteps: 4,
    dueDate: 'Sep 15, 2026',
    description: 'Corporate 6-month extension calculation and electronic filing authorization for S-Corporation Form 1120-S.',
    steps: [
      { title: 'Calculate tentative tax liability', completed: true },
      { title: 'Verify prior year tax payments & credits', completed: true },
      { title: 'Draft Form 7004 extension package', completed: true },
      { title: 'Transmit to IRS e-file gateway', completed: false },
    ],
  },
]

export const PROMPT_SUGGESTIONS = [
  "Which clients need my attention today?",
  "Send Q3 estimate reminders to everyone who needs one.",
  "What documents are missing for Krishan K?",
  "Draft Form 7004 extension for Acme Holdings.",
  "Summarize active workflows across all 1040 clients.",
]
