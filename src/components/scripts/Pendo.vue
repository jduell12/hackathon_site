<template>
  <Zendesk v-if="pendoScriptLoaded && zendeskSelected" />
  <Intercom v-if="pendoScriptLoaded && intercomSelected" />
  <Drift v-if="pendoScriptLoaded && driftSelected" />
  <Segment v-if="pendoScriptLoaded && segmentSelected" />
</template>
<script>
  import { useEnvironmentStore } from "@/stores/environment";
  import { mapState } from "pinia";
  import Drift from "../scripts/Drift.vue";
  import Intercom from "../scripts/Intercom.vue";
  import Segment from "../scripts/Segment.vue";
  import Zendesk from "../scripts/Zendesk.vue";

  export default {
    name: "Pendo",
    data() {
      return {
        pendoScriptLoaded: false,
      };
    },
    created() {
      let { initializePendo, env, apiKey, pendoScriptLoaded, callPendo } = this;

      const checkInterval = setInterval(function () {
        if (apiKey && env) {
          callPendo(apiKey, env);
          initializePendo();
          clearInterval(checkInterval);
        }
        return pendoScriptLoaded;
      }, 500);
    },
    components: {
      Drift,
      Intercom,
      Segment,
      Zendesk,
    },
    computed: {
      ...mapState(useEnvironmentStore, [
        "env",
        "apiKey",
        "account_id",
        "account_name",
        "email",
        "integration",
        "role",
        "visitor_id",
      ]),
      driftSelected() {
        return this.integration === "drift";
      },
      hasAccount() {
        return Boolean(this.account_id && this.account_name);
      },
      hasVisitorEmail() {
        return Boolean(this.email);
      },
      hasVisitorRole() {
        return Boolean(this.role);
      },
      segmentSelected() {
        return this.integration === "segment";
      },
      intercomSelected() {
        return this.integration === "intercom";
      },
      zendeskSelected() {
        return this.integration === "zendesk";
      },
    },
    unmounted() {
      this.removePendo();
    },
    methods: {
      callPendo(apiKey, env) {
        (function (p, e, n, d, o) {
          var v, w, x, y, z;
          o = p[d] = p[d] || {};
          o._q = o._q || [];
          v = ["initialize", "identify", "updateOptions", "pageLoad", "track"];
          for (w = 0, x = v.length; w < x; ++w)
            (function (m) {
              o[m] =
                o[m] ||
                function () {
                  o._q[m === v[0] ? "unshift" : "push"](
                    [m].concat([].slice.call(arguments, 0))
                  );
                };
            })(v[w]);
          y = e.createElement(n);
          y.async = !0;
          y.src =
            `https://cdn.${env}.pendo-dev.com/agent/static/` +
            apiKey +
            "/pendo.js";
          z = e.getElementsByTagName(n)[0];
          z.parentNode.insertBefore(y, z);
        })(window, document, "script", "pendo");
      },
      async initializePendo() {
        let init = { apiKey: this.apiKey };

        if (this.hasAccount) {
          init = {
            ...init,
            visitor: {
              id: this.visitor_id,
              email: this.email,
              role: this.role,
            },
            account: {
              id: this.account_id,
              name: this.account_name,
            },
          };
        } else if (this.hasVisitorEmail && this.hasVisitorRole) {
          init = {
            ...init,
            visitor: {
              id: this.visitor_id,
              email: this.email,
              role: this.role,
            },
          };
        } else if (this.hasVisitorEmail) {
          init = {
            ...init,
            visitor: {
              id: this.visitor_id,
              email: this.email,
            },
          };
        } else if (this.hasVisitorRole) {
          init = {
            ...init,
            visitor: {
              id: this.visitor_id,
              email: this.email,
              role: this.role,
            },
          };
        } else {
          init = {
            ...init,
            visitor: {
              id: this.visitor_id,
            },
          };
        }

        await pendo.initialize(init);
        this.pendoScriptLoaded = true;
      },
      removePendo() {
        window.pendo.clearSession();
        const scripts = document.querySelectorAll("script");
        for (const script of scripts) {
          if (script.getAttribute("src").split("/").includes("agent")) {
            script.parentNode.removeChild(script);
          }
        }
      },
    },
  };
</script>

<style></style>
