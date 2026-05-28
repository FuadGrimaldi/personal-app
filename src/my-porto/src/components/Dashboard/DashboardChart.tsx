"use client";

import { useMemo, useState } from "react";

type DashboardRecord = {
  title?: string;
  type?: string;
  fullname?: string;
  name?: string;
  username?: string;
  role?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
};

type DashboardSummaryItem = {
  label: string;
  value: string | number;
  change: string;
  tone: "positive" | "neutral" | "warning" | "info";
};

type DashboardChartProps = {
  title?: string;
  subtitle?: string;
  projects?: DashboardRecord[];
  blogs?: DashboardRecord[];
  comments?: DashboardRecord[];
  users?: DashboardRecord[];
  summary?: DashboardSummaryItem[];
};

type DashboardPeriod = "1w" | "1m" | "6m";

type ActivityEvent = {
  category: "Project" | "Blog" | "Comment" | "User";
  label: string;
  description: string;
  date: Date;
};

const periodOptions: Array<{
  value: DashboardPeriod;
  label: string;
  hint: string;
}> = [
  { value: "1w", label: "1 Week", hint: "Daily" },
  { value: "1m", label: "1 Month", hint: "Weekly" },
  { value: "6m", label: "6 Months", hint: "Monthly" },
];

const summaryToneClass: Record<DashboardSummaryItem["tone"], string> = {
  positive: "from-emerald-500 to-teal-600",
  warning: "from-amber-500 to-orange-600",
  info: "from-sky-500 to-blue-600",
  neutral: "from-slate-500 to-slate-700",
};

const periodLabel: Record<DashboardPeriod, string> = {
  "1w": "Last 7 days",
  "1m": "Last 4 weeks",
  "6m": "Last 6 months",
};

function toDate(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  next.setHours(0, 0, 0, 0);
  return next;
}

