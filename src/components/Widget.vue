<script setup>
</script>

<template>
  <div class="widget">
    <slot name="header">
        <h2>This is my widget headline</h2>
    </slot>
    <slot  name="body">
        <div>
            You should really add some content here
        </div>
    </slot>
  </div>
</template>

<style scoped>
.widget {
  grid-column: span 4;
  margin: 10px 0;
  border: none;
  border-radius: 25px;
  background-color: bisque;
  padding: 10px 0;
  color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
