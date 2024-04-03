import { createPinia } from 'pinia'

const persistPiniaStore = createPinia()

persistPiniaStore.use((context) => {
  const storeId = context.store.$id

  const serializer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }

  // sync store with localStorage
  const sessionStorageData = serializer.deserialize(window.sessionStorage.getItem(storeId)!)
  if (sessionStorageData) {
    context.store.$patch(sessionStorageData)
  }

  context.store.$subscribe((mutation, state) => {
    window.sessionStorage.setItem(storeId, serializer.serialize(state))
  })
})

export default persistPiniaStore
