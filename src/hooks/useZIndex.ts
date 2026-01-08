import { computed, ref } from 'vue'

const zIndex = ref(1)

function useZIndex(initial = 2000) {
  const initialValue = ref(initial)
  const currentZIndex = computed(() => initialValue.value + zIndex.value)
  function nextZIndex() {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialValue,
    currentZIndex,
    nextZIndex,
  }
}

export default useZIndex
