import type {
  Action as DbAction,
  AlertItem as DbAlertItem,
  ContentItem as DbContentItem,
  IntentAccount as DbIntentAccount,
  Invoice as DbInvoice,
  CashWeek as DbCashWeek,
  Opportunity as DbOpportunity,
  Project as DbProject,
  DepartmentExecution as DbDepartmentExecution,
  Meeting as DbMeeting,
  StrategicPriority as DbStrategicPriority,
  KpiDefinition as DbKpiDefinition,
  RoleAccess as DbRoleAccess,
  IntegrationSource as DbIntegrationSource,
  AuditLogEntry as DbAuditLogEntry,
  Experiment as DbExperiment,
  TeamCapacity as DbTeamCapacity,
  PersonCapacity as DbPersonCapacity,
  DashboardStat as DbDashboardStat,
  WeeklyPriority as DbWeeklyPriority,
  SocialMediaStat as DbSocialMediaStat,
} from "@/generated/prisma/client";
import type {
  ActionItem,
  AlertItem,
  ContentItem,
  SocialMediaStat,
  BuyingGroupMember,
  ActivityEvent,
  Opportunity,
  Invoice,
  CashWeek,
  Project,
  ProjectHealthBar,
  ProjectRisk,
  ClientOutcome,
  DepartmentExecution,
  Meeting,
  StrategicPriority,
  KpiDefinition,
  RoleAccess,
  IntegrationSource,
  AuditLogEntry,
  Experiment,
  TeamCapacity,
  PersonCapacity,
  Kpi,
  WeeklyPriority,
  ActionStatus,
  PipelineStage,
  ProjectStatus,
} from "@/lib/types";

