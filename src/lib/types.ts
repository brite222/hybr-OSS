export type AlertLevel = "red" | "amber" | "green" | "info";

export type MetricType = "leading" | "pipeline" | "outcome" | "execution" | "risk" | "financial";

export type Kpi = {
  id: string;
  label: string;
  value: string;
  sublabel?: string;
  level?: AlertLevel;
  trend?: "up" | "down" | "flat";
};

export type AlertItem = {
  id: string;
  level: AlertLevel;
  title: string;
  detail: string;
  owner: string;
  action: string;
};

export const ACTION_STATUSES = ["Today", "This Week", "Overdue", "Upcoming", "Completed"] as const;

export type ActionStatus = (typeof ACTION_STATUSES)[number];

export type ActionItem = {
  id: string;
  title: string;
  owner: string;
  dueLabel: string;
  priority: "High" | "Medium" | "Low";
  status: ActionStatus;
  source: string;
  expectedOutcome: string;
  linkedKpi?: string;
  blocked?: boolean;
  blockedReason?: string;
  completionEvidence?: string;
};

export type WeeklyPriority = {
  id: string;
  title: string;
  description: string;
  connectedActions: number;
};

export const PIPELINE_STAGES = [
  "Identified",
  "Engaged",
  "Qualified",
  "Solution Fit",
  "Proposal",
  "Commercial Alignment",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export type BuyingGroupMember = {
  name: string;
  role: string;
};

export type ActivityEvent = {
  label: string;
  done: boolean;
};

export type Opportunity = {
  id: string;
  name: string;
  account: string;
  value: number;
  stage: PipelineStage;
  owner: string;
  closeDate: string;
  probability: number;
  buyingGroup: BuyingGroupMember[];
  activity: ActivityEvent[];
  aiInsight: string;
};

export type ContentItem = {
  id: string;
  title: string;
  theme: string;
  icpReach: number;
  engaged: number;
  intent: number;
  meetings: number;
  pipeline: number;
};

export type InvoiceStatus = "Due" | "Overdue" | "Paid";

export type Invoice = {
  id: string;
  number: string;
  client: string;
  value: number;
  issued: string;
  due: string;
  overdueDays: number;
  status: InvoiceStatus;
  owner: string;
  collectionActions: { label: string; done: boolean }[];
  source: string[];
  aiNote: string;
};

export type CashWeek = {
  week: number;
  balance: number;
  level: AlertLevel;
};

export type ProjectStatus = "Healthy" | "Watch" | "At Risk";

export type ProjectHealthBar = {
  label: "Schedule" | "Scope" | "Quality" | "Budget" | "Team";
  score: number;
  level: AlertLevel;
};

export const PROJECT_TIMELINE_STEPS = [
  "Kickoff",
  "Discovery",
  "Research",
  "Prototype",
  "Validation",
  "Delivery",
  "Outcome",
  "Expansion",
] as const;

export type ProjectRisk = {
  id: string;
  risk: string;
  severity: "High" | "Medium" | "Low";
  owner: string;
  action: string;
  due: string;
};

export type ClientOutcome = {
  reviewChecklist: { label: string; done: boolean }[];
  expansionSignal: string;
  expansionValue: number;
  caseEvidence: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  pm: string;
  progress: number;
  margin: number | null;
  nextMilestone: string;
  currentStepIndex: number;
  health: ProjectHealthBar[];
  aiRiskNote: string;
  risks: ProjectRisk[];
  outcome?: ClientOutcome;
};

export type DepartmentExecution = {
  owner: string;
  assigned: number;
  done: number;
  late: number;
  score: number;
};

export type MeetingStatus = "Ready" | "Draft" | "Published" | "Upcoming";

export type Meeting = {
  id: string;
  title: string;
  when: string;
  owner: string;
  actionsCount: number;
  status: MeetingStatus;
  agenda: string[];
  decisions: string[];
  aiDetected: {
    decisions: number;
    actions: number;
    risks: number;
    overdueFollowUps: number;
  };
};

export type StrategicPriority = {
  id: string;
  title: string;
  owner: string;
  progress: number;
  note: string;
};
