import { onMounted, onUnmounted, type Ref } from 'vue'

function useClickOutside(node: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) {
  function handle(e: MouseEvent) {
    if (node.value && e.target) {
      if (!node.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handle)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handle)
  })
}

export default useClickOutside
