import { CashForecastChart } from "@/components/dashboard/cash-forecast-chart";
import { SectionHeader } from "@/components/dashboard/section-header";
import { cashForecast, cashGapTrigger } from "@/lib/mock-data";

export default function ForecastPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="13-week cash forecast"
        title="Finance view for runway, variance and action"
      />

      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm font-medium">Forecast runway: 4.2 months</p>
        <div className="mt-4">
          <CashForecastChart weeks={cashForecast} />
        </div>
      </div>

      <div className="rounded-lg border border-status-warning/40 bg-status-warning/5 p-4 text-sm">
        <span className="font-medium">Cash gap trigger:</span> {cashGapTrigger}
      </div>
    </div>
  );
}
