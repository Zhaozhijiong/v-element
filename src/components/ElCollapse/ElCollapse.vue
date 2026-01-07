<template>
  <div class="el-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { collapseContextKey, type ElCollapseEmits, type ElCollapseProps, type NameType } from './type';

defineOptions({
  name: 'ElCollapse'
})

const props = withDefaults(defineProps<ElCollapseProps>(), {
  accordion: false
})
const emit = defineEmits<ElCollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, (newValue) => {
  activeNames.value = newValue
})

function handleClickItem(name: NameType) {
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = activeNames.value[0] === name ? [] : [name]
    activeNames.value = _activeNames
  } else {
    const index = activeNames.value.indexOf(name)
    if (index !== -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(name)
    }
    activeNames.value = _activeNames
  }


  emit('update:modelValue', _activeNames)
  emit('change', _activeNames)
}

provide(collapseContextKey, {
  activeNames,
  handleClickItem
})
</script>

<style scoped></style>
