<template>
  <div>
    <h1>Set up Pendo</h1>
    <p :v-if="errMsg">{{ errMsg }}</p>
    <p :v-if="envErrMsg">{{ envErrMsg }}</p>
    <span class="form_span">
      <form>
        <FloatLabel>
          <Dropdown
            placeholder="Select an envrionment"
            v-model="form.env"
            input-id="env"
            :options="environments"
          />
          <label for="env"> Pendo Environment </label>
        </FloatLabel>
        <FloatLabel>
          <label for="apiKey"> Subscription apiKey </label>
          <InputText id="apiKey" v-model="form.apiKey" />
        </FloatLabel>
        <FloatLabel>
          <label for="visitor"> Visitor ID </label>
          <InputText id="visitor" v-model="form.visitor_id" />
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            placeholder="Select a role for the visitor:"
            v-model="form.role"
            input-id="role"
            :options="roles"
          />
          <label for="role"> Role (Optional) </label>
        </FloatLabel>
        <FloatLabel>
          <label for="account_name"> Account Name (Optional) </label>
          <InputText id="account_name" v-model="form.account_name" />
        </FloatLabel>
        <FloatLabel>
          <label for="accound_id"> Account ID (Optional) </label>
          <InputText id="accound_id" v-model="form.accound_id" />
        </FloatLabel>
        <label class="radio_label"
          >Native Integration (Optional)
          <div
            v-for="integration in integrations"
            :key="integration.key"
            class="radio_btns"
          >
            <RadioButton
              v-model="form.integration"
              :inputId="integration.key"
              name="dynamic"
              :value="integration.name"
            />
            <label :for="integration.key" class="ml-2">{{
              integration.label
            }}</label>
          </div>
        </label>
        <div class="segment_div">
          <label for="segment"> Enable Segment (Optional): </label>
          <Checkbox
            id="account_name"
            :binary="true"
            v-model="form.enableSegment"
          />
        </div>
        <Button @click="submit">Submit</Button>
      </form>
    </span>
  </div>
</template>

<script>
import { useEnvironmentStore } from "@/stores/environment";
import { useSideBarStore } from "@/stores/sideBar";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";

export default {
  name: "IntroForm",
  setup() {
    const barStore = useSideBarStore();
    const store = useEnvironmentStore();

    barStore.resetSideBar();
    store.resetEnv();
    return { store };
  },
  components: {
    Button,
    Checkbox,
    Dropdown,
    FloatLabel,
    InputText,
    RadioButton,
  },
  data() {
    return {
      envErrMsg: null,
      environments: [
        "apollo",
        "armada",
        "atlas",
        "batman",
        "calypso",
        "dap",
        "freeze",
        "helix",
        "ionchef",
        "link",
        "magic",
        "mcfly",
        "ml",
        "mobile-fbi",
        "mobile-guides",
        "mobile-hummus",
        "mobile-plat",
        "perfserf",
        "scrum-ops",
        "security",
        "voc",
        "wildlings",
      ],
      errMsg: null,
      form: {
        env: "",
        apiKey: "",
        visitor_id: "",
        email: "",
        account_name: "",
        account_id: "",
        integration: "",
        role: "",
        enableSegment: false,
      },
      integrations: [
        { key: "drift", name: "drift", label: "Drift" },
        { key: "intercom", name: "intercom", label: "Intercom" },
        { key: "zendesk", name: "zendesk", label: "Zendesk" },
      ],
      roles: ["Engineering", "Sales", "Product Manager", "Quality Engineer"],
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.errMsg || this.envErrMsg) {
          this.errMsg = null;
          this.envErrMsg = null;
        }
      },
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.formatForm();

      if (this.form.apiKey === "" || this.visitor_id === "") {
        this.errMsg = "Please enter a Subscription apiKey and Visitor ID.";
        return;
      }

      if (this.form.env === "") {
        this.envErrMsg = `Please select a Pendo environment.`;
        return;
      }

      this.form.env = `pendo-${this.form.env}`;

      this.store.updateEnv(this.form);

      this.$router.push("/dashboard");
    },
    formatForm() {
      this.form.env = this.form.env.trim();
      this.form.apiKey = this.form.apiKey.trim();
      this.form.visitor_id = this.form.visitor_id.trim();
      this.form.email = this.form.email.trim();
      this.form.account_name = this.form.account_name.trim();
      this.form.account_id = this.form.account_id.trim();
      this.form.role = this.form.role.trim();
    },
  },
};
</script>

<style lang="less" scoped>
div {
  text-align: center;

  p {
    margin: 24px 0;
  }

  .form_span {
    display: flex;
    justify-content: center;

    form {
      display: flex;
      flex-direction: column;
      width: 300px;

      .p-float-label {
        margin: 16px 0;
      }

      .p-inputtext,
      .p-dropdown {
        width: 325px;
        font-size: 14px;
      }

      .radio_label {
        text-align: justify;
      }

      .radio_btns {
        display: flex;
        align-items: flex-end;
        padding-left: 12px;
        margin: 12px 0;
      }

      .p-radiobutton {
        margin-right: 12px;
      }

      .segment_div {
        display: flex;
        margin: 12px 0;
        label {
          margin-right: 12px;
        }
      }

      .p-button {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
