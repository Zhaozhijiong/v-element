import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import { describe, test, expect, vi, beforeAll } from 'vitest'
import ElCollapse from './ElCollapse.vue'
import ElCollapseItem from './ElCollapseItem.vue'

const onChange = vi.fn()

let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>,
  firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>

describe('ElCollapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(ElCollapse, {
      props: {
        modelValue: ['a'],
        onChange,
      },
      slots: {
        default: () => (
          <>
            <ElCollapseItem name="a" title="item a">
              <div>item a aaa aaa</div>
            </ElCollapseItem>
            <ElCollapseItem name="b" title="item b">
              <div>item b bbb bbb</div>
            </ElCollapseItem>
            <ElCollapseItem name="c" disabled>
              <div>item c ccc ccc</div>
            </ElCollapseItem>
          </>
        ),
      },
      global: {
        stubs: ['ElIcon'],
      },
      attachTo: document.body,
    })

    headers = wrapper.findAll('.el-collapse-item__header')
    contents = wrapper.findAll('.el-collapse-item__wrapper')

    firstHeader = headers[0]!
    secondHeader = headers[1]!
    disabledHeader = headers[2]!

    firstContent = contents[0]!
    secondContent = contents[1]!
    disabledContent = contents[2]!
  })
  test('basic', async () => {
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    expect(firstHeader?.text()).toBe('item a')
    expect(secondHeader?.text()).toBe('item b')

    expect(firstContent?.text()).toBe('item a aaa aaa')
    expect(secondContent?.text()).toBe('item b bbb bbb')

    expect(firstContent?.isVisible()).toBeTruthy()
    expect(secondContent?.isVisible()).toBeFalsy()
  })

  test('click', async () => {
    await firstHeader?.trigger('click')
    expect(firstContent?.isVisible()).toBeFalsy()
    await secondHeader?.trigger('click')
    expect(secondContent?.isVisible()).toBeTruthy()
  })

  test('emit', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })

  test('disabled', async () => {
    onChange.mockClear()
    expect(disabledHeader?.classes()).toContain('is-disabled')
    expect(disabledContent?.isVisible()).toBeFalsy()
    await disabledHeader?.trigger('click')
    expect(disabledContent?.isVisible()).toBeFalsy()
  })
})
