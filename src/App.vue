<script setup>
import { reactive, ref } from 'vue';

import Sidebar from './components/Sidebar.vue';
import CharacterWidget from './components/CharacterWidget.vue';
import EnemyWidget from './components/EnemyWidget.vue';
import DiceWidget from './components/DiceWidget.vue';

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

      <DiceWidget v-if="widgets[1].active" />

      <EnemyWidget v-if="widgets[2].active" />
    </div>

  </div>
</template>

<style scoped>
.root {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

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

.content {
  margin: 0 5%;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
}
</style>
