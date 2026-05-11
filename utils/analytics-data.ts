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
    value: "6",
    change: "+2",
    trend: "up",
    icon: "map",
  },
  {
    label: "Total Visitors",
    value: "17,234",
    change: "+18.20%",
    trend: "up",
    icon: "users",
  },
  {
    label: "Avg. Session",
    value: "4m 53s",
    change: "+7.7%",
    trend: "up",
    icon: "clock",
  },
  {
    label: "Bounce Rate",
    value: "29.48%",
    change: "-4.62%",
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
    const base = 450 + Math.floor(Math.random() * 280);
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
  { name: "Golra Railway Station", views: 5350, color: "#c9653d" },
  { name: "Dome Restaurant", views: 4980, color: "#d4784e" },
  { name: "Saidpur Village", views: 3620, color: "#2c7a83" },
  { name: "Serena Hotel", views: 3284, color: "#3a8f99" },
  { name: "Rewat Fort", views: 1840, color: "#a0522d" },
  { name: "Nouvelle by Shadiyana", views: 1560, color: "#5ba3ac" },
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
    name: "Golra Railway Station",
    views: 5350,
    avgDuration: "6m 20s",
    completionRate: 78,
    status: "live",
  },
  {
    rank: 2,
    name: "Dome Restaurant",
    views: 4980,
    avgDuration: "5m 55s",
    completionRate: 72,
    status: "live",
  },
  {
    rank: 3,
    name: "Saidpur Village",
    views: 3620,
    avgDuration: "5m 05s",
    completionRate: 81,
    status: "live",
  },
  {
    rank: 4,
    name: "Serena Hotel",
    views: 3284,
    avgDuration: "5m 28s",
    completionRate: 69,
    status: "live",
  },
  {
    rank: 5,
    name: "Rewat Fort",
    views: 1840,
    avgDuration: "4m 50s",
    completionRate: 74,
    status: "live",
  },
  {
    rank: 6,
    name: "Nouvelle by Shadiyana",
    views: 1560,
    avgDuration: "4m 35s",
    completionRate: 66,
    status: "live",
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
