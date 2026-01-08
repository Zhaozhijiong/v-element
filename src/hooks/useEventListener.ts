import { isRef, onBeforeUnmount, onMounted, unref, watch, type Ref } from 'vue'

export function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => unknown
) {
  if (isRef(target)) {
    onMounted(() => {
      watch(target, (newValue, oldValue) => {
        oldValue?.removeEventListener(event, handler)
        newValue?.addEventListener(event, handler)
      })
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

export default useEventListener
