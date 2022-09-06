<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          <components-list :list="defaultTextTemplates" @on-emit-click="addItem" />
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <div class="preview-list" id="canvas-area">
            <EditWrapper
              v-for="component of components"
              :key="component.id"
              :id="component.id"
              @set-active="setActive"
              :active="component.id === (currentElement && currentElement.id)"
            >
              <component :is="component.name" v-bind="component.props"></component>
            </EditWrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handleChange"
        ></props-table>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/index'
import defaultTextTemplates from '@/defaultTemplates'
import LText from '@/components/LText.vue'
import ComponentsList from '@/components/ComponentsList.vue'
import { TextComponentProps } from '@/defaultProps'
import EditWrapper from '@/components/EditWrapper.vue'
import { ComponentData } from '@/store/editor'
import PropsTable from '@/components/PropsTable.vue'
import { AllComponentProps } from 'lego-bricks'

const store = useStore<GlobalDataProps>()
const components = computed(() => store.state.editor.components)
const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)
const addItem = (props: Partial<TextComponentProps>) => {
  store.commit('addComponent', props)
}
const setActive = (id: string) => {
  store.commit('setActive', id)
}
const handleChange = (e: any) => {
  // console.log(e)
  store.commit('updateComponent', e)
}
// const updatePosition = (data: { left: number; top: number; id: string }) => {
//   const { id } = data
//   const updatedData = pickBy<number>(data, (v, k) => k !== 'id')
//   const keysArr = Object.keys(updatedData)
//   const valuesArr = Object.values(updatedData).map((v) => v + 'px')
//   store.commit('updateComponent', { key: keysArr, value: valuesArr, id })
// }
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.page-title {
  display: flex;
}
.page-title .inline-edit span {
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
}
.preview-list.canvas-fix .edit-wrapper > * {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
</style>
