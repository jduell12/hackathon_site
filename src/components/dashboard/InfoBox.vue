<template>
  <div class="card">
    <div class="infoBox">
      <div class="infoBox__header">
        <i :class="icon" />
        <p>{{ label }}</p>
      </div>
      <h2>{{ metric }}</h2>
      <div class="infoBox__footer">
        <i :class="arrow" :style="{ color: arrowColor }" />
        <p>{{ subheader }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoBox",
  props: {
    info: {
      type: Object,
      default: {},
    },
  },
  computed: {
    arrow() {
      return this.info?.arrow;
    },
    arrowColor() {
      return this.info?.arrowColor;
    },
    icon() {
      return this.info?.icon;
    },
    label() {
      return this.info?.label;
    },
    metric() {
      return this.info?.metric;
    },
    subheader() {
      return this.info?.subheader;
    },
  },
};
</script>

<style lang="less">
.card {
  .infoBox {
    text-align: center;

    &__header {
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        margin-right: 6px;
      }
    }

    &__footer {
      display: flex;
      align-items: center;
    }
  }
}
</style>
