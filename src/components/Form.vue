<template>
  <div>
    <h1>Set up Pendo</h1>
    <p :v-if="errMsg">{{ errMsg }}</p>
    <p :v-if="envErrMsg">{{ envErrMsg }}</p>
    <span class="form_span">
      <form>
        <Splitter>
          <SplitterPanel>
            <FloatLabel>
              <Dropdown
                placeholder="Select an envrionment"
                v-model="form.env"
                input-id="env"
                :options="environments"
              />
              <label for="env"> Pendo Environment </label>
            </FloatLabel>
            <i
              v-tooltip.top="'pendo-internal can not be used at this time'"
              class="tooltip pi pi-info-circle"
            ></i>
            <FloatLabel>
              <label for="apiKey"> Subscription apiKey </label>
              <InputText id="apiKey" v-model="form.apiKey" />
            </FloatLabel>
            <FloatLabel>
              <label for="visitor"> Visitor ID </label>
              <InputText id="visitor" v-model="form.visitor_id" />
              <Button
                @click="() => generateRandomID('visitor')"
                :class="[
                  form.visitor_id === '' ? 'label__btn' : '',
                  'random_id_btn',
                ]"
                >Generate Random Visitor ID</Button
              >
            </FloatLabel>
            <FloatLabel>
              <label for="visitor_email"> Visitor Email </label>
              <InputText id="visitor_email" v-model="form.email" />
              <Button
                @click="() => generateRandomID('email')"
                :class="[
                  form.email === '' ? 'label__btn' : '',
                  'random_id_btn',
                ]"
                >Generate Random Visitor Email</Button
              >
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
          </SplitterPanel>
          <SplitterPanel>
            <FloatLabel>
              <label for="account_name"> Account Name (Optional) </label>
              <InputText id="account_name" v-model="form.account_name" />
            </FloatLabel>
            <FloatLabel>
              <label for="account_id"> Account ID (Optional) </label>
              <InputText id="account_id" v-model="form.account_id" />
              <Button
                @click="() => generateRandomID('account')"
                :class="[
                  form.account_id === '' ? 'label__btn' : '',
                  'random_id_btn',
                ]"
                >Generate Random Account ID</Button
              >
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
          </SplitterPanel>
        </Splitter>
        <div class="save_div">
          <label for="save"> Remember Selection: </label>
          <Checkbox id="save" :binary="true" v-model="form.save_options" />
        </div>
        <div class="form_footer">
          <Button class="submit_btn" @click="submit">Submit</Button>
          <Button class="clear_btn" severity="warn" @click="clearForm"
            >Clear Form</Button
          >
        </div>
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
  import Splitter from "primevue/splitter";
  import SplitterPanel from "primevue/splitterpanel";

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
      Splitter,
      SplitterPanel,
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
          "dev",
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
          "test",
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
          save_options: false,
        },
        integrations: [
          { key: "drift", name: "drift", label: "Drift" },
          { key: "intercom", name: "intercom", label: "Intercom" },
          { key: "zendesk", name: "zendesk", label: "Zendesk" },
          { key: "none", name: "", label: "None" },
        ],
        roles: ["Engineering", "Sales", "Product Manager", "Quality Engineer"],
      };
    },
    created() {
      const form = JSON.parse(localStorage.getItem("form"));

      //checks form for non-empty strings and clicked check-boxes
      if (Object.values(form).some((str) => str != "" || str === true)) {
        this.form = form;
      }
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
      clearForm() {
        this.form = {
          env: "",
          apiKey: "",
          visitor_id: "",
          email: "",
          account_name: "",
          account_id: "",
          integration: "",
          role: "",
          enableSegment: false,
          save_options: false,
        };
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
      generateRandomID(type) {
        if (type === "visitor") {
          this.form.visitor_id = window.crypto.randomUUID();
        } else if (type === "account") {
          this.form.account_id = window.crypto.randomUUID();
        } else {
          this.form.email = "something@gmail.com";
        }
      },
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

        if (this.form.save_options) {
          localStorage.setItem("form", JSON.stringify({ ...this.form }));
        } else {
          localStorage.removeItem("form");
        }

        this.form.env = `pendo-${this.form.env}`;

        this.store.updateEnv(this.form);

        this.$router.push("/dashboard");
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
        max-width: 1275px;

        .p-splitter {
          width: 90vw;
          max-width: 1275px;
        }

        .p-splitter-panel {
          padding: 12px;
          margin-left: 120px;

          .tooltip {
            position: absolute;
            top: 210px;
            left: 240px;
          }

          .p-float-label {
            margin: 36px 0;
          }

          .random_id_btn {
            margin: 12px auto;
          }

          .label__btn {
            margin-top: 36px;
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
        }

        .segment_div,
        .save_div {
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

        .save_div {
          margin: 12px auto;
        }

        .form_footer {
          display: flex;
          flex-direction: row;

          .submit_btn,
          .clear_btn {
            margin: auto;
            width: 200px;
          }

          .clear_btn {
            background: #f8818c;
            border: 1px solid #f8818c;
          }
        }
      }
    }
  }

  @media (max-width: 1070px) {
    .p-splitter-panel {
      margin-left: 48px !important;
    }
  }

  @media (max-width: 900px) {
    .p-splitter-panel {
      margin-left: 5% !important;
    }
  }
</style>
