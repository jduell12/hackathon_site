<template>
  <div id="dashboard">
    <side-bar />
    <div class="dashboard__body" :class="sideBarOpen ? 'open' : 'closed'">
      <top-bar />
      <info-panel />
      <Chart />
      <div class="dashboard__body__widgets">
        <widget-card
          v-for="widget in widgets"
          :key="widget.key"
          :data="widget"
        />
      </div>
    </div>
    <div>
      <Pendo />
    </div>
  </div>
</template>

<script>
  import { useSideBarStore } from "@/stores/sideBar";
  import Chart from "./Chart.vue";
  import TopBar from "./TopBar.vue";
  import InfoPanel from "./InfoPanel.vue";
  import Pendo from "../scripts/Pendo.vue";
  import SideBar from "./SideBar.vue";
  import WidgetCard from "./WidgetCard.vue";

  export default {
    name: "Dashboard",
    components: {
      Chart,
      InfoPanel,
      Pendo,
      SideBar,
      TopBar,
      WidgetCard,
    },
    setup() {
      const store = useSideBarStore();
      return { store };
    },
    data() {
      return {
        widgets: [
          {
            key: 0,
            title: "App Versions",
            chartType: "bar",
            chartData: {
              labels: ["0.1.0", "0.1.1", "0.1.2", "0.1.3"],
              datasets: [
                {
                  label: "App Usage Across Versions",
                  data: [123000, 53000, 23000, 3000, 1000],
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
                  datalabels: {
                    align: "end",
                    anchor: "end",
                  },
                  borderWidth: 1,
                },
              ],
            },
            chartOptions: {
              indexAxis: "y",
              plugins: {
                datalabels: {
                  formatter: function (value) {
                    return value / 1000 + "k";
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    display: false,
                  },
                },
              },
            },
            isHorizontal: true,
          },
          {
            key: 1,
            title: "Device Usage",
            chartType: "doughnut",
            chartData: {
              labels: ["IOS", "Android", "Blackberry", "Symbian", "Others"],
              datasets: [
                {
                  label: "Top 5",
                  data: [30, 10, 20, 15, 30],
                  backgroundColor: [
                    "rgba(59, 130, 246, 0.2)", //ios
                    "rgba(34, 197, 94, 0.2)", //android
                    "rgba(168, 85, 247, 0.2)", //blackberry
                    "rgba(246, 222, 149, 0.2)", //symbian
                    "rgba(250, 211, 231, 0.2)", //others
                  ],
                  borderColor: [
                    "rgba(59, 130, 246, 1)", //ios
                    "rgba(34, 197, 94, 1)", //android
                    "rgba(168, 85, 247, 1)", //blackberry
                    "rgba(246, 222, 149, 1)", //symbian
                    "rgba(250, 211, 231, 1)", //others
                  ],
                  borderWidth: 1,
                },
              ],
            },
            chartOptions: {
              plugins: {
                datalabels: {
                  formatter: function (value) {
                    return value + "%";
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    display: false,
                  },
                },
              },
            },
            isHorizontal: true,
          },
          {
            key: 2,
            title: "Quota",
            chartType: "doughnut",
            chartData: {
              datasets: [
                {
                  data: [1000, 4000],
                  backgroundColor: [
                    "rgba(34, 197, 94, 1)",
                    "rgba(2, 6, 23, 0.2)",
                  ],
                  borderWidth: 1,
                  datalabels: {
                    anchor: "center",
                    align: "center",
                  },
                },
              ],
            },
            chartOptions: {
              plugins: {
                datalabels: {
                  formatter: function (value) {
                    let nf = new Intl.NumberFormat("en-US");
                    return "$" + nf.format(value);
                  },
                  color: "white",
                },
              },
              rotation: 85 * Math.PI,
              circumference: 60 * Math.PI,
              scales: {
                y: {
                  ticks: {
                    display: false,
                  },
                },
              },
            },
            isHorizontal: true,
          },
        ],
      };
    },
    computed: {
      sideBarOpen() {
        return this.store.sideBarOpen;
      },
    },
  };
</script>

<style lang="less">
  #dashboard {
    background-color: #52525b;
    border-radius: 6px;

    .open {
      margin-left: 300px;
    }

    .closed {
      margin-left: 100px;
    }

    .dashboard__body {
      border-radius: 6px;
      height: 170vh;

      &__widgets {
        display: flex;
        justify-content: space-evenly;
      }
    }
  }
</style>
