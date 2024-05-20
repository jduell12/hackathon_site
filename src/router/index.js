import { createRouter, createWebHistory } from "vue-router";
import Form from "@/components/Form.vue";
import Dashboard from "@/components/dashboard/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "form",
      component: Form,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
  ],
});

export default router;
