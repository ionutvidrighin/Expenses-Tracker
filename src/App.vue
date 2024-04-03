<template>
  <div class="app-wrapper w-full h-full p-3 bg-primary-reverse">
    <div class="flex w-full h-full">
      <SidebarMenu />
      <div class="right">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from '@/components/Sidebar-Menu.vue'
import { useRouter } from 'vue-router'
</script>

<style scoped lang="scss">
.app-wrapper {
  background-color: rgb(197, 197, 197) !important;
  .right {
    width: calc(100% - 300px);
    height: 100%;
    background-color: rgb(238, 238, 238);
    border-radius: 0 10px 10px 0;
    box-shadow: -8px 0px 7px -5px rgba(163, 163, 163, 0.61);
    -webkit-box-shadow: -8px 0px 7px -5px rgba(163, 163, 163, 0.61);
    -moz-box-shadow: -8px 0px 7px -5px rgba(163, 163, 163, 0.61);
  }
}
</style>
