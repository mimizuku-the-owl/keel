import { useMemo, useState } from "react";
import { MetricWidget } from "@/components/MetricWidget";
import { Card } from "@/components/Card";
import {
  generateLatencyMetrics,
  generateRequestRate,
  generateErrorRate,
  generateTokenThroughput,
  generateSessionCount,
  generateHeartbeatLatency,
} from "@/lib/mockMetrics";

type TimeRange = "1h" | "6h" | "24h" | "7d";

const TIME_RANGES: { value: TimeRange; label: string; hours: number }[] = [
  { value: "1h", label: "1 Hour", hours: 1 },
  { value: "6h", label: "6 Hours", hours: 6 },
  { value: "24h", label: "24 Hours", hours: 24 },
  { value: "7d", label: "7 Days", hours: 168 },
];

export function MetricsPage() {
  const [range, setRange] = useState<TimeRange>("24h");
  const hours = TIME_RANGES.find((r) => r.value === range)?.hours ?? 24;

  // Generate mock data (memoized per range)
  const latency = useMemo(() => generateLatencyMetrics(hours), [hours]);
  const requestRate = useMemo(() => generateRequestRate(hours), [hours]);
  const errorRate = useMemo(() => generateErrorRate(hours), [hours]);
  const tokenThroughput = useMemo(() => generateTokenThroughput(hours), [hours]);
  const sessionCount = useMemo(() => generateSessionCount(hours), [hours]);
  const heartbeatLatency = useMemo(() => generateHeartbeatLatency(hours), [hours]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Metrics</h2>
          <p className="text-sm text-zinc-500 mt-1">
            CloudWatch-style agent performance monitoring
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                range === r.value
                  ? "bg-keel-500/20 text-keel-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mock data notice */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-2.5 flex items-center gap-2">
        <span className="text-amber-400 text-sm">📊</span>
        <span className="text-xs text-amber-400/80">
          Showing simulated metrics — connect your gateway in Settings for live data
        </span>
      </div>

      {/* Metrics grid — CloudWatch style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Latency (P50/P95/P99) */}
        <MetricWidget
          title="Response Latency"
          subtitle="Agent response time percentiles"
          data={latency.p50}
          color="#14b8a6"
          unit="ms"
          multiLine={[
            { label: "P95", data: latency.p95, color: "#f59e0b" },
            { label: "P99", data: latency.p99, color: "#ef4444" },
          ]}
          alarm={{ value: 2000, label: "P99 > 2s", color: "#ef4444" }}
          height={220}
        />

        {/* Request Rate */}
        <MetricWidget
          title="Request Rate"
          subtitle="Agent invocations per 15-min window"
          data={requestRate}
          color="#8b5cf6"
          unit=" req"
          chartType="area"
          height={220}
        />

        {/* Error Rate */}
        <MetricWidget
          title="Error Rate"
          subtitle="Errors per 15-min window"
          data={errorRate}
          color="#ef4444"
          fillColor="#ef4444"
          unit=" err"
          chartType="area"
          alarm={{ value: 5, label: "Spike > 5", color: "#ef4444" }}
          height={220}
        />

        {/* Token Throughput */}
        <MetricWidget
          title="Token Throughput"
          subtitle="Total tokens processed per 15-min window"
          data={tokenThroughput}
          color="#06b6d4"
          unit=" tok"
          chartType="area"
          alarm={{ value: 40000, label: "Budget Alert", color: "#f59e0b" }}
          height={220}
        />

        {/* Active Sessions */}
        <MetricWidget
          title="Active Sessions"
          subtitle="Concurrent agent sessions"
          data={sessionCount}
          color="#22c55e"
          chartType="line"
          height={220}
        />

        {/* Heartbeat Latency */}
        <MetricWidget
          title="Heartbeat Interval"
          subtitle="Time between heartbeat responses"
          data={heartbeatLatency}
          color="#f97316"
          unit="ms"
          chartType="line"
          alarm={{ value: 2000, label: "Missed > 2s", color: "#ef4444" }}
          height={220}
        />
      </div>

      {/* Alarm summary */}
      <Card title="Alarm Status" subtitle="Configured metric alarms">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              name: "P99 Latency",
              metric: "Response time > 2000ms",
              status: latency.p99[latency.p99.length - 1]?.value > 2000 ? "ALARM" : "OK",
            },
            {
              name: "Error Spike",
              metric: "Errors > 5 per window",
              status: errorRate[errorRate.length - 1]?.value > 5 ? "ALARM" : "OK",
            },
            {
              name: "Token Budget",
              metric: "Tokens > 40K per window",
              status: tokenThroughput[tokenThroughput.length - 1]?.value > 40000 ? "ALARM" : "OK",
            },
            {
              name: "Heartbeat",
              metric: "Interval > 2000ms",
              status: heartbeatLatency[heartbeatLatency.length - 1]?.value > 2000 ? "ALARM" : "OK",
            },
            {
              name: "Agent Offline",
              metric: "No heartbeat > 5min",
              status: "OK",
            },
            {
              name: "Session Loop",
              metric: "Same session > 100 turns",
              status: "OK",
            },
          ].map((alarm) => (
            <div
              key={alarm.name}
              className={`p-3 rounded-lg border ${
                alarm.status === "ALARM"
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-zinc-800 bg-zinc-800/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-200">{alarm.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    alarm.status === "ALARM"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {alarm.status === "ALARM" ? "⚠ ALARM" : "✓ OK"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">{alarm.metric}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
