<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ElButton from './components/ElButton/ElButton.vue';
import type { ElButtonInstance } from './components/ElButton/types';
import ElCollapse from './components/ElCollapse/ElCollapse.vue';
import ElCollapseItem from './components/ElCollapse/ElCollapseItem.vue';
import ElIcon from './components/ElIcon/ElIcon.vue';


const buttonRef = ref<ElButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})

const openedValue = ref(['a'])
setTimeout(() => {
  openedValue.value = ['a', 'b']
}, 2000)
</script>

<template>
  <view>
    <ElButton ref="buttonRef" plain @click="123">
      el-button
    </ElButton>
    <ElButton ref="buttonRef" circle>
      el
    </ElButton>
    <ElButton ref="buttonRef" round>
      el-button
    </ElButton>
    <ElButton ref="buttonRef" disabled>
      el-button
    </ElButton>
    <br><br>
    <ElButton type="primary" ref="buttonRef">
      el-button
    </ElButton>
    <ElButton type="success" ref="buttonRef">
      el-button
    </ElButton>
    <ElButton type="warning" ref="buttonRef">
      el-button
    </ElButton>
    <ElButton type="danger" ref="buttonRef">
      el-button
    </ElButton>
    <ElButton type="info" ref="buttonRef">
      el-button
    </ElButton>
    <br><br>
    <ElButton type="primary" ref="buttonRef" plain>
      el-button
    </ElButton>
    <ElButton type="success" ref="buttonRef" plain>
      el-button
    </ElButton>
    <ElButton type="warning" ref="buttonRef" plain>
      el-button
    </ElButton>
    <ElButton type="danger" ref="buttonRef" plain>
      el-button
    </ElButton>
    <ElButton type="info" ref="buttonRef" plain>
      el-button
    </ElButton>
    <br><br>
    <ElButton type="danger" size="large" ref="buttonRef" plain>
      el-button
    </ElButton>
    <ElButton type="info" size="small" ref="buttonRef" plain>
      el-button
    </ElButton>
    <br><br>
    <ElButton type="primary" size="large" loading>
      el-button
    </ElButton>
    <ElButton type="info" size="large" icon="arrow-up">
      el-button
    </ElButton>
    <br><br>
    <ElCollapse v-model="openedValue" accordion>
      <ElCollapseItem name="a" title="item a">
        <div>item a aaa aaa</div>
        <div>item a aaa aaa</div>
        <div>item a aaa aaa</div>
      </ElCollapseItem>
      <ElCollapseItem name="b" title="item b">
        <div>item b bbb bbb</div>
        <div>item b bbb bbb</div>
        <div>item b bbb bbb</div>
      </ElCollapseItem>
      <ElCollapseItem name="c" disabled>
        <template #title>
          item c
        </template>
        <div>item c ccc ccc</div>
        <div>item c ccc ccc</div>
        <div>item c ccc ccc</div>
      </ElCollapseItem>
    </ElCollapse>
    <ElIcon icon="fa-solid fa-user-secret" type="success"></ElIcon>
    <ElIcon icon="fa-solid fa-user-secret" color="#00ffff"></ElIcon>
  </view>

</template>

<style></style>
