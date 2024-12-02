<script setup>
import { computed, ref } from 'vue';
import axios from 'axios';

import Widget from './Widget.vue';
import { getRandomInt } from '../helpers/helpers'

const API_BASE_URL = 'https://www.dnd5eapi.co/api'

const cr = ref(1)
const monsters = ref();
const monster = ref(null);
const loadingMonster = ref(false);
const currentHp = ref();
const currentHpPercent = ref();
const damage = ref(1);

const isDead = computed(() => monster.value !== null && currentHp.value < 1);

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
  <Widget class="enemyWidget">
    <template #header>
      <div>
        <h2>Enemy</h2>
      </div>
    </template>

    <template #body>
      <div class="enemies">
        <label for="crPicker" class="crPickerLabel">Choose CR</label>
        <input v-model="cr" type="number" class="crPicker" name="crPicker" />
        <button @click="findEnemy" class="battleButton" :disabled="monster && !isDead">Into Battle!</button>
        <div v-if="loadingMonster" class="loader" />
        <div v-else-if="monster !== null" class="monster">
          <p v-if="isDead" class="deathDescription">
            You have slain the enemy! Do you dare to find another foe?
          </p>
          <h3 class="monsterName">{{ monster.name }}</h3>
          <div class="hp" >
          </div>
          <div class="hpValue">
            HP: {{ `${currentHp}/${monster.hit_points}` }}
          </div>
          <div class="acWrapper">
            <div>
              <b>AC</b>
            </div>
            <div class="ac">{{ monster.armor_class[0].value }}</div>
          </div>
          <div class="damage">
            <label for="damage">Attack for how much?</label>
            <input v-model="damage" type="number" min="0" name="damage" class="damageInput" />
          </div>
          <button @click="dealDamage()" class="damageButton" :disabled="currentHp < 1">Attack!</button>
          <h3 class="monsterPropertyHeading">Enemy Actions</h3>
          <div v-for="action in monster.actions" class="action">
            <h4 class="actionName">{{ action.name }}</h4>
            <p class="actionDescription">{{ action.desc }}</p>
          </div>
        </div>
      </div>

    </template>
  </Widget>
</template>

<style scoped>
.enemyWidget {
  grid-column: span 4;
}

.enemies {
  margin: 0 5px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 5px;
}

.crPickerLabel {
  grid-column: 1 / 3;
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
  row-gap: 10px;
}

.monsterProperty {
  justify-self: stretch;
  align-self: center;
}

.monsterPropertyHeading {
  grid-column: span 5;
  margin: 10px 0 0 0;
}

.deathDescription {
  grid-column: span 5;
  margin: 0;
}

.monsterName {
  grid-column: span 5;
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

.hpValue {
  grid-column: span 5;
}

.acWrapper {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.ac {
  padding: 15% 0;
  background-image: url('/src/assets/shield.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.damage {
  grid-column: span 2;
  align-self: center;
}

.damageInput {
  width: 80%;
}

.damageButton {
  grid-column: span 2;
  align-self: center;
  height: 50px;
}

.action {
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
}

.actionDescription {
  margin: 0;
}

.actionName {
  margin: 0 0 5px 0;
  text-decoration: underline;
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

@media screen and (min-width: 800px) {
  .crPickerLabel {
    grid-column: 1;
    align-self: center;
  }
  .crPicker {
    grid-column: 2;
    align-self: center;
  }

  .battleButton {
    grid-column: 4 / 6;
  }

  .deathDescription {
    grid-column: span 5;
    margin: 10px 0;
  }

  .monsterName {
    grid-column: 1 / 2;
  }

  .hp {
    grid-column: span 4;
    align-self: center;
  }

  .hpValue {
    grid-column: span 1;
    align-self: center;
  }

  .acWrapper {
    grid-column: span 1;
  }

  .ac {
    padding: 5% 0;
  }

  .damage {
    grid-column: span 2;
    align-self: center;
  }

  .damageButton {
    grid-column: span 1;
  }
}
</style>
