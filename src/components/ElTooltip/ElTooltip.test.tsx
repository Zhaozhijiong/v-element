import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import { describe, test, expect, beforeAll, vi } from 'vitest'
import ElTooltip from './ElTooltip.vue'

let clickWrapper: VueWrapper
let clickTriggerNode: DOMWrapper<Element>, clickPopperNode: DOMWrapper<Element>
let outsideNode: DOMWrapper<Element>

const onVisibleChange = vi.fn()
vi.useFakeTimers()

describe('ElTooltip.vue', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    clickWrapper = mount(ElTooltip, {
      props: {
        trigger: 'click',
        content: 'popper content',
        'onVisible-change': onVisibleChange,
      },
      slots: {
        default: () => (
          <>
            <div id="outside">
              <button id="trigger">ElTooltip</button>
            </div>
          </>
        ),
      },
      attachTo: document.body,
    })
    clickTriggerNode = clickWrapper.find('#trigger')
    clickPopperNode = clickWrapper.find('.el-tooltip__popper')

    outsideNode = clickWrapper.find('#outside')
  })

  test('basic', () => {
    expect(clickTriggerNode.exists()).toBeTruthy()
    expect(clickPopperNode.isVisible()).toBeFalsy()
  })

  test('click', async () => {
    await clickTriggerNode.trigger('click')
    await vi.runAllTimers()
    expect(clickPopperNode.isVisible()).toBeTruthy()
    await clickTriggerNode.trigger('click')
    await vi.runAllTimers()
    expect(clickPopperNode.isVisible()).toBeFalsy()
  })

  test('emit', async () => {
    expect(onVisibleChange).toHaveBeenCalledTimes(2)
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })

  test('click outside', async () => {
    await clickTriggerNode.trigger('click')
    await vi.runAllTimers()
    expect(clickPopperNode.isVisible()).toBeTruthy()
    await outsideNode.trigger('click')
    await vi.runAllTimers()
    expect(clickPopperNode.isVisible()).toBeFalsy()
  })
})
