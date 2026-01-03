<template>
  <div class="el-collapse-item">
    <div class="el-collapse-item__header" :class="{
      'is-disabled': disabled,
      'is-active': isActive
    }" :id="`item-header-${name}`" @click="handelClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="el-collapse-item-wrapper" v-show="isActive">
        <div class="el-collapse-item__content" :id="`item-header-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { collapseContextKey, type ElCollapseItemProps } from './type';

defineOptions({
  name: 'ElCollapseItem'
})

const ctx = inject(collapseContextKey)

const props = defineProps<ElCollapseItemProps>()

const isActive = computed(() => ctx?.activeNames.value.includes(props.name))

function handelClick() {
  if (props.disabled) {
    return
  }

  ctx?.handleClickItem(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },

  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },

  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },

  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },

  leave(el) {
    el.style.height = '0px'
  },

  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  }
}
</script>

<style scoped></style>
