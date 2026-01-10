import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import ElInput from './ElInput.vue'

describe('ElInput.vue', () => {
  test('basic', () => {
    const wrapper = mount(ElInput, {
      props: {
        modelValue: '',
        size: 'large',
        type: 'text',
        disabled: true,
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      },
    })

    expect(wrapper.classes()).toContain('el-input--large')
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-prefix')

    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    expect(wrapper.find('.el-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.el-input__prepend').text()).toBe('prepend')

    expect(wrapper.find('.el-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.el-input__prefix').text()).toBe('prefix')

    expect(wrapper.find('.el-input__subfix').exists()).toBeFalsy()
    expect(wrapper.find('.el-input__append').exists()).toBeFalsy()

    const textareaWrapper = mount(ElInput, {
      props: {
        modelValue: '',
        type: 'textarea',
        disabled: true,
      },
    })

    expect(textareaWrapper.find('textarea').exists()).toBeTruthy()
    expect(textareaWrapper.get('textarea').attributes('disabled')).toBeDefined()
  })

  test('v-model', async () => {
    const wrapper = mount(ElInput, {
      props: {
        modelValue: 'default',
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
      },
    })

    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input')
    expect(input.element.value).toBe('default')

    // 设置值
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvents = wrapper.emitted('input')
    const changeEvents = wrapper.emitted('change')
    expect(inputEvents![0]).toEqual(['update'])
    expect(changeEvents![0]).toEqual(['update'])

    // 异步更新
    await wrapper.setProps({ modelValue: 'async value' })
    expect(wrapper.props('modelValue')).toBe('async value')
    expect(input.element.value).toBe('async value')
  })

  test('clearable', async () => {
    const wrapper = mount(ElInput, {
      props: {
        modelValue: 'test',
        clearable: true,
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
      },
      global: {
        stubs: ['ElIcon'],
      },
    })

    expect(wrapper.find('.el-input__clear').exists()).toBeFalsy()
    const input = wrapper.get('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    expect(wrapper.find('.el-input__clear').exists()).toBeTruthy()
    expect(wrapper.get('.el-input__clear').attributes('icon')).toBe('circle-xmark')

    await wrapper.get('.el-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.props('modelValue')).toBe('')
    expect(wrapper.find('.el-input__clear').exists()).toBeFalsy()

    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvents = wrapper.emitted('input')
    const changeEvents = wrapper.emitted('change')
    expect(inputEvents![0]).toEqual([''])
    expect(changeEvents![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  test('password', async () => {
    const wrapper = mount(ElInput, {
      props: {
        modelValue: '',
        showPassword: true,
        'onUpdate:modelValue': e => wrapper.setProps({ modelValue: e }),
      },
      global: {
        stubs: ['ElIcon'],
      },
    })

    expect(wrapper.find('.el-input__password').exists()).toBeFalsy()

    const input = wrapper.get('input')
    await input.setValue('update')
    expect(wrapper.find('.el-input__password').exists()).toBeTruthy()
    expect(wrapper.get('.el-input__password').attributes('icon')).toBe('eye-slash')

    await wrapper.get('.el-input__password').trigger('click')
    expect(wrapper.get('.el-input__password').attributes('icon')).toBe('eye')
    expect(input.element.value).toBe('update')
  })
})
