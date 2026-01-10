export type ElInputSizeType = 'small' | 'large'

export interface ElInputProps {
  modelValue: string
  type?: string
  size?: ElInputSizeType
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
}

export interface ElInputEmits {
  (e: 'update:modelValue', value: string): void

  // 输入值变化就会触发
  (e: 'input', value: string): void
  // 输入值变化 且输入框失焦
  (e: 'change', value: string): void

  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void

  (e: 'clear'): void
}
