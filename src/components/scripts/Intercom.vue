<template></template>

<script>
  import { useEnvironmentStore } from "@/stores/environment";
  import { mapState } from "pinia";

  export default {
    name: "Intercom",
    mounted() {
      if (this.integration === "intercom") {
        console.log("calling intercom");
        this.callIntercom();
      }
    },
    computed: {
      ...mapState(useEnvironmentStore, ["integration"]),
    },
    unmounted() {
      this.removeIntercom();
    },
    methods: {
      callIntercom() {
        (function () {
          var w = window;
          var ic = w.Intercom;
          if (typeof ic === "function") {
            ic("reattach_activator");
            ic("update", w.intercomSettings);
          } else {
            var d = document;
            var i = function () {
              i.c(arguments);
            };
            i.q = [];
            i.c = function (args) {
              i.q.push(args);
            };
            w.Intercom = i;
            var l = function () {
              var s = d.createElement("script");
              s.type = "text/javascript";
              s.async = true;
              s.src = `https://widget.intercom.io/widget/${import.meta.env.VITE_INTERCOM_KEY}`;
              var x = d.getElementsByTagName("script")[0];
              x.parentNode.insertBefore(s, x);
            };
            if (document.readyState === "complete") {
              l();
            } else if (w.attachEvent) {
              w.attachEvent("onload", l);
            } else {
              w.addEventListener("load", l, false);
            }
          }
        })();
        this.initializeIntercom();
      },
      async initializeIntercom() {
        console.log("here");
        window.Intercom("boot", {
          api_base: "https://api-iam.intercom.io",
          app_id: import.meta.env.VITE_INTERCOM_KEY,
          user_id: this.visitor_id,
          email: this.email,
          created_at: new Date(),
        });
      },
      removeIntercom() {
        const scripts = document.querySelectorAll("script");
        for (const script of scripts) {
          if (
            script.getAttribute("src").split("/").includes("widget.intercom.io")
          ) {
            script.parentNode.removeChild(script);
          }
        }
      },
    },
  };
</script>
