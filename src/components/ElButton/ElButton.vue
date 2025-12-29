<template>
  <button ref="_ref" class="el-button" :class="{
    [`el-button--${type}`]: type,
    [`el-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled,
  }" :disabled="disabled" :type="nativeType" :autofocus="autoFocus">
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ELButtonProps } from './types';

defineOptions({
  name: 'ElButton'
})

withDefaults(defineProps<ELButtonProps>(), {
  nativeType: 'button'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref
})
</script>

<style></style>
