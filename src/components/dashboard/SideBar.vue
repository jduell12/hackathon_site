<template>
  <Panel class="sidebar" v-if="sideBarOpen">
    <h3>Pendo.io Test Site</h3>
    <div class="sidebar__welcome">
      <Avatar image="/avatar.png" shape="circle" />
      <p>Welcome {{ placeholderName }}</p>
    </div>
    <Panel class="sidebar__panel">
      <PanelMenu :model="menu" />
    </Panel>
  </Panel>
  <div class="sidebar-closed" v-else>
    <Avatar image="/avatar.png" shape="circle" />
    <Panel class="sidebar-closed__panel">
      <MenuBar :model="closedMenu">
        <template #item="{ item, props }">
          <a class="p-emnu-item-link" v-bind="props.action">
            <span class="pi-menuitem-icon" :class="item.icon" />
            <i v-if="item.items" class="pi pi-angle-right" />
            <span class="">{{ item.label }}</span>
          </a>
        </template>
      </MenuBar>
    </Panel>
  </div>
</template>

<script>
  import { useSideBarStore } from "@/stores/sideBar";
  import Avatar from "primevue/avatar";
  import MenuBar from "primevue/menubar";
  import Panel from "primevue/panel";
  import PanelMenu from "primevue/panelmenu";
  import { PrimeIcons } from "primevue/api";

  export default {
    name: "SideBar",
    components: {
      Avatar,
      MenuBar,
      Panel,
      PanelMenu,
    },
    setup() {
      const store = useSideBarStore();
      return { store };
    },
    data() {
      return {
        menu: [
          {
            label: "Home",
            icon: PrimeIcons.HOME,
            items: [
              {
                label: "Dashboard",
              },
              {
                label: "Dashboard2",
              },
              {
                label: "Dashboard3",
              },
            ],
          },
          {
            label: "Forms",
            icon: PrimeIcons.PENCIL,
            items: [
              {
                label: "General Form",
              },
              {
                label: "Advanced Components",
              },
              {
                label: "Form Validation",
              },
              {
                label: "Form Wizard",
              },
              {
                label: "Form Upload",
              },
              {
                label: "Form Buttons",
              },
            ],
          },
          {
            label: "UI Elements",
            icon: PrimeIcons.DESKTOP,
            items: [
              {
                label: "Media Gallery",
              },
              {
                label: "Typography",
              },
              {
                label: "Icons",
              },
              {
                label: "Glyphicons",
              },
              {
                label: "Widgets",
              },
            ],
          },
          {
            label: "Tables",
            icon: PrimeIcons.TABLE,
          },
          {
            label: "Data",
            icon: PrimeIcons.CHART_BAR,
            items: [
              {
                label: "Chart JS",
              },
              {
                label: "High Charts",
              },
              {
                label: "ECharts",
              },
              {
                label: "Other",
              },
            ],
          },
          {
            label: "Additional Pages",
            icon: PrimeIcons.FILE,
            items: [
              {
                label: "E-commerce",
              },
              {
                label: "Projects",
              },
              {
                label: "Project Detail",
              },
            ],
          },
          {
            label: "Extras",
            icon: PrimeIcons.GIFT,
          },
          {
            label: "Help",
            icon: PrimeIcons.QUESTION_CIRCLE,
          },
          {
            label: "Log Out",
            icon: PrimeIcons.SIGN_OUT,
            url: "/",
          },
        ],
        closedMenu: [
          {
            icon: PrimeIcons.HOME,
            items: [
              {
                label: "Dashboard",
              },
              {
                label: "Dashboard2",
              },
              {
                label: "Dashboard3",
              },
            ],
          },
          {
            icon: PrimeIcons.PENCIL,
            items: [
              {
                label: "General Form",
              },
              {
                label: "Form Validation",
              },
              {
                label: "Form Wizard",
              },
              {
                label: "Form Upload",
              },
              {
                label: "Form Buttons",
              },
            ],
          },
          {
            icon: PrimeIcons.DESKTOP,
            items: [
              {
                label: "Media Gallery",
              },
              {
                label: "Typography",
              },
              {
                label: "Icons",
              },
              {
                label: "Glyphicons",
              },
              {
                label: "Widgets",
              },
            ],
          },
          {
            icon: PrimeIcons.TABLE,
          },
          {
            icon: PrimeIcons.CHART_BAR,
            items: [
              {
                label: "Chart JS",
              },
              {
                label: "High Charts",
              },
              {
                label: "ECharts",
              },
              {
                label: "Other",
              },
            ],
          },
          {
            icon: PrimeIcons.FILE,
            items: [
              {
                label: "E-commerce",
              },
              {
                label: "Projects",
              },
              {
                label: "Project Detail",
              },
            ],
          },
          {
            icon: PrimeIcons.GIFT,
          },
          {
            icon: PrimeIcons.QUESTION_CIRCLE,
          },
          {
            icon: PrimeIcons.SIGN_OUT,
            command: () => {
              this.$router.push("/");
            },
          },
        ],
      };
    },
    computed: {
      placeholderName() {
        return this.getRandomPlaceholderName();
      },
      sideBarOpen() {
        return this.store.sideBarOpen;
      },
    },
    methods: {
      getRandomPlaceholderName() {
        const names = [
          "Fulan AlFulani",
          "Jane Doe",
          "John Doe",
          "Chan Tai Man",
          "Chan Siu Ming",
          "Ivan Horvat",
          "Jan Jansen",
          "Madame Michu",
          "Max Mustermann",
          "Erika Mustermann",
          "Ola Nordmann",
          "Kari Nordmann",
          "Jan Kowalski",
          "Anna Kowalska",
          "Juan Perez",
          "Maria Perez",
          "Nomen Nescio",
        ];

        return names[Math.floor(Math.random() * names.length)];
      },
      toggle(event) {
        this.$refs.openMenu.toggle(event);
      },
    },
  };
</script>
<style lang="less">
  .p-panel-header {
    display: none;
  }

  .sidebar {
    background-color: #818cf8;
    text-align: center;
    border: none;
    border-radius: 0;
    width: 300px;
    height: 150vh;
    padding: 0;
    position: fixed;
    top: 0px;

    &__welcome {
      display: flex;
      flex-direction: column;
      align-items: center;

      .p-avatar {
        width: 40%;
        height: 80px;
      }
    }

    &__panel {
      background-color: #1a181b;

      .p-panel-content {
        padding: 0 12px;
      }

      .p-icon,
      .p-submenu-icon {
        order: 1;
        margin-left: 6px;
      }

      .p-menuitem-text {
        font-size: 1rem;
      }
    }

    .p-panelmenu-panel {
      background-color: #1a181b;
      border: none;
    }
  }

  .sidebar-closed {
    background-color: #818cf8;
    text-align: center;
    border: none;
    border-radius: 0;
    width: 100px;
    height: 150vh;
    padding-top: 24px;
    position: fixed;
    top: 0px;

    .p-avatar {
      width: 70%;
      height: 80px;
    }

    &__panel {
      margin: 0 12px;

      .p-toggable-content {
        display: flex;
        justify-content: center;
      }

      i {
        margin-left: 6px;
      }

      .p-menubar {
        background-color: #1a181b;
        border: none;
        display: flex;
        padding: 12px 0;
      }

      .p-submenu-list {
        margin-left: 36px;
      }
    }
  }
</style>
