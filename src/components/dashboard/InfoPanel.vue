<template>
  <div class="infoPanel">
    <div class="infoPanel__card" v-for="info in data" :key="info.key">
      <info-box :info="info" />
    </div>
  </div>
</template>

<script>
import Divider from "primevue/divider";
import InfoBox from "./InfoBox.vue";

export default {
  name: "InfoPanel",
  components: {
    Divider,
    InfoBox,
  },
  data() {
    return {
      data: [
        {
          key: 0,
          arrow: "pi pi-sort-up-fill",
          arrowColor: "#76db9b",
          icon: "pi pi-user",
          label: "Total Users",
          metric: "2,500",
          subheader: "4% from last week",
        },
        {
          key: 1,
          arrow: "pi pi-sort-up-fill",
          arrowColor: "#76db9b",
          icon: "pi pi-clock",
          label: "Average Time",
          metric: "123.50",
          subheader: "3% from last week",
        },
        {
          key: 2,
          icon: "pi pi-user",
          label: "Total New Users This Month",
          metric: "52",
        },
        {
          key: 3,
          arrow: "pi pi-sort-down-fill",
          arrowColor: "#ff6259",
          icon: "pi pi-credit-card",
          label: "Total Collections",
          metric: "2,315",
          subheader: "5% from last week",
        },
        {
          key: 4,
          arrow: "pi pi-sort-up-fill",
          arrowColor: "#76db9b",
          icon: "pi pi-inbox",
          label: "Bounce Rate",
          metric: "20%",
          subheader: "5% from last week",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.infoPanel {
  margin-top: 12px;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #52525b;

  &__card {
    display: flex;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-gap: 6px;
    width: 200px;
    height: 200px;
    border-right: 1px solid black;

    .p-divider-vertical {
      margin-top: 12px;
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
