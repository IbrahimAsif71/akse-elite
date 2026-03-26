// ─────────────────────────────────────────────────────
// Dummy analytics data for the admin dashboard.
// Replace with real API calls when analytics backend is ready.
// ─────────────────────────────────────────────────────

export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export interface DailyVisitors {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface TourPerformance {
  name: string;
  views: number;
  color: string;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  color: string;
}

export interface TopTour {
  rank: number;
  name: string;
  views: number;
  avgDuration: string;
  completionRate: number;
  status: "live" | "in-production";
}

export interface GeoData {
  country: string;
  visitors: number;
  color: string;
}

// ── Stat Cards ──────────────────────────────────────

export const statCards: StatCard[] = [
  {
    label: "Total Tours",
    value: "12",
    change: "+3",
    trend: "up",
    icon: "map",
  },
  {
    label: "Total Visitors",
    value: "24,832",
    change: "+18.2%",
    trend: "up",
    icon: "users",
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: "+12%",
    trend: "up",
    icon: "clock",
  },
  {
    label: "Bounce Rate",
    value: "34.1%",
    change: "-2.3%",
    trend: "down",
    icon: "activity",
  },
];

// ── Daily Visitors (last 30 days) ───────────────────

function generateDailyVisitors(): DailyVisitors[] {
  const data: DailyVisitors[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const base = 600 + Math.floor(Math.random() * 400);
    const weekday = d.getDay();
    const multiplier = weekday === 0 || weekday === 6 ? 0.7 : 1;
    const visitors = Math.floor(base * multiplier);
    data.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      visitors,
      pageViews: Math.floor(visitors * (2.1 + Math.random() * 0.8)),
    });
  }
  return data;
}

export const dailyVisitors: DailyVisitors[] = generateDailyVisitors();

// ── Tour Performance ────────────────────────────────

export const tourPerformance: TourPerformance[] = [
  { name: "Badshahi Mosque", views: 4820, color: "#c9653d" },
  { name: "Lahore Fort", views: 3940, color: "#d4784e" },
  { name: "Shalimar Gardens", views: 3210, color: "#2c7a83" },
  { name: "Faisal Mosque", views: 2870, color: "#3a8f99" },
  { name: "Mohenjo-daro", views: 2340, color: "#c9653d" },
  { name: "Taxila Museum", views: 1890, color: "#d4784e" },
  { name: "Rohtas Fort", views: 1520, color: "#2c7a83" },
  { name: "Makli Necropolis", views: 1180, color: "#3a8f99" },
];

// ── Traffic Sources ─────────────────────────────────

export const trafficSources: TrafficSource[] = [
  { source: "Direct", percentage: 38, color: "#c9653d" },
  { source: "Organic Search", percentage: 28, color: "#2c7a83" },
  { source: "Social Media", percentage: 22, color: "#d4784e" },
  { source: "Referral", percentage: 12, color: "#e2d4c0" },
];

// ── Top Tours Table ─────────────────────────────────

export const topTours: TopTour[] = [
  {
    rank: 1,
    name: "Badshahi Mosque",
    views: 4820,
    avgDuration: "6m 12s",
    completionRate: 78,
    status: "live",
  },
  {
    rank: 2,
    name: "Lahore Fort",
    views: 3940,
    avgDuration: "5m 48s",
    completionRate: 72,
    status: "live",
  },
  {
    rank: 3,
    name: "Shalimar Gardens",
    views: 3210,
    avgDuration: "4m 55s",
    completionRate: 81,
    status: "live",
  },
  {
    rank: 4,
    name: "Faisal Mosque",
    views: 2870,
    avgDuration: "5m 20s",
    completionRate: 69,
    status: "live",
  },
  {
    rank: 5,
    name: "Mohenjo-daro",
    views: 2340,
    avgDuration: "7m 05s",
    completionRate: 85,
    status: "live",
  },
  {
    rank: 6,
    name: "Taxila Museum",
    views: 1890,
    avgDuration: "4m 30s",
    completionRate: 64,
    status: "in-production",
  },
  {
    rank: 7,
    name: "Rohtas Fort",
    views: 1520,
    avgDuration: "5m 10s",
    completionRate: 71,
    status: "live",
  },
  {
    rank: 8,
    name: "Makli Necropolis",
    views: 1180,
    avgDuration: "6m 45s",
    completionRate: 88,
    status: "in-production",
  },
];

// ── Geographic Distribution ─────────────────────────

export const geoData: GeoData[] = [
  { country: "Pakistan", visitors: 9840, color: "#c9653d" },
  { country: "United States", visitors: 3620, color: "#2c7a83" },
  { country: "United Kingdom", visitors: 2890, color: "#d4784e" },
  { country: "Germany", visitors: 1740, color: "#3a8f99" },
  { country: "Turkey", visitors: 1420, color: "#c9653d" },
  { country: "UAE", visitors: 1180, color: "#2c7a83" },
  { country: "Canada", visitors: 980, color: "#d4784e" },
  { country: "India", visitors: 870, color: "#3a8f99" },
];
