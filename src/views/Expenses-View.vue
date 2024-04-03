<template>
  <div class="expenses-view bg-teal-100 w-full p-3">
    <section class="total-expenses w-full">
      <p class="m-0 text-900 text-5xl font-semibold text-center">4.520,00 RON</p>
    </section>

    <div class="under-line w-full h-1rem center">
      <div class="bg-blue-500"></div>
    </div>

    <section class="add-new-expense w-full mt-5 center">
      <Button
        raised
        label="Add new expense"
        severity="contrast"
        class="w-5 h-2rem"
        icon="pi pi-plus"
      />
    </section>

    <div class="divider w-full mt-5">
      <div class="w-full bg-gray-200"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import Button from 'primevue/button'
import dayjs from 'dayjs'

const date = ref()
const disabledInput: Ref<boolean> = ref(false)
</script>

<style scoped lang="scss">
.expenses-view {
  border-radius: 0 10px 10px 0;
  height: 100%;

  .under-line {
    div {
      width: 100px;
      height: 4px;
      border-radius: 5px;
    }
  }
}

:deep(.p-button) {
  background-color: black !important;
  border: none;
}
</style>
