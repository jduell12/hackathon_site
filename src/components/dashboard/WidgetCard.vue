<template>
  <Accordion
    class="widgetCard"
    :activeIndex="0"
    :id="chartType + '-' + key"
    expandIcon="pi pi-angle-right"
    collapseIcon="pi pi-angle-down"
  >
    <AccordionTab>
      <template #header>
        <div class="widgetCard__group">
          {{ title }}
          <div>
            <span class="p-accordion-toggle-icon"
              ><i class="pi pi-times" @click="toggleClass" />
            </span>
          </div>
        </div>
      </template>
      <Chart :type="type" :data="chartData" :options="chartOptions" />
    </AccordionTab>
  </Accordion>
</template>

<script>
import _get from "lodash/get";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { Chart as ChartJS } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "primevue/chart";

ChartJS.register(ChartDataLabels);

export default {
  name: "WidgetCard",
  components: {
    Accordion,
    AccordionTab,
    Chart,
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      chartData: {},
      chartOptions: {},
      key: -1,
      title: "",
      type: "",
    };
  },
  mounted() {
    this.chartData = this.data?.chartData;
    this.chartOptions = this.setChartOptions();
    this.key = this.data?.key;
    this.type = this?.chartType;
    this.title = this.data?.title;
  },
  computed: {
    chartType() {
      return this.data?.chartType;
    },
    chartType() {
      return this.data?.chartType;
    },
    isHorizontal() {
      return this.data?.isHorizontal;
    },
  },
  methods: {
    setChartOptions() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary",
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      const labelColor = _get(
        this?.data,
        "chartOptions.plugins.datalabels.color",
      );

      return {
        ...this?.data.chartOptions,
        plugins: {
          ...this?.data.chartOptions.plugins,
          legend: {
            labels: {
              color: textColor,
            },
          },
          datalabels: {
            ...this?.data.chartOptions.plugins.datalabels,
            color: labelColor ? labelColor : textColorSecondary,
            font: {
              weight: "bold",
            },
          },
        },
        scales: {
          ...this?.data.chartOptions.scales,
          x: {
            ...this?.data.chartOptions.scales.x,
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
            ...this?.data.chartOptions.scales.y,
          },
        },
      };
    },
    toggle(event) {
      this.$refs.openMenu.toggle(event);
    },
    toggleClass() {
      const card = document.querySelector(
        `#${this.chartType + "-" + this.key}`,
      );
      card.classList.add("none");
    },
  },
};
</script>

<style lang="less">
.widgetCard {
  width: 30%;

  .p-accordion-tab {
    width: 100%;

    .p-accordion-toggle-icon {
      padding: 6px 0;
    }

    .p-accordion-toggle-icon:hover {
      background-color: rgba(161, 161, 170, 0.2);
    }
  }

  &__group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}

.none {
  display: none;
}
</style>
