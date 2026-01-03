export type ElButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ElButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ELButtonProps {
  type?: ElButtonType
  size?: ElButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string
  nativeType?: NativeType
  autoFocus?: boolean
}

export interface ElButtonInstance {
  ref: HTMLButtonElement
}