function unspace(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function mapActionStatus(status: DbAction["status"]): ActionStatus {
  return unspace(status) as ActionStatus;
}

export function mapPipelineStage(stage: DbOpportunity["stage"]): PipelineStage {
  return unspace(stage) as PipelineStage;
}

export function mapProjectStatus(status: DbProject["status"]): ProjectStatus {
  return unspace(status) as ProjectStatus;
}

export function mapStat(stat: DbDashboardStat): Kpi {
  return {
    id: stat.key,
    label: stat.label,
    value: stat.value,
    sublabel: stat.sublabel ?? undefined,
    level: stat.level ?? undefined,
    trend: (stat.trend as Kpi["trend"]) ?? undefined,
  };
}

export function mapAction(a: DbAction): ActionItem {
  return {
    id: a.id,
    title: a.title,
    owner: a.owner,
    dueLabel: a.dueLabel,
    priority: a.priority,
    status: mapActionStatus(a.status),
    source: a.source,
    expectedOutcome: a.expectedOutcome,
    linkedKpi: a.linkedKpi ?? undefined,
    blocked: a.blocked,
    blockedReason: a.blockedReason ?? undefined,
    completionEvidence: a.completionEvidence ?? undefined,
  };
}

export function mapWeeklyPriority(p: DbWeeklyPriority): WeeklyPriority {
  return { id: p.id, title: p.title, description: p.description, connectedActions: p.connectedActions };
}

export function mapAlert(a: DbAlertItem): AlertItem {
  return { id: a.id, level: a.level, title: a.title, detail: a.detail, owner: a.owner, action: a.action };
}

export function mapContentItem(c: DbContentItem): ContentItem {
  return {
    id: c.id,
    title: c.title,
    theme: c.theme,
    icpReach: c.icpReach,
    engaged: c.engaged,
    intent: c.intent,
    meetings: c.meetings,
    pipeline: c.pipeline,
  };
}

export function mapIntentAccount(a: DbIntentAccount) {
  return { id: a.id, name: a.name, score: a.score, signal: a.signal };
}

export function mapSocialMediaStat(s: DbSocialMediaStat): SocialMediaStat {
  return {
    id: s.id,
    platform: s.platform,
    periodLabel: s.periodLabel,
    followers: s.followers ?? undefined,
    impressions: s.impressions ?? undefined,
    likes: s.likes ?? undefined,
    views: s.views ?? undefined,
    listGrowth: s.listGrowth ?? undefined,
    source: s.source,
  };
}

export function mapOpportunity(o: DbOpportunity): Opportunity {
  return {
    id: o.id,
    name: o.name,
    account: o.account,
    value: o.value,
    stage: mapPipelineStage(o.stage),
    owner: o.owner,
    closeDate: o.closeDate,
    probability: o.probability,
    buyingGroup: o.buyingGroup as unknown as BuyingGroupMember[],
    activity: o.activity as unknown as ActivityEvent[],
    aiInsight: o.aiInsight,
  };
}

export function mapInvoice(i: DbInvoice): Invoice {
  return {
    id: i.id,
    number: i.number,
    client: i.client,
    value: i.value,
    issued: i.issued,
    due: i.due,
    overdueDays: i.overdueDays,
    status: i.status,
    owner: i.owner,
    collectionActions: i.collectionActions as unknown as { label: string; done: boolean }[],
    source: i.source as unknown as string[],
    aiNote: i.aiNote,
  };
}

export function mapCashWeek(c: DbCashWeek): CashWeek {
  return { week: c.week, balance: c.balance, level: c.level };
}

export function mapProject(p: DbProject): Project {
  return {
    id: p.id,
    name: p.name,
    client: p.client,
    status: mapProjectStatus(p.status),
    pm: p.pm,
    progress: p.progress,
    margin: p.margin,
    nextMilestone: p.nextMilestone,
    currentStepIndex: p.currentStepIndex,
    health: p.health as unknown as ProjectHealthBar[],
    aiRiskNote: p.aiRiskNote,
    risks: p.risks as unknown as ProjectRisk[],
    outcome: (p.outcome as unknown as ClientOutcome | null) ?? undefined,
  };
}

export function mapDepartmentExecution(d: DbDepartmentExecution): DepartmentExecution {
  return { owner: d.owner, assigned: d.assigned, done: d.done, late: d.late, score: d.score };
}

export function mapMeeting(m: DbMeeting): Meeting {
  return {
    id: m.id,
    title: m.title,
    when: m.when,
    owner: m.owner,
    actionsCount: m.actionsCount,
    status: m.status,
    agenda: m.agenda as unknown as string[],
    decisions: m.decisions as unknown as string[],
    aiDetected: m.aiDetected as unknown as Meeting["aiDetected"],
  };
}

export function mapStrategicPriority(s: DbStrategicPriority): StrategicPriority {
  return { id: s.id, title: s.title, owner: s.owner, progress: s.progress, note: s.note };
}

export function mapKpiDefinition(k: DbKpiDefinition): KpiDefinition {
  return {
    id: k.id,
    domain: k.domain,
    name: k.name,
    formula: k.formula,
    owner: k.owner,
    source: k.source,
    cadence: k.cadence,
    target: k.target,
    threshold: k.threshold,
    priority: k.priority,
    type: k.type,
    status: k.status,
    effectiveDate: k.effectiveDate,
  };
}

export function mapRoleAccess(r: DbRoleAccess): RoleAccess {
  return {
    role: r.role,
    performance: r.performance as RoleAccess["performance"],
    finance: r.finance as RoleAccess["finance"],
    people: r.people as RoleAccess["people"],
    admin: r.admin as RoleAccess["admin"],
    defaultView: r.defaultView,
  };
}

export function mapIntegrationSource(i: DbIntegrationSource): IntegrationSource {
  return { name: i.name, method: i.method, status: i.status, lastSync: i.lastSync };
}

export function mapAuditLogEntry(a: DbAuditLogEntry): AuditLogEntry {
  return {
    id: a.id,
    timestamp: a.timestamp.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    user: a.user,
    object: a.object,
    original: a.original,
    updated: a.updated,
    reason: a.reason,
  };
}

export function mapExperiment(e: DbExperiment): Experiment {
  return {
    id: e.id,
    title: e.title,
    hypothesis: e.hypothesis,
    status: e.status,
    decision: e.decision,
    evidence: e.evidence,
    successCriteria: e.successCriteria,
  };
}

export function mapTeamCapacity(t: DbTeamCapacity): TeamCapacity {
  return { team: t.team, capacity: t.capacity, execution: t.execution, risk: t.risk, action: t.action };
}

export function mapPersonCapacity(p: DbPersonCapacity): PersonCapacity {
  return {
    id: p.id,
    name: p.name,
    role: p.role,
    capacity: p.capacity,
    currentLoad: p.currentLoad,
    status: p.status,
    execution: p.execution,
    developmentGoals: p.developmentGoals,
    priorities: p.priorities as unknown as string[],
    managerNote: p.managerNote,
  };
}
