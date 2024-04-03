<template>
  <div
    class="expenses-item w-full h-6rem shadow-1 my-1 border-round-sm p-2 text-color"
    :class="currentlyVisited && 'visited'"
  >
    <div>
      <div class="title text-lg font-semibold">{{ title }}</div>
      <div class="text-sm font-italic">{{ date }}</div>
    </div>

    <div class="mt-3 flex align-items-center justify-content-between">
      <div class="total-expenses text-sm">
        <span class="font-semibold">{{ amount === '' ? '-' : amount }}</span>
        <span class="ml-2">RON</span>
      </div>
      <div>
        <span>items:</span>
        <span class="font-semibold ml-2 text-sm">{{ expensesCount }}</span>
      </div>
    </div>

    <div class="icon">
      <SelectedIcon :selectedIcon="entryIcon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SelectedIcon from '@/components/ExpensesEntryIcons/Selected-Icon.vue'

const props = defineProps({
  id: { type: String, default: '', required: true },
  title: { type: String, default: '', required: true },
  entryIcon: { type: String, default: '', required: true },
  date: { type: String, default: '', required: true },
  amount: { type: String, default: '', required: true },
  expensesCount: { type: Number, default: 0, required: true }
})

const route = useRoute()

const currentlyVisited: ComputedRef<boolean> = computed(() => route.path.includes(props.id))
</script>

<style scoped lang="scss">
.expenses-item {
  cursor: pointer;
  position: relative;
  transition: 0.2s ease-in-out all;
  &:hover {
    background-color: #d9ede8 !important;
    transition: 0.3s ease-in-out all;
  }
  &:active {
    transform: translateY(2px);
  }

  .icon {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.visited {
  background-color: #d9ede8 !important;
}

:deep(.p-avatar) {
  height: 2.5rem;
  width: 2.5rem;
}
</style>
