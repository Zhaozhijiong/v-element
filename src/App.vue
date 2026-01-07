<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ElButton from './components/ElButton/ElButton.vue';
import type { ElButtonInstance } from './components/ElButton/types';
import ElCollapse from './components/ElCollapse/ElCollapse.vue';
import ElCollapseItem from './components/ElCollapse/ElCollapseItem.vue';
import ElIcon from './components/ElIcon/ElIcon.vue';
import ElTooltip from './components/ElTooltip/ElTooltip.vue';
import type { ElTooltipInstance } from './components/ElTooltip/type';


const buttonRef = ref<ElButtonInstance | null>(null)
const tooltipRef = ref<ElTooltipInstance | null>(null)
function openTooltip() {
  if (tooltipRef.value) {
    tooltipRef.value.show()
  }
}

function closeTooltip() {
  if (tooltipRef.value) {
    tooltipRef.value.hide()
  }
}

function onVisibleChange() {
  console.log('change')
}

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
    <ElButton ref="buttonRef" plain @click="openTooltip">
      el-button
    </ElButton>
    <ElButton ref="buttonRef" circle @click="closeTooltip">
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
      <ElTooltip ref="tooltipRef" placement="right" @visible-change="onVisibleChange">
        <img src="../public/favicon.ico" alt="">
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
