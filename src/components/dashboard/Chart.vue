<template>
  <div class="chartCard">
    <Calendar
      v-model="dates"
      selectionMode="range"
      :manualInput="false"
      showIcon
      showButtonBar
      @date-select="changeDate"
    />
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
import Chart from "primevue/chart";

export default {
  name: "ChartCard",
  components: {
    Calendar,
    Chart,
  },
  mounted() {
    this.chartData = this.setChartData();
    this.chartOptions = this.setChartOptions();
  },
  data() {
    return {
      chartData: {},
      chartOptions: {},
      dates: [new Date("05/01/2024"), new Date("05/07/2024")],
      datePicked: 0,
    };
  },
  methods: {
    changeDate() {
      this.datePicked += 1;
      if (this.datePicked === 2) {
        this.datePicked = 0;
        this.chartData = this.setChartData();
      }
    },
    setChartData() {
      return {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Sales",
            data: Array.from({ length: 4 }, () =>
              Math.floor(Math.random() * 1000),
            ),
            backgroundColor: [
              "rgba(249, 115, 22, 0.2)",
              "rgba(6, 182, 212, 0.2)",
              "rgb(107, 114, 128, 0.2)",
              "rgba(139, 92, 246, 0.2)",
            ],
            borderColor: [
              "rgb(249, 115, 22)",
              "rgb(6, 182, 212)",
              "rgb(107, 114, 128)",
              "rgb(139, 92, 246)",
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary",
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      return {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    },
  },
};
</script>

<style lang="less">
.chartCard {
  background-color: #27272a;
  margin: 24px 0;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .p-calendar {
    margin-top: 12px;
    width: 260px;
  }

  .p-chart {
    height: 450px;
    width: 90%;
    margin-bottom: 12px;
  }
}
</style>
