<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ElButton from './components/ElButton/ElButton.vue';
import type { ElButtonInstance } from './components/ElButton/types';
import ElCollapse from './components/ElCollapse/ElCollapse.vue';
import ElCollapseItem from './components/ElCollapse/ElCollapseItem.vue';
import ElIcon from './components/ElIcon/ElIcon.vue';
import ElTooltip from './components/ElTooltip/ElTooltip.vue';
import type { ElTooltipInstance } from './components/ElTooltip/type';
import { ElMessage } from './components/ElMessage/method';


const buttonRef = ref<ElButtonInstance | null>(null)
const tooltipRef = ref<ElTooltipInstance | null>(null)

function onVisibleChange() {
  console.log('change')
}

onMounted(() => {

  ElMessage({ content: 'this ', type: 'danger', showClose: true })
  ElMessage({ content: 'this ', duration: 0, type: 'success', showClose: true })
  ElMessage({ content: 'this ', duration: 0, type: 'warning', showClose: true })
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
    <ElButton ref="buttonRef" plain @click="ElMessage({ content: 'this is content' })">
      el-button
    </ElButton>
    <ElButton ref="buttonRef" circle @click="ElMessage({ content: 'this is content123123' })">
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
      </ElCollapseItem>
      <ElCollapseItem name="b" title="item b">
        <div>item b bbb bbb</div>
      </ElCollapseItem>
      <ElCollapseItem name="c" disabled>
        <template #title>
          item c
        </template>
        <div>item c ccc ccc</div>
      </ElCollapseItem>
    </ElCollapse>
    <ElIcon icon="fa-solid fa-user-secret" type="success"></ElIcon>
    <ElIcon icon="fa-solid fa-user-secret" color="#00ffff"></ElIcon>
    <br><br>
    <div>
      <ElTooltip ref="tooltipRef" trigger="click" placement="right" @visible-change="onVisibleChange">
        <ElButton>test</ElButton>
        <template #content>
          <div>
            这是一段内容
          </div>
        </template>
      </ElTooltip>
    </div>
  </view>

</template>

<style></style>
