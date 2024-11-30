<script setup>
import { reactive, ref } from 'vue';

import Sidebar from './components/Sidebar.vue';
import Widget from './components/Widget.vue';

const sidebarHidden = ref(false);

const toggleSidebar = () => {
  sidebarHidden.value = !sidebarHidden.value;
}

const widgets = reactive([
  {name: 'character', active: true, displayName: "Character"},
  {name: 'dice', active: true, displayName: "Dice Tray"},
  {name: 'enemies', active: true, displayName: "Enemies"},
  ])

const stats = reactive([
  {name: 'str', value: 10},
  {name: 'dex', value: 10},
  {name: 'con', value: 10},
  {name: 'int', value: 10},
  {name: 'wis', value: 10},
  {name: 'cha', value: 10},
])

const statsLocked = ref(false);

const toggleStatsLocked = () => {
  console.log("clicky", statsLocked.value)
  statsLocked.value = !statsLocked.value;
}

const changeStat = (index, delta) => {
  stats[index].value = stats[index].value + delta;
}

const lowerStat = (index) => {
  if(stats[index].value > 6) {
    changeStat(index, -1);
  }
}

const higherStat = (index) => {
  if(stats[index].value < 20) {
    changeStat(index, 1);
  }
}

const modifier = {
  6: -2,
  7: -2,
  8: -1,
  9: -1,
  10: 0,
  11: 0,
  12: 1,
  13: 1,
  14: 2,
  15: 2,
  16: 3,
  17: 3,
  18: 4,
  19: 4,
  20: 5,
}
</script>

<template>
  <div class="root">
    <button class="sidebarButton" @click="toggleSidebar">Sidebar</button>
    <div class="pageHeader">
      <img src="/src/assets/DnD-Logo.png" class="icon">
      <h1>
        DnD Utilities
      </h1>
    </div>

    <Sidebar :sidebarHidden="sidebarHidden" @closeSidebar="toggleSidebar" :widgets="widgets" />

    <Widget v-if="widgets[0].active">
      <template #header>
        <div class="statsHeader">
          <h2>{{widgets[0].displayName}}</h2>
          <button @click="toggleStatsLocked" class="statsLock">Lock</button>
          <img v-if="statsLocked" src="/src/assets/locked.png" alt="Stats Locked" class="statsStatusIcon" />
          <img v-else src="/src/assets/unlocked.png" alt="Stats Unlocked" class="statsStatusIcon" />
        </div>
      </template>

      <template #body>
        <table>
          <thead>
            <tr>
              <th>Stats</th>
              <th v-for="stat in stats">
                <h3>{{ stat.name.toUpperCase() }}</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Raw</th>
              <td v-for="(stat, index) in stats">
                <button @click="lowerStat(index)" :disabled="statsLocked" class="statsModifier">-</button>
                <b>{{ stat.value }}</b>
                <button @click="higherStat(index)" :disabled="statsLocked" class="statsModifier">+</button>
              </td>
            </tr>
            <tr>
              <th>Mod</th>
              <td v-for="(stat) in stats">
                {{ modifier[stat.value] }}
              </td>
            </tr>
          </tbody>
        </table>
        
      </template> 
    </Widget>

    <Widget v-if="widgets[1].active">
      <template #header>
        <h3>{{widgets[1].displayName}}</h3>
      </template>
      <template #body>
        Some more fun will be here soon!
      </template> 
    </Widget>

    <Widget v-if="widgets[2].active">
      <template #header>
        {{widgets[2].displayName}}
      </template>
      <template #body>
        Even more fun will be here soon!
      </template> 
    </Widget>

  </div>
</template>

<style scoped>
.sidebarButton {
  position: absolute;
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

.statsHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.statsLock {
  width: 20%;
}

.statsStatusIcon {
  width: 20px;
}

.statsModifier {
  cursor: pointer;
}

.statsModifier:disabled {
  cursor: default;
}
</style>
