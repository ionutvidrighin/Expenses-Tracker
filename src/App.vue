<template>
  <div class="app-wrapper w-full h-full p-3 bg-primary-reverse">
    <div class="flex w-full h-full">
      <SidebarMenu />
      <div class="expenses-content">
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
  .expenses-content {
    width: calc(100% - 300px);
    height: 100%;
    background-color: rgb(238, 238, 238);
    border-radius: 0 10px 10px 0;
    box-shadow: -2px 0px 5px 0px rgba(194, 194, 194, 0.75);
    -webkit-box-shadow: -2px 0px 5px 0px rgba(194, 194, 194, 0.75);
    -moz-box-shadow: -2px 0px 5px 0px rgba(194, 194, 194, 0.75);
  }
}
</style>
