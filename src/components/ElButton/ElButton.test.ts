import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElButton from './ElButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElIcon from '../ElIcon/ElIcon.vue'

describe('ElButton.vue', () => {
  test('basic button', () => {
    const wrapper = mount(ElButton, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'primary',
      },
    })

    expect(wrapper.classes()).toContain('el-button--primary')
    const button = wrapper.get('button')
    expect(button.text()).toBe('primary')
    button.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled button', () => {
    const wrapper = mount(ElButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')

    const button = wrapper.get('button')
    button.trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon button', () => {
    const wrapper = mount(ElButton, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })
    const findComponent = wrapper.findComponent(FontAwesomeIcon)
    expect(findComponent.exists()).toBeTruthy()
    expect(findComponent.attributes('icon')).toBe('arrow-up')
  })

  test('loading button', () => {
    const wrapper = mount(ElButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading',
      },
      global: {
        stubs: ['ElIcon'],
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')

    const findComponent = wrapper.findComponent(ElIcon)
    expect(findComponent.exists()).toBeTruthy()

    expect(findComponent.attributes('icon')).toBeDefined()
    expect(findComponent.attributes('spin')).toBeDefined()

    expect(findComponent.attributes('icon')).toBe('spinner')
  })
})
