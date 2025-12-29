<template>
  <div class="el-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { collapseContextKey, type ElCollapseEmits, type ElCollapseProps, type NameType } from './type';

const props = withDefaults(defineProps<ElCollapseProps>(), {
  accordion: false
})
const emit = defineEmits<ElCollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, (newValue) => {
  activeNames.value = newValue
})

function handleClickItem(name: NameType) {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === name ? '' : name]
  } else {
    const index = activeNames.value.indexOf(name)
    if (index !== -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(name)
    }
  }


  emit('update:modelValue', activeNames.value)
  emit('change', activeNames.value)
}

provide(collapseContextKey, {
  activeNames,
  handleClickItem
})
</script>

<style scoped></style>
