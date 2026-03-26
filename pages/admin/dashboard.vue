<script setup lang="ts">
import {
  Chart,
  LineController,
  BarController,
  DoughnutController,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import {
  statCards,
  dailyVisitors,
  tourPerformance,
  trafficSources,
  topTours,
  geoData,
} from "~/utils/analytics-data";

definePageMeta({
  layout: "admin",
});

useSeoMeta({
  title: "Dashboard — AKSE Admin",
  robots: "noindex, nofollow",
});

// Guard: redirect to login if not authenticated
const { isAuthenticated } = useAdminAuth();
if (!isAuthenticated.value) {
  navigateTo("/admin");
}

// Register Chart.js components
Chart.register(
  LineController,
  BarController,
  DoughnutController,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

// Canvas refs
const visitorChartRef = ref<HTMLCanvasElement | null>(null);
const tourChartRef = ref<HTMLCanvasElement | null>(null);
const trafficChartRef = ref<HTMLCanvasElement | null>(null);
const geoChartRef = ref<HTMLCanvasElement | null>(null);

// Chart instances
let visitorChart: Chart | null = null;
let tourChart: Chart | null = null;
let trafficChart: Chart | null = null;
let geoChart: Chart | null = null;

const chartDefaults = {
  color: "rgba(255,255,255,0.4)",
  borderColor: "rgba(255,255,255,0.06)",
};

onMounted(() => {
  Chart.defaults.color = chartDefaults.color;
  Chart.defaults.borderColor = chartDefaults.borderColor;

  initVisitorChart();
  initTourChart();
  initTrafficChart();
  initGeoChart();
});

onUnmounted(() => {
  visitorChart?.destroy();
  tourChart?.destroy();
  trafficChart?.destroy();
  geoChart?.destroy();
});

function initVisitorChart() {
  if (!visitorChartRef.value) return;
  const ctx = visitorChartRef.value.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(201, 101, 61, 0.3)");
  gradient.addColorStop(1, "rgba(201, 101, 61, 0)");

  const pvGradient = ctx.createLinearGradient(0, 0, 0, 300);
  pvGradient.addColorStop(0, "rgba(44, 122, 131, 0.2)");
  pvGradient.addColorStop(1, "rgba(44, 122, 131, 0)");

  visitorChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dailyVisitors.map((d) => d.date),
      datasets: [
        {
          label: "Visitors",
          data: dailyVisitors.map((d) => d.visitors),
          borderColor: "#c9653d",
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#c9653d",
        },
        {
          label: "Page Views",
          data: dailyVisitors.map((d) => d.pageViews),
          borderColor: "#2c7a83",
          backgroundColor: pvGradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#2c7a83",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          align: "end",
          labels: {
            boxWidth: 8,
            boxHeight: 8,
            usePointStyle: true,
            pointStyle: "circle",
            padding: 16,
            font: { size: 11 },
          },
        },
        tooltip: {
          backgroundColor: "rgba(20,18,16,0.95)",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          titleFont: { size: 12 },
          bodyFont: { size: 11 },
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            maxTicksLimit: 8,
            font: { size: 10 },
          },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { font: { size: 10 } },
        },
      },
    },
  });
}

