export function ExecutionScoreCard({
  score,
  dueToday,
  overdue,
  blocked,
}: {
  score: number;
  dueToday: number;
  overdue: number;
  blocked: number;
}) {
  return (
    <div className="rounded-lg bg-brand-ink p-4 text-white">
      <p className="text-xs text-white/60">Execution Score</p>
      <p className="mt-1 text-3xl font-bold text-brand-green">{score}%</p>
      <p className="mt-2 text-xs text-white/70">
        {dueToday} due today, {overdue} overdue, {blocked} blocked
      </p>
    </div>
  );
}
