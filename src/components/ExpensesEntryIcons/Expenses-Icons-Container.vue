<template>
  <Avatar
    v-for="(icon, index) in icons"
    :key="index"
    :image="icon"
    class="ml-4 my-2 cursor-pointer"
    size="normal"
    shape="circle"
    :pt="{
      root: { class: 'p-1' },
      image: { class: 'w-full h-full' }
    }"
    @click="handleSelectIcon(icon)"
  />
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onBeforeMount } from 'vue'
import { extractIconsSrc } from '@/utils/utils'
import Avatar from 'primevue/avatar'

const emit = defineEmits(['iconSelect'])

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

const iconsList = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10]
const icons: Ref<string[]> = ref([])

onBeforeMount(async () => {
  const iconsSrcList: any = await extractIconsSrc(iconsList)
  const list: string[] = []
  iconsSrcList.forEach((src: any) => list.push(src.default))
  icons.value = list
})

async function handleSelectIcon(iconURL: string) {
  const splitURL: string[] = iconURL.split('/')
  let filename: string | string[] = splitURL[splitURL.length - 1]
  filename = filename.split('.')
  filename = filename[0]

  emit('iconSelect', filename)
}
</script>

<style scoped lang="scss">
.p-avatar {
  background-color: rgba(255, 255, 255, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    transition: 0.3s ease-in-out all;
  }
}
</style>
