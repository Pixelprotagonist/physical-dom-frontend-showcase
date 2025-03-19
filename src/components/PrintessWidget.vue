<script setup>
import { computed, ref } from 'vue';

import { getRandomInt } from '../helpers/helpers'
import Widget from './Widget.vue';

// to add dice, add them here, add a fitting background image to assets and add a class for the background
const fastDice = ref([
  {sides: 6, rolling: false, result: 6},
  {sides: 8, rolling: false, result: 8},
  {sides: 12, rolling: false, result: 12},
  {sides: 20, rolling: false, result: 20},
])

const dieClasses = (sides) => {
  const { rolling, result } = fastDice.value.find((die) => die.sides === sides);
  const dieBaseClasses = ['fastDie', `d${sides}`]
  if (rolling) {
    return [...dieBaseClasses, 'rolling'];
  } else if (result === 1) {
    return [...dieBaseClasses, 'criticalFailure'];
  } else {
    return dieBaseClasses;
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const rollDie = (faces) => {
  return getRandomInt(faces, 1);
}

const rollFastDie = async (index, sides) => {
  fastDice.value[index].rolling = true;
  await delay(1000);
  fastDice.value[index].result = rollDie(sides);
  fastDice.value[index].rolling = false;
}
</script>

<template>
  <Widget class="printessWidget">
    <template #header>
      <h2>Design Something</h2>
    </template>

    <template #body>
      <div>
        Printess Integraion coming soon!
      </div>
    </template>
  </Widget>
</template>

<style scoped>
.printessWidget {
  grid-column: span 4;
}
</style>
