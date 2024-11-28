<script setup>
</script>

<template>
  <div class="widget">
    <h2>This is my widget headline</h2>
    <slot>
        <div>
            You should really add some content here
        </div>
    </slot>
  </div>
</template>

<style scoped>
.widget {
    margin: 10px 0;
    border: none;
    border-radius: 25px;
    background-color: bisque;
    width: 100%;
}
</style>
