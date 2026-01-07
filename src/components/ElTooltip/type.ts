import type { Options, Placement } from '@popperjs/core'

export type TriggerType = 'click' | 'hover'
export type TransitionType = 'fade'

export interface ElTooltipProps {
  content?: string
  trigger?: TriggerType
  placement?: Placement
  manual?: boolean
  options?: Partial<Options>
  transition?: TransitionType
  openDelay?: number
  closeDelay?: number
}

export interface ElTooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface ElTooltipInstance {
  show: () => void
  hide: () => void
}
