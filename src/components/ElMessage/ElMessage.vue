<template>
  <Transition :name="props.transition" @enter="updateHeight" @after-leave="destoryComponent">
    <div ref="elMessageRef" v-show="visible" class="el-message" :class="{
      [`el-message--${type}`]: type,
      'is-close': showClose,
    }" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer" role="alert">
      <div class="el-message__content" v-if="content">
        {{ `${lastBottomOffset} - ${topOffset} - ${offset} - ${height}` }}
        <slot>{{ content }}</slot>
      </div>
      <div class="el-message__close" v-if="showClose">
        <ElIcon icon="xmark" @click.stop="close"></ElIcon>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ElIcon from '../ElIcon/ElIcon.vue';
import type { ElMEssageInstance, ElMessageProps } from './type';
import { getLastElMessageBottomOffset } from './method';
import useEventListener from '@/hooks/useEventListener';

defineOptions({
  name: 'ElMessage'
})

const props = withDefaults(defineProps<ElMessageProps>(), {
  type: 'info',
  duration: 3000,
  showClose: false,
  offset: 20,
  zIndex: 2000,
  transition: 'fade-up'
})

const elMessageRef = ref<HTMLDivElement>()

const visible = ref(false)
// 当前message实例的高度
const height = ref(0)
// 上一个message实例的bottomOffset
const lastBottomOffset = computed(() => getLastElMessageBottomOffset(props.id))
// 当前message实例的顶部偏移量
const topOffset = computed(() => lastBottomOffset.value + props.offset)
// 为下一个message实例预留的bottomOffset
const bottomOffset = computed(() => topOffset.value + height.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

function close() {
  visible.value = false
}
let timer: number;
function startTimer() {
  if (props.duration <= 0) {
    return
  }

  timer = setTimeout(() => {
    close()
  }, props.duration)
}

function clearTimer() {
  clearTimeout(timer)
}
function destoryComponent() {
  props.onDestroy()
}

function updateHeight() {
  height.value = elMessageRef.value!.getBoundingClientRect().height
}

onMounted(async () => {
  visible.value = true
  startTimer()
})

function keydown(e: Event) {
  const event = e as KeyboardEvent
  console.log(e)
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)

defineExpose<ElMEssageInstance>({
  bottomOffset,
  visible
})
</script>

<style scoped></style>
