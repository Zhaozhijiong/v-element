<template>
  <div ref="popperContentNode" class="el-tooltip">
    <div class="el-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <Transition :name="transition" v-on="transitionEvents">
      <div v-show="isOpen" class="el-tooltip__popper" ref="popperNode" @mouseenter="openFinal" @mouseleave="closeFinal">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { ElTooltipEmits, ElTooltipInstance, ElTooltipProps } from './type';
import { createPopper, type Instance } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickoutSide';
import { debounce } from 'lodash-es';

defineOptions({
  name: 'ElTooltip'
})

const props = withDefaults(defineProps<ElTooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    }],
    ...props.options
  }
})

const emit = defineEmits<ElTooltipEmits>()

const isOpen = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContentNode = ref<HTMLElement>()
let popperInstance: Instance | null = null

const events = reactive<Record<string, unknown>>({})
const outEvents = reactive<Record<string, unknown>>({})
function open() {
  isOpen.value = true
  emit('visible-change', isOpen.value)
}
function close() {
  isOpen.value = false
  emit('visible-change', isOpen.value)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

function openFinal() {
  closeDebounce.cancel()
  openDebounce()
}
function closeFinal() {
  openDebounce.cancel()
  closeDebounce()
}
function togglePopper() {
  isOpen.value = !isOpen.value
  emit('visible-change', isOpen.value)
}
function attachEvents() {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    events['mouseleave'] = closeFinal
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}
useClickOutside(popperContentNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})
// 监听属性变化
watch(() => props.trigger, (oldValue, newValue) => {
  if (oldValue !== newValue) {
    events.value = {}
    outEvents.value = {}
    attachEvents()
  }
})
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events.value = {}
    outEvents.value = {}
  } else {
    attachEvents()
  }
})
watch(isOpen, async (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value,
        popperNode.value,
        popperOptions.value)
    }
  }
}, {
  flush: 'post'
})

// 解决动画期间隐藏元素导致的布局偏差
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  afterLeave() {
    popperInstance?.destroy()
  }
}

defineExpose<ElTooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>

<style scoped></style>
