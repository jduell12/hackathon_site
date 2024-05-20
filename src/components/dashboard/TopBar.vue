<template>
  <Menu class="top-bar__menu" :model="menu">
    <template #item="{ item, props }">
      <a class="p-menu-item-link" v-bind="props.action">
        <span
          v-if="item.icon.includes('pi-envelope')"
          v-badge.success
          :class="item.icon"
        />
        <span v-else @click="handleSidebarClose" :class="item.icon" />
      </a>
    </template>
    <template #end>
      <div class="avatarMenu" @click="toggle">
        <Avatar image="/avatar.png" shape="circle" />
        <i class="pi pi-angle-down" />
        <Menu ref="openMenu" :popup="true" :model="avatarMenu" />
      </div>
    </template>
  </Menu>
</template>

<script>
  import { useSideBarStore } from "@/stores/sideBar";
  import Avatar from "primevue/avatar";
  import Menu from "primevue/menu";
  import { PrimeIcons } from "primevue/api";

  export default {
    name: "TopBar",
    components: {
      Avatar,
      Menu,
    },
    setup() {
      const store = useSideBarStore();
      return { store };
    },
    data() {
      return {
        menu: [
          {
            icon: PrimeIcons.ALIGN_JUSTIFY,
          },
          {
            icon: PrimeIcons.ENVELOPE,
          },
        ],
        avatarMenu: [
          { label: "Profile", disabled: true },
          { label: "Settings", disabled: true },
          { label: "Help", disabled: true },
          { label: "Log Out", url: "/" },
        ],
      };
    },
    methods: {
      handleSidebarClose(event) {
        if (event?.target?.className.includes("pi-align-justify")) {
          this.store.toggleBar();
        }
      },
      toggle(event) {
        this.$refs.openMenu.toggle(event);
      },
    },
  };
</script>

<style lang="less">
  .top-bar__menu {
    display: flex;
    align-items: center;

    .p-menu-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }

  .avatarMenu {
    display: flex;
    align-items: center;
  }
</style>
