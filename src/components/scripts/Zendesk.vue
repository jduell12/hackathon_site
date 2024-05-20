<template></template>

<script>
  import { useEnvironmentStore } from "@/stores/environment";
  import { mapState } from "pinia";

  export default {
    name: "Zendesk",
    mounted() {
      if (this.integration === "zendesk") {
        const body = document.querySelector("body");
        const zendeskScript = document.createElement("script");
        zendeskScript.setAttribute(
          "src",
          `https://static.zdassets.com/ekr/snippet.js?key=${import.meta.env.VITE_ZENDESK_KEY}`
        );
        zendeskScript.id = "ze-snippet";
        body.appendChild(zendeskScript);
      }
    },
    unmounted() {
      this.removeZendesk();
    },
    computed: {
      ...mapState(useEnvironmentStore, ["integration"]),
    },
    methods: {
      removeZendesk() {
        const scripts = document.querySelectorAll("script");
        for (const script of scripts) {
          if (
            script
              .getAttribute("src")
              .split("/")
              .includes("static.zdassets.com")
          ) {
            script.parentNode.removeChild(script);
          }
        }
      },
    },
  };
</script>
