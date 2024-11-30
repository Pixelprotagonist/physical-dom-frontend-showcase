<script setup>
import { computed, reactive, ref } from 'vue';
import axios from 'axios';

import Widget from './Widget.vue';

const API_BASE_URL = 'https://www.dnd5eapi.co/api'

const cr = ref(1)
const monsters = ref();
const monster = ref(null);
const loadingMonster = ref(false);
const currentHp = ref();
const currentHpPercent = ref();
const damage = ref(1);

const isDead = computed(() => monster.value !== null && currentHp.value < 1);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getMonsters = async () => {
  monsters.value = await axios.get(`${API_BASE_URL}/monsters`,
    {
      params: {
        challenge_rating: cr.value
      }
    })
    .then(res => {
      return res.data;
    });
}

const findEnemy = async () => {
  loadingMonster.value = true;
  await getMonsters();
  const monsterIndex = monsters.value.results[getRandomInt(monsters.value.count)].index;
  monster.value = await axios.get(`${API_BASE_URL}/monsters/${monsterIndex}`)
    .then(({ data }) => {
      currentHp.value = data.hit_points;
      currentHpPercent.value = '100%';
      return data;
    })
    .finally(() => {
      loadingMonster.value = false;
    });
}

const dealDamage = () => {
  currentHp.value = currentHp.value - damage.value;
  currentHpPercent.value = `${Math.floor((currentHp.value/monster.value.hit_points)*100)}%`
}

</script>

<template>
  <Widget>
    <template #header>
      <div>
        <h2>Enemies</h2>
      </div>
    </template>

    <template #body>
      <div class="enemies">
        <input v-model="cr" type="number" class="crPicker" />
        <button @click="findEnemy" class="battleButton" :disabled="monster && !isDead">Into Battle!</button>
        <div v-if="loadingMonster" class="loader" />
        <div v-else-if="monster !== null" class="monster">
          <h3 class="monsterPropertyFull">{{ monster.name }}</h3>
          <div class="hp" :style="{'--hpBarLeft': '35%'}" >
          </div>
          <div class="monsterPropertyFull">
            HP: {{ `${currentHp}/${monster.hit_points}` }}
          </div>
          <p v-if="isDead" class="monsterPropertyFull">
            You have slain the enemy! Do you dare to find another foe?
          </p>
          <input v-model="damage" type="number" min="0"/>
          <button @click="dealDamage()" class="monsterPropertySmall" :disabled="currentHp < 1">Attack!</button>
        </div>
        <!-- <pre class="monster">{{ monster ? monster : "Find a worthy foe!" }}</pre> -->

      </div>

    </template>
  </Widget>
</template>

<style scoped>
.enemies {
  margin: 0 5px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 5px;
}

.crPicker {
  grid-column: 1 / 3;
}

.battleButton {
  grid-column: 3 / 6;
}

.monster {
  grid-column: span 5;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.monsterPropertyFull {
  grid-column: span 5;
}

.monsterPropertySmall {
  grid-column: span 2;
}

.monsterPropertyBig {
  grid-column: span 3;
}

.hp {
  grid-column: span 5;
  position: relative;
  background-color: red;
  height: 25px;
  content: "";
}

.hp::before {
  position: absolute;
  left: 0;
  background-color: green;
  width: v-bind(currentHpPercent);
  height: 25px;
  content: "";
  z-index: 2;
  transition: all 0.5s ease;
}

.loader {
  grid-column: 3;
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid red; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
