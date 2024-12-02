<script setup>
const props = defineProps(['sidebarHidden', 'widgets'])
const emit = defineEmits(['closeSidebar', 'toggleWidgets'])

const closeSidebar = () => {
  emit('closeSidebar');
}

const toggleWidget = (index) => {
  props.widgets[index].active = !props.widgets[index].active;
}

</script>

<template>
  <Transition name="sidebar">
    <div class="sidebar" v-if="props.sidebarHidden">
      <button @click="closeSidebar" class="visibilityButton">Hide</button>
      <div v-for="(widget, index) in props.widgets" class="widgetToggle" @click="toggleWidget(index)">
        {{ widget.displayName }}
        <Transition name="widgetStatus">
          <img v-if="widget.active" src="/src/assets/check.png" class="statusIcon" />
          <img v-else src="/src/assets/cross.png" class="statusIcon" />
        </Transition>
      </div>
    </div>
  </Transition>

</template>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: beige;
  color: black;
  z-index: 3;
}

.visibilityButton {
  margin: 10px;
}

.widgetToggle {
  margin: 10%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 0 10px 10px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.statusIcon {
  width: 30px;
  margin-right: 10px;
}

.sidebar-enter-active,
.sidebar-leave-active,
.widgetStatus-enter-active,
.widgetStatus-leave-active {
  transition: all 0.4s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {  
  transform: translateX(-100%);
}

.widgetStatus-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.widgetStatus-leave-to {  
  transform: translateX(30px);
  opacity: 0;
  
}
</style>