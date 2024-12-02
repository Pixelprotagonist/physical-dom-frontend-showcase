<script setup>
import { computed, ref } from 'vue';

import { getRandomInt } from '../helpers/helpers'
import Widget from './Widget.vue';

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
  <Widget class="diceWidget">
    <template #header>
      <h2>Roll some dice!</h2>
    </template>

    <template #body>
      <div class="fastDice">
        <div v-for="({ sides, result }, index) in fastDice" :class="dieClasses(sides)" @click="rollFastDie(index, sides)">
          {{ result }}
        </div>
      </div>
    </template>
  </Widget>
</template>

<style scoped>
.diceWidget {
  grid-column: span 4;
}

.fastDice {
  margin: 0 10px;
  width: auto;
  padding: 10px;
  border: 3px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.fastDie {
  min-height: 35px;
  min-width: 35px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.d6 {
  background-image: url('/src/assets/d6_beige.png');
}

.d8 {
  background-image: url('/src/assets/d8_beige.png');
}

.d12 {
  background-image: url('/src/assets/d12_beige.png');
}

.d20 {
  background-image: url('/src/assets/d20_beige.png');
}

.rolling {
  animation: spin 0.5s linear infinite;
}

.criticalFailure {
  color: red;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media screen and (min-width: 800px) {
  .diceWidget {
    grid-column: span 1;
  }

  .fastDice {
    height: 100%;
    flex-direction: column;
  }

  .fastDie {
    min-height: 50px;
    min-width: 50px;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
