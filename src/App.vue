<script setup>
import { ref } from 'vue';

import Sidebar from './components/Sidebar.vue';
import Widget from './components/Widget.vue';

const sidebarHidden = ref(false);

const toggleSidebar = () => {
  sidebarHidden.value = !sidebarHidden.value;
}
</script>

<template>
  <div class="root">
    <div class="pageHeader">
      <img src="/src/assets/DnD-Logo.png" class="icon">
      <h1>
        DnD Utilities
      </h1>
      <button @click="toggleSidebar">Sidebar</button>
    </div>

    <Sidebar :sidebarHidden="sidebarHidden" @closeSidebar="() => {console.log('clacky'); toggleSidebar()}"/>

    <Widget>
      <template #header>
        <h2>Widget #1</h2>
      </template>
      <template #body>
        Some fun will be here soon!
      </template> 
    </Widget>

    <Widget>
      <template #header>
        <h3>Widget #2</h3>
      </template>
      <template #body>
        Some more fun will be here soon!
      </template> 
    </Widget>

    <Widget>
      <template #header>
        Widget #3
      </template>
      <template #body>
        Even more fun will be here soon!
      </template> 
    </Widget>

  </div>
</template>

<style scoped>
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
</style>
