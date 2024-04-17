<template>
  <div class="selected-icon border-round-xs w-full h-3rem">
    <div class="w-3">
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
import { ref, onMounted } from 'vue'
import { extractIconsSrc } from '@/utils/utils'
import Avatar from 'primevue/avatar'

const props = defineProps({
  selectedIcon: { type: String, default: '' }
})

const icons: any = {
  groceries: import('@/assets/main-icons/groceries.png'),
  shopping: import('@/assets/main-icons/shopping.png'),
  onlineShopping: import('@/assets/main-icons/online-shopping.png'),
  restaurants: import('@/assets/main-icons/restaurants.png'),
  gym: import('@/assets/main-icons/gym.png'),
  phone: import('@/assets/main-icons/phone.png'),
  netflix: import('@/assets/main-icons/netflix.png'),
  google: import('@/assets/main-icons/google.png'),
  wifi: import('@/assets/main-icons/wifi.png'),
  invoice: import('@/assets/main-icons/invoice.png'),
  gasPump: import('@/assets/main-icons/gas-pump.png'),
  carService: import('@/assets/main-icons/car-service.png'),
  carParking: import('@/assets/main-icons/car-parking.png'),
  carWash: import('@/assets/main-icons/car-parking.png'),
  holiday: import('@/assets/main-icons/holiday.png'),
  freeTime: import('@/assets/main-icons/free-time.png'),
  other: import('@/assets/main-icons/other.png')
}

const icon: Ref<string> = ref('')

const displayIcon = async () => {
  if (props.selectedIcon !== '') {
    const iconSrc = await extractIconsSrc(icons[props.selectedIcon])
    icon.value = iconSrc.default
  }
}

onMounted(() => {
  displayIcon()
})
</script>

<style scoped lang="scss">
.selected-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
