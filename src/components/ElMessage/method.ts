import { h, render, shallowReactive } from 'vue'
import ElMessageConstructor from './ElMessage.vue'
import type { ElMessageContext, ElMessageMethodProps, ElMessageProps } from './type'
import useZIndex from '@/hooks/useZIndex'

let seed = 1

// 在这里使用响应式变量是为了 数组变化后 驱动computed重新计算 并且更新视图
// 如果不是响应式变量的话 computed 不会重新计算
const instances = shallowReactive<ElMessageContext[]>([])
export function ElMessage(props: ElMessageMethodProps) {
  const { nextZIndex } = useZIndex()
  const id = `ElMessage-${seed++}`
  const container = document.createElement('div')

  function destroy() {
    // 删除实例数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx !== -1) {
      instances.splice(idx, 1)
    }
    render(null, container)
  }

  function manualDestroy() {
    const instance = instances.find(item => item.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const _props: ElMessageProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy,
  }
  const vnode = h(ElMessageConstructor, _props)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  const vm = vnode.component!
  const instance: ElMessageContext = {
    id,
    vnode,
    vm,
    props: _props,
    destroy: () => manualDestroy(),
  }
  instances.push(instance)
  return instance
}

export function getLastElMessageInstance() {
  const length = instances.length
  return length === 0 ? undefined : instances[length - 1]
}

export function getLastElMessageBottomOffset(id: string) {
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) {
    // 第一项
    return 0
  } else {
    const prev = instances[idx - 1]!
    return prev.vm.exposed!.bottomOffset.value
  }
}
