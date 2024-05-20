import { defineStore } from "pinia";

export const useSideBarStore = defineStore("sideBar", {
  state: () => ({
    open: true,
  }),
  getters: {
    sideBarOpen(state) {
      return state.open;
    },
  },
  actions: {
    resetSideBar() {
      this.open = true;
    },
    toggleBar() {
      this.open = !this.open;
    },
  },
});
