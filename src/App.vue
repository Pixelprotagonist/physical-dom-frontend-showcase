<script setup>
import { reactive, ref } from 'vue';

import Sidebar from './components/Sidebar.vue';
import Widget from './components/Widget.vue';
import CharacterWidget from './components/CharacterWidget.vue';
import EnemyWidget from './components/EnemyWidget.vue';

const sidebarHidden = ref(false);

const toggleSidebar = () => {
  sidebarHidden.value = !sidebarHidden.value;
}

const widgets = reactive([
  {name: 'character', active: true, displayName: "Character"},
  {name: 'dice', active: true, displayName: "Dice Tray"},
  {name: 'enemies', active: true, displayName: "Enemies"},
  ])
</script>

<template>
  <div class="root">
    <button class="sidebarButton" @click="toggleSidebar">Options</button>
    <div class="pageHeader">
      <img src="/src/assets/DnD-Logo.png" class="icon">
      <h1>
        DnD Utilities
      </h1>
    </div>

    <Sidebar :sidebarHidden="sidebarHidden" @closeSidebar="toggleSidebar" :widgets="widgets" />

    <div class="content">
      <CharacterWidget v-if="widgets[0].active" />

      <Widget v-if="widgets[1].active">
        <template #header>
          <h3>{{widgets[1].displayName}}</h3>
        </template>
        <template #body>
          Some more fun will be here soon!
        </template>
      </Widget>

      <EnemyWidget v-if="widgets[2].active" />
    </div>

  </div>
</template>

<style scoped>
.sidebarButton {
  position: fixed;
  top: 10px;
  left: 10px;
}

.pageHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.icon {
  width: 20%;
}

h1 {
  margin-top: 0;
}

.root {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
}

.content {
  margin: 0 5%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
