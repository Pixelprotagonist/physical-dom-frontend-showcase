<script setup>
import Widget from './components/Widget.vue';
</script>

<template>
  <div class="root">
    <h1>
      This is my nice DnD Dashboard hooray!
    </h1>

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
