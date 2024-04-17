<template>
  <div
    class="selected-icon border-round-xs w-full h-3rem"
    :class="removeBackground && 'no-background'"
  >
    <div class="w-3 ml-3">
      <Avatar
        :image="icon"
        size="large"
        shape="circle"
        :pt="{
          root: { class: 'p-1' },
          image: { class: 'w-full h-full' }
        }"
      />
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted, onUpdated } from 'vue'
import { extractIconsSrc } from '@/utils/utils'
import Avatar from 'primevue/avatar'

const props = defineProps({
  selectedIcon: { type: String, default: '' }
})

const icons: any = {
  icon1: import('@/assets/entry-icons/icon1.png'),
  icon2: import('@/assets/entry-icons/icon2.png'),
  icon3: import('@/assets/entry-icons/icon3.png'),
  icon4: import('@/assets/entry-icons/icon4.png'),
  icon5: import('@/assets/entry-icons/icon5.png'),
  icon6: import('@/assets/entry-icons/icon6.png'),
  icon7: import('@/assets/entry-icons/icon7.png'),
  icon8: import('@/assets/entry-icons/icon8.png'),
  icon9: import('@/assets/entry-icons/icon9.png'),
  icon10: import('@/assets/entry-icons/icon10.png')
}

const icon: Ref<string> = ref('')
const removeBackground: Ref<boolean> = ref(false)

const displayIcon = async () => {
  if (props.selectedIcon !== '') {
    removeBackground.value = true
  }

  const iconSrc = await extractIconsSrc(icons[props.selectedIcon])
  icon.value = iconSrc.default
}

onMounted(() => {
  displayIcon()
})

onUpdated(() => {
  displayIcon()
})
</script>

<style scoped lang="scss">
.selected-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.1);
}

.no-background {
  background-color: transparent !important;
}
</style>
