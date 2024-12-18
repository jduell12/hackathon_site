import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import BadgeDirective from "primevue/badgedirective";
import "primevue/resources/themes/aura-dark-indigo/theme.css";
import Tooltip from 'primevue/tooltip';
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.directive("badge", BadgeDirective);
app.directive('tooltip', Tooltip)

app.mount("#app");
