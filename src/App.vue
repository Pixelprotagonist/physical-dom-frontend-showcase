<script setup>
import Widget from './components/Widget.vue';
</script>

<template>
  <div class="root">
    <h1>
      This is my nice DnD Dashboard hooray!
    </h1>
    <Widget>
      Some fun will be here soon!
    </Widget>
    <Widget>
      Some more fun will be here soon!
    </Widget>
    <Widget>
      Even fun will be here soon!
    </Widget>
  </div>
</template>

<style scoped>
h1{
  margin-top: 0;
}

.root{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
}
</style>
