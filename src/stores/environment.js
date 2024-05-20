import { defineStore } from "pinia";

const initalState = {
  env: "",
  apiKey: "",
  visitor_id: "",
  email: "",
  account_name: "",
  account_id: "",
  integration: "",
  role: "",
};

export const useEnvironmentStore = defineStore("environment", {
  state: () => initalState,
  getters: {
    environmentVariables(state) {
      return state;
    },
  },
  actions: {
    resetEnv() {
      this.state = initalState;
    },
    updateEnv(form) {
      for (const key of Object.keys(form)) {
        this[key] = form[key];
      }
    },
  },
});