function startOfMonth(date: Date) {
  const next = new Date(date);
  next.setDate(1);
  next.setHours(0, 0, 0, 0);
  return next;
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatTimeLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getBestDate(record: DashboardRecord) {
  return toDate(record.createdAt ?? record.updatedAt);
}

function buildActivityEvents(
  records: DashboardRecord[],
  category: ActivityEvent["category"],
) {
  return records
    .map((record) => {
      const date = getBestDate(record);
      if (!date) return null;

      const label =
        record.title ??
        record.fullname ??
        record.name ??
        record.username ??
        record.role ??
        category;

      const description =
        record.message ??
        record.type ??
        `${category.toLowerCase()} activity updated.`;

      return {
        category,
        label,
        description,
        date,
      };
    })
    .filter((event): event is ActivityEvent => event !== null);
}

function buildSummaryFromCounts(
  summary: DashboardSummaryItem[] | undefined,
  counts: {
    users: number;
    projects: number;
    blogs: number;
    comments: number;
  },
): DashboardSummaryItem[] {
  if (summary) return summary;

  return [
    {
      label: "Total Users",
      value: counts.users,
      change: "Live",
      tone: "positive",
    },
    { label: "Projects", value: counts.projects, change: "Live", tone: "info" },
    {
      label: "Blog Posts",
      value: counts.blogs,
      change: "Live",
      tone: "neutral",
    },
    {
      label: "Comments",
      value: counts.comments,
      change: "Live",
      tone: "warning",
    },
  ];
}

function buildSeries(events: ActivityEvent[], period: DashboardPeriod) {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  if (period === "1w") {
    const start = addDays(now, -6);
    return Array.from({ length: 7 }, (_, index) => {
      const bucketStart = addDays(start, index);
      const bucketEnd = addDays(start, index + 1);
      const value = events.filter(
        (event) => event.date >= bucketStart && event.date < bucketEnd,
      ).length;

      return {
        label: formatDayLabel(bucketStart),
        value,
        isLatest: index === 6,
        dateRangeLabel: formatDateLabel(bucketStart),
      };
    });
  }

  if (period === "1m") {
    const start = addDays(now, -27);
    return Array.from({ length: 4 }, (_, index) => {
      const bucketStart = addDays(start, index * 7);
      const bucketEnd = addDays(start, index * 7 + 7);
      const value = events.filter(
        (event) => event.date >= bucketStart && event.date < bucketEnd,
      ).length;

      return {
        label: `Week ${index + 1}`,
        value,
        isLatest: index === 3,
        dateRangeLabel: `${formatDateLabel(bucketStart)} - ${formatDateLabel(addDays(bucketEnd, -1))}`,
      };
    });
  }

  const start = startOfMonth(addMonths(now, -5));
  return Array.from({ length: 6 }, (_, index) => {
    const bucketStart = startOfMonth(addMonths(start, index));
    const bucketEnd = startOfMonth(addMonths(bucketStart, 1));
    const value = events.filter(
      (event) => event.date >= bucketStart && event.date < bucketEnd,
    ).length;

    return {
      label: formatMonthLabel(bucketStart),
      value,
      isLatest: index === 5,
      dateRangeLabel: bucketStart.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };
  });
}

function getPeriodRange(period: DashboardPeriod) {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  if (period === "1w") {
    const end = now;
    const start = addDays(end, -7);
    return {
      start,
      end,
      previousStart: addDays(start, -7),
      previousEnd: start,
    };
  }

  if (period === "1m") {
    const end = now;
    const start = addDays(end, -30);
    return {
      start,
      end,
      previousStart: addDays(start, -30),
      previousEnd: start,
    };
  }

  const end = now;
  const start = addMonths(end, -6);
  return {
    start,
    end,
    previousStart: addMonths(start, -6),
    previousEnd: start,
  };
}

function getChangePercent(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export default function DashboardChart({
  title = "Operational Activity",
  subtitle = "Track live activity across users, projects, blog posts, and comments.",
  projects = [],
  blogs = [],
  comments = [],
  users = [],
  summary,
}: DashboardChartProps) {
  const [period, setPeriod] = useState<DashboardPeriod>("1w");

  const activityEvents = useMemo(
    () =>
      [
        ...buildActivityEvents(projects, "Project"),
        ...buildActivityEvents(blogs, "Blog"),
        ...buildActivityEvents(comments, "Comment"),
        ...buildActivityEvents(users, "User"),
      ].sort((left, right) => right.date.getTime() - left.date.getTime()),
    [projects, blogs, comments, users],
  );

  const counts = useMemo(
    () => ({
      users: users.length,
      projects: projects.length,
      blogs: blogs.length,
      comments: comments.length,
    }),
    [users.length, projects.length, blogs.length, comments.length],
  );

  const summaryCards = buildSummaryFromCounts(summary, counts);
  const series = useMemo(
    () => buildSeries(activityEvents, period),
    [activityEvents, period],
  );
  const maxActivity = Math.max(...series.map((item) => item.value), 1);
  const { start, end, previousStart, previousEnd } = getPeriodRange(period);

  const currentPeriodEvents = activityEvents.filter(
    (event) => event.date >= start && event.date <= end,
  );
  const previousPeriodEvents = activityEvents.filter(
    (event) => event.date >= previousStart && event.date < previousEnd,
  );

  const currentTotal = currentPeriodEvents.length;
  const previousTotal = previousPeriodEvents.length;
  const changePercent = getChangePercent(currentTotal, previousTotal);
  const latestActivity = activityEvents[0];
  const peakBucket = series.reduce(
    (best, item) => (item.value > best.value ? item : best),
    series[0],
  );
  const dailyBoost =
    series.length > 1
      ? series[series.length - 1].value - series[series.length - 2].value
      : 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="absolute inset-0 " />

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col gap-4 border-b border-slate-200/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
              Overview
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
              {title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-500 sm:text-base">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {periodOptions.map((option) => {
              const active = period === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPeriod(option.value)}
                  className={`rounded-full border px-4 py-2 text-left transition-all duration-200 ${
                    active
                      ? "border-sky-500 bg-sky-500 text-white shadow-md shadow-sky-500/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-700"
                  }`}
                >
                  <span className="block text-sm font-semibold">
                    {option.label}
                  </span>
                  <span
                    className={`block text-[11px] ${active ? "text-white/80" : "text-slate-400"}`}
                  >
                    {option.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                  {periodLabel[period]}
                </p>
                <h4 className="mt-2 text-lg font-semibold">Live bar chart</h4>
                <p className="mt-1 text-sm text-slate-300">
                  Latest activity:{" "}
                  {latestActivity
                    ? formatTimeLabel(latestActivity.date)
                    : "No activity yet"}
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-slate-200">
                <span className="text-xs uppercase tracking-[0.18em] text-sky-300">
                  Trend
                </span>
                <span
                  className={`text-lg font-semibold ${changePercent >= 0 ? "text-emerald-300" : "text-rose-300"}`}
                >
                  {changePercent >= 0 ? "+" : ""}
                  {changePercent.toFixed(1)}%
                </span>
                <span>
                  vs previous{" "}
                  {period === "1w"
                    ? "week"
                    : period === "1m"
                      ? "month"
                      : "6 months"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Current activity
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {currentTotal}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  In the selected range
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Latest bucket
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {series[series.length - 1]?.value ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {dailyBoost >= 0 ? "+" : ""}
                  {dailyBoost} vs previous
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Peak bucket
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {peakBucket?.value ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {peakBucket?.dateRangeLabel ?? "No data"}
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Live status
                </p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {latestActivity ? "Active" : "Idle"}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {latestActivity ? latestActivity.category : "No recent event"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 items-end gap-2 sm:gap-4">
              {series.map((point) => {
                const heightPercent = Math.max(
                  (point.value / maxActivity) * 100,
                  8,
                );

                return (
                  <div
                    key={`${point.label}-${point.dateRangeLabel}`}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-52 w-full items-end rounded-2xl bg-white/5 px-2 pb-2 sm:h-64">
                      <div
                        className={`w-full rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                          point.isLatest
                            ? "bg-gradient-to-t from-cyan-400 via-sky-500 to-indigo-500 shadow-[0_10px_40px_rgba(59,130,246,0.35)]"
                            : "bg-gradient-to-t from-slate-500 via-slate-400 to-slate-300"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">
                        {point.value}
                      </p>
                      <p className="text-xs text-slate-400">{point.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                    Recent activity
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">
                    What changed recently
                  </h4>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  Live
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {currentPeriodEvents.slice(0, 4).map((activity) => (
                  <div
                    key={`${activity.category}-${activity.label}-${activity.date.toISOString()}`}
                    className="flex gap-3"
                  >
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">
                      {activity.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {activity.label}
                        </p>
                        <span className="shrink-0 text-[11px] font-medium text-slate-400">
                          {formatTimeLabel(activity.date)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        {activity.description}
                      </p>
                      <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
                    Content distribution
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">
                    Activity mix
                  </h4>
                </div>
                <span className="text-sm font-semibold text-slate-500">
                  {activityEvents.length} events
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {summaryCards.map((item: DashboardSummaryItem) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-700">
                        {item.label}
                      </span>
                      <span
                        className={`inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r ${summaryToneClass[item.tone]}`}
                      />
                    </div>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="text-2xl font-bold text-slate-900">
                        {item.value}
                      </p>
                      <p className="text-xs font-semibold text-slate-500">
                        {item.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
