<script setup>
const props = defineProps(['sidebarHidden'])
const emit = defineEmits(['closeSidebar'])

const closeSidebar = () => {
  emit('closeSidebar');
}
</script>

<template>
  <Transition>
    <div class="sidebar" v-if="props.sidebarHidden">
      <button @click="closeSidebar">Hide Sidebar</button>
        This is my Sidebar, content will follow
    </div>
  </Transition>

</template>

<style scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: aqua;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.v-enter-from,
.v-leave-to {  
  transform: translateX(-100%);
}
</style>