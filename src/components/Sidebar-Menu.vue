<template>
  <div class="sidebar-menu p-2">
    <div class="entries mb-5 px-2 w-full">
      <ExpensesItem
        v-for="(entry, index) in weeklyExpensesStore.list"
        :key="index"
        :id="entry.id"
        :title="entry.title"
        :entryIcon="entry.icon"
        :date="entry.stringDate"
        :amount="entry.expensesAmount"
        :expensesCount="entry.expensesCount"
        @click="navigate(entry.id)"
      />
    </div>

    <div class="add-new-entry w-full">
      <Button
        @click="openDialog = true"
        class="ml-4 bg-teal-200 text-color font-semibold"
        label="Add weekly expenses"
        icon="pi pi-plus-circle"
        :pt="{
          root: { class: 'px-3 py-1' },
          icon: { class: 'mr-2' }
        }"
      />
    </div>

    <AddNewEntryDialog v-if="openDialog" @close-dialog="openDialog = false" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useWeeklyExpenses } from '@/stores/weekly-expenses-store'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ExpensesItem from './Expenses-Item.vue'
import AddNewEntryDialog from '@/components/Dialogs/AddNewEntry-Dialog.vue'

const weeklyExpensesStore = useWeeklyExpenses()
const router = useRouter()

const navigate = (id: string | number) => {
  router.push({
    path: `/expenses-entry/${id}`
  })
}

const openDialog: Ref<boolean> = ref(false)
</script>

<style scoped lang="scss">
.sidebar-menu {
  width: 300px;
  height: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .entries {
    overflow-y: auto;
    /* width */
    &::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: rgb(201, 201, 201);
      border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #d8d8d8;
    }
  }
}

.p-button {
  border: none !important;
  &:active {
    transform: translateY(2px);
  }
}
</style>
