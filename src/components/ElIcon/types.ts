import type { FontAwesomeIconProps } from '@fortawesome/vue-fontawesome'

export type ElIconType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface ElIconProps extends FontAwesomeIconProps {
  type?: ElIconType
  color?: string
}
