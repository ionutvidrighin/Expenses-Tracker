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

const icon1 = import('@/assets/entry-icons/icon1.png')
const icon2 = import('@/assets/entry-icons/icon2.png')
const icon3 = import('@/assets/entry-icons/icon3.png')
const icon4 = import('@/assets/entry-icons/icon4.png')
const icon5 = import('@/assets/entry-icons/icon5.png')
const icon6 = import('@/assets/entry-icons/icon6.png')
const icon7 = import('@/assets/entry-icons/icon7.png')
const icon8 = import('@/assets/entry-icons/icon8.png')
const icon9 = import('@/assets/entry-icons/icon9.png')
const icon10 = import('@/assets/entry-icons/icon10.png')

const icon: Ref<string> = ref('')
const removeBackground: Ref<boolean> = ref(false)

const displayIcon = async () => {
  if (props.selectedIcon !== '') {
    removeBackground.value = true
  }
  let iconSrc: any
  switch (props.selectedIcon) {
    case 'icon1':
      iconSrc = await extractIconsSrc(icon1)
      icon.value = iconSrc.default
      break
    case 'icon2':
      iconSrc = await extractIconsSrc(icon2)
      icon.value = iconSrc.default
      break
    case 'icon3':
      iconSrc = await extractIconsSrc(icon3)
      icon.value = iconSrc.default
      break
    case 'icon4':
      iconSrc = await extractIconsSrc(icon4)
      icon.value = iconSrc.default
      break
    case 'icon5':
      iconSrc = await extractIconsSrc(icon5)
      icon.value = iconSrc.default
      break
    case 'icon6':
      iconSrc = await extractIconsSrc(icon6)
      icon.value = iconSrc.default
      break
    case 'icon7':
      iconSrc = await extractIconsSrc(icon7)
      icon.value = iconSrc.default
      break
    case 'icon8':
      iconSrc = await extractIconsSrc(icon8)
      icon.value = iconSrc.default
      break
    case 'icon9':
      iconSrc = await extractIconsSrc(icon9)
      icon.value = iconSrc.default
      break
    case 'icon10':
      iconSrc = await extractIconsSrc(icon10)
      icon.value = iconSrc.default
      break
  }
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
