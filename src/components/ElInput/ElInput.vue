<template>
  <div class="el-input" :class="{
    [`el-input--${type}`]: type,
    [`el-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-prefix': $slots.prefix,
    'is-subfix': $slots.subfix,
    'is-append': $slots.append,
    'is-focus': isFocus
  }">
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="el-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="el-input__wrapper">
        <!-- prefix slot -->
        <div v-if="$slots.prefix" class="el-input__prefix">
          <slot name="prefix"></slot>
        </div>
        <!-- input -->
        <input v-model="innerValue" class="el-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :disabled="disabled"
          @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange" />
        <!-- subfix slot -->
        <div v-if="$props.subfix || showClear || showPasswordArea" class="el-input__subfix">
          <slot name="subfix"></slot>
          <ElIcon v-if="showClear" class="el-input__clear" icon="circle-xmark" @click="clear">
          </ElIcon>
          <ElIcon v-if="showPasswordArea && passwordVisible" class="el-input__password" icon="eye"
            @click="togglePasswordVisible">
          </ElIcon>
          <ElIcon v-if="showPasswordArea && !passwordVisible" class="el-input__password" icon="eye-slash"
            @click="togglePasswordVisible">
          </ElIcon>
        </div>
      </div>
      <!-- append slot -->
      <div v-if="$props.append" class="el-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <template v-else>
      <textarea v-model="innerValue" class="el-textarea__wrapper" :disabled="disabled" @input="handleInput"
        @focus="handleFocus" @blur="handleBlur" @change="handleChange" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { ElInputEmits, ElInputProps } from './type';
import ElIcon from '../ElIcon/ElIcon.vue';

const props = withDefaults(defineProps<ElInputProps>(), {
  type: 'text'
})

const emit = defineEmits<ElInputEmits>()
const innerValue = ref(props.modelValue)
watch(() => props.modelValue, (newVal) => {
  innerValue.value = newVal
})

// 焦点控制
const isFocus = ref(false)
function handleFocus(e: FocusEvent) {
  isFocus.value = true
  emit('focus', e)
}
function handleBlur(e: FocusEvent) {
  isFocus.value = false
  emit('blur', e)
}


const showClear = computed(() =>
  props.clearable
  && !!innerValue.value
  && !props.disabled
  && isFocus.value
)

/**
 * 手动改变输入框的值时 输入框不会触发原生事件 需要手动发送
 */
function clear() {
  innerValue.value = ''
  emit('update:modelValue', innerValue.value)
  emit('input', innerValue.value)
  emit('change', innerValue.value)
  emit('clear')
}

const passwordVisible = ref(false)
const showPasswordArea = computed(() =>
  props.showPassword
  && !props.disabled
  && !!innerValue.value
)
function togglePasswordVisible() {
  passwordVisible.value = !passwordVisible.value
}
function handleInput() {
  emit('update:modelValue', innerValue.value)
  emit('input', innerValue.value)
}
function handleChange() {
  emit('change', innerValue.value)
}
</script>

<style scoped></style>
