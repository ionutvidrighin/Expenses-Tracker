<template>
  <div>
    <img class="w-3rem h-3rem" :src="iconSource" alt="test" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted, onUpdated } from 'vue'
import { extractIconsSrc } from '@/utils/utils'

const props = defineProps({
  icon: { type: String, default: '' }
})

const groceries = import('@/assets/main-icons/groceries.png')
const shopping = import('@/assets/main-icons/shopping.png')
const onlineShopping = import('@/assets/main-icons/online-shopping.png')
const restaurants = import('@/assets/main-icons/restaurants.png')
const gym = import('@/assets/main-icons/gym.png')
const phone = import('@/assets/main-icons/phone.png')
const netflix = import('@/assets/main-icons/netflix.png')
const google = import('@/assets/main-icons/google.png')
const wifi = import('@/assets/main-icons/wifi.png')
const invoice = import('@/assets/main-icons/invoice.png')
const gasPump = import('@/assets/main-icons/gas-pump.png')
const carService = import('@/assets/main-icons/car-service.png')
const carParking = import('@/assets/main-icons/car-parking.png')
const carWash = import('@/assets/main-icons/car-wash.png')
const holiday = import('@/assets/main-icons/holiday.png')
const freeTime = import('@/assets/main-icons/free-time.png')
const other = import('@/assets/main-icons/other.png')

const iconSource: Ref<string> = ref('')
const removeBackground: Ref<boolean> = ref(false)

const displayIcon = async () => {
  if (props.icon !== '') {
    removeBackground.value = true
  }
  let source: any
  switch (props.icon) {
    case 'groceries':
      source = await extractIconsSrc(groceries)
      iconSource.value = source.default
      break
    case 'shopping':
      source = await extractIconsSrc(shopping)
      iconSource.value = source.default
      break
    case 'online-shopping':
      source = await extractIconsSrc(onlineShopping)
      iconSource.value = source.default
      break
    case 'restaurants':
      source = await extractIconsSrc(restaurants)
      iconSource.value = source.default
      break
    case 'gym':
      source = await extractIconsSrc(gym)
      iconSource.value = source.default
      break
    case 'phone':
      source = await extractIconsSrc(phone)
      iconSource.value = source.default
      break
    case 'netflix':
      source = await extractIconsSrc(netflix)
      iconSource.value = source.default
      break
    case 'google':
      source = await extractIconsSrc(google)
      iconSource.value = source.default
      break
    case 'wifi':
      source = await extractIconsSrc(wifi)
      iconSource.value = source.default
      break
    case 'invoice':
      source = await extractIconsSrc(invoice)
      iconSource.value = source.default
      break
    case 'gas-pump':
      source = await extractIconsSrc(gasPump)
      iconSource.value = source.default
      break
    case 'car-service':
      source = await extractIconsSrc(carService)
      iconSource.value = source.default
      break
    case 'car-parking':
      source = await extractIconsSrc(carParking)
      iconSource.value = source.default
      break
    case 'car-wash':
      source = await extractIconsSrc(carWash)
      iconSource.value = source.default
      break
    case 'holiday':
      source = await extractIconsSrc(holiday)
      iconSource.value = source.default
      break
    case 'free-time':
      source = await extractIconsSrc(freeTime)
      iconSource.value = source.default
      break
    case 'other':
      source = await extractIconsSrc(other)
      iconSource.value = source.default
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