function initTourChart() {
  if (!tourChartRef.value) return;
  const ctx = tourChartRef.value.getContext("2d")!;

  tourChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: tourPerformance.map((t) => t.name),
      datasets: [
        {
          label: "Views",
          data: tourPerformance.map((t) => t.views),
          backgroundColor: tourPerformance.map((t) => t.color + "cc"),
          borderColor: tourPerformance.map((t) => t.color),
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(20,18,16,0.95)",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { font: { size: 10 } },
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

function initTrafficChart() {
  if (!trafficChartRef.value) return;
  const ctx = trafficChartRef.value.getContext("2d")!;

  trafficChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: trafficSources.map((s) => s.source),
      datasets: [
        {
          data: trafficSources.map((s) => s.percentage),
          backgroundColor: trafficSources.map((s) => s.color + "cc"),
          borderColor: "rgba(20,18,16,1)",
          borderWidth: 3,
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: "circle",
            padding: 14,
            font: { size: 11 },
          },
        },
        tooltip: {
          backgroundColor: "rgba(20,18,16,0.95)",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed}%`,
          },
        },
      },
    },
  });
}

function initGeoChart() {
  if (!geoChartRef.value) return;
  const ctx = geoChartRef.value.getContext("2d")!;

  geoChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: geoData.map((g) => g.country),
      datasets: [
        {
          label: "Visitors",
          data: geoData.map((g) => g.visitors),
          backgroundColor: geoData.map((g) => g.color + "cc"),
          borderColor: geoData.map((g) => g.color),
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(20,18,16,0.95)",
          borderColor: "rgba(255,255,255,0.1)",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 } },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.04)" },
          ticks: { font: { size: 10 } },
        },
      },
    },
  });
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1
        class="text-2xl font-light tracking-tight text-white/90 md:text-3xl"
      >
        Analytics Overview
      </h1>
      <p class="mt-1 text-sm text-white/40">
        Monitor tour performance and visitor engagement
      </p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="card in statCards"
        :key="card.label"
        class="group rounded-xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]"
      >
        <div class="mb-3 flex items-center justify-between">
          <span
            class="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40"
          >
            {{ card.label }}
          </span>
          <!-- Icon -->
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5"
          >
            <svg
              v-if="card.icon === 'map'"
              class="h-4 w-4 text-[#c9653d]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            </svg>
            <svg
              v-else-if="card.icon === 'users'"
              class="h-4 w-4 text-[#2c7a83]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <svg
              v-else-if="card.icon === 'clock'"
              class="h-4 w-4 text-[#c9653d]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <svg
              v-else-if="card.icon === 'activity'"
              class="h-4 w-4 text-[#2c7a83]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
        </div>
        <p class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
          {{ card.value }}
        </p>
        <p
          class="mt-1 flex items-center gap-1 text-xs font-medium"
          :class="
            card.trend === 'up' ? 'text-emerald-400' : 'text-emerald-400'
          "
        >
          <svg
            v-if="card.trend === 'up'"
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <svg
            v-else
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          {{ card.change }}
          <span class="text-white/30">vs last month</span>
        </p>
      </div>
    </div>

    <!-- Visitor Trend Chart -->
    <div class="rounded-xl border border-white/8 bg-white/[0.03] p-5">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-base font-medium text-white/80">Visitor Trends</h2>
          <p class="text-xs text-white/35">Last 30 days</p>
        </div>
        <div class="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
          <span class="text-xs text-white/40">Daily</span>
        </div>
      </div>
      <div class="h-72">
        <canvas ref="visitorChartRef" />
      </div>
    </div>

    <!-- Two-column: Tour Performance + Traffic Sources -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <!-- Tour Performance (wider) -->
      <div
        class="rounded-xl border border-white/8 bg-white/[0.03] p-5 lg:col-span-3"
      >
        <div class="mb-4">
          <h2 class="text-base font-medium text-white/80">
            Tour Performance
          </h2>
          <p class="text-xs text-white/35">Views by tour</p>
        </div>
        <div class="h-80">
          <canvas ref="tourChartRef" />
        </div>
      </div>

      <!-- Traffic Sources -->
      <div
        class="rounded-xl border border-white/8 bg-white/[0.03] p-5 lg:col-span-2"
      >
        <div class="mb-4">
          <h2 class="text-base font-medium text-white/80">
            Traffic Sources
          </h2>
          <p class="text-xs text-white/35">Where visitors come from</p>
        </div>
        <div class="flex h-64 items-center justify-center">
          <canvas ref="trafficChartRef" />
        </div>
      </div>
    </div>

    <!-- Top Tours Table -->
    <div class="rounded-xl border border-white/8 bg-white/[0.03]">
      <div class="border-b border-white/8 p-5">
        <h2 class="text-base font-medium text-white/80">Top Tours</h2>
        <p class="text-xs text-white/35">Detailed tour analytics</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-white/8 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/35">
              <th class="px-5 py-3">#</th>
              <th class="px-5 py-3">Tour</th>
              <th class="px-5 py-3">Views</th>
              <th class="px-5 py-3">Avg Duration</th>
              <th class="px-5 py-3">Completion</th>
              <th class="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="tour in topTours"
              :key="tour.rank"
              class="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
            >
              <td class="px-5 py-3.5 text-white/30 font-mono text-xs">
                {{ String(tour.rank).padStart(2, "0") }}
              </td>
              <td class="px-5 py-3.5 font-medium text-white/80">
                {{ tour.name }}
              </td>
              <td class="px-5 py-3.5 font-mono text-white/60">
                {{ tour.views.toLocaleString() }}
              </td>
              <td class="px-5 py-3.5 text-white/60">
                {{ tour.avgDuration }}
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-2">
                  <div class="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                    <div
                      class="h-full rounded-full"
                      :class="
                        tour.completionRate >= 75
                          ? 'bg-emerald-500'
                          : tour.completionRate >= 50
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      "
                      :style="{ width: `${tour.completionRate}%` }"
                    />
                  </div>
                  <span class="text-xs text-white/40 font-mono">{{ tour.completionRate }}%</span>
                </div>
              </td>
              <td class="px-5 py-3.5">
                <span
                  class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  :class="
                    tour.status === 'live'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-amber-500/15 text-amber-400'
                  "
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full"
                    :class="
                      tour.status === 'live'
                        ? 'bg-emerald-400'
                        : 'bg-amber-400'
                    "
                  />
                  {{ tour.status === "live" ? "Live" : "Production" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Geographic Distribution -->
    <div class="rounded-xl border border-white/8 bg-white/[0.03] p-5">
      <div class="mb-4">
        <h2 class="text-base font-medium text-white/80">
          Geographic Distribution
        </h2>
        <p class="text-xs text-white/35">Visitors by country</p>
      </div>
      <div class="h-72">
        <canvas ref="geoChartRef" />
      </div>
    </div>

    <!-- Footer spacer -->
    <div class="h-4" />
  </div>
</template>
