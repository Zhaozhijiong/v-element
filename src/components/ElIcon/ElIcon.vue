<template>
  <i class="el-icon" :class="{
    [`el-icon--${type}`]: type
  }" :style="customStyles" v-bind="$attrs">
    <FontAwesomeIcon v-bind="filterProps"></FontAwesomeIcon>
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { ElIconProps } from './types';
import { computed } from 'vue';
import { omit } from 'lodash-es';

defineOptions({
  name: 'ElIcon',
  inheritAttrs: false
})

const props = defineProps<ElIconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<style lang="scss" scoped></style>
