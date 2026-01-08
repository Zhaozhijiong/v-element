import type { ComponentInternalInstance, Ref, VNode } from 'vue'
export type ElMessageTypeType = 'success' | 'danger' | 'warning' | 'info'
export type ElMessageTransitionType = 'fade-up'

export interface ElMessageProps {
  id: string
  content?: string | VNode
  duration?: number
  showClose?: boolean
  type?: ElMessageTypeType
  offset?: number
  zIndex: number
  transition?: ElMessageTransitionType
  onDestroy: () => void
}

export type ElMessageMethodProps = Omit<ElMessageProps, 'onDestroy' | 'id' | 'zIndex'>

export interface ElMessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: ElMessageProps
  destroy: () => void
}

export interface ElMEssageInstance {
  bottomOffset: Ref<number>
  visible: Ref<boolean>
}
