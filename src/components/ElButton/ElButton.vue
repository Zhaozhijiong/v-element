<template>
  <button ref="_ref" class="el-button" :class="{
    [`el-button--${type}`]: type,
    [`el-button--${size}`]: size,
    'is-plain': plain,
    'is-round': round,
    'is-circle': circle,
    'is-disabled': disabled || loading,
  }" :disabled="disabled || loading" :type="nativeType" :autofocus="autoFocus">
    <el-icon icon="spinner" spin v-if="loading"></el-icon>
    <el-icon :icon="icon" v-if="icon"></el-icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ELButtonProps } from './types';
import ElIcon from '../ElIcon/ElIcon.vue';

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
