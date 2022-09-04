<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, PropType } from 'vue'
import LText from './LText.vue'
const props = defineProps({
  list: {
    type: Array as PropType<any>,
    require: true
  }
})
const emits = defineEmit(['on-emit-click'])

const onItemClick = (data: any) => {
  emits('on-emit-click', data)
}
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
}
</style>
