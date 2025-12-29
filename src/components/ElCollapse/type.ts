import type { InjectionKey, Ref } from "vue"

export type NameType = number | string

export interface ElCollapseProps {
  modelValue: NameType[]
  accordion?: boolean
}

export interface ElCollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface ElCollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}

export interface ElCollapseContext {
  activeNames: Ref<NameType[]>
  handleClickItem: (name: NameType) => void
}

export const collapseContextKey: InjectionKey<ElCollapseContext> = Symbol('collapseContextKey')
