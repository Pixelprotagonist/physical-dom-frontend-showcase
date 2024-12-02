<script setup>
import { computed, reactive, ref } from 'vue';

import Widget from './Widget.vue';

// If fleshed out into a more complex project, these stats could come from a DB
const LEVEL = 3;
const BASE_HP = 10;
const HIT_DIE = 8;
const BASE_AC = 10;

const statsLocked = ref(false);
const chosenWeapon = ref('');
const chosenArmor = ref({ name: 'Unarmored', ac: 0, default: true });


const stats = reactive([
  {name: 'str', value: 10},
  {name: 'dex', value: 10},
  {name: 'con', value: 10},
  {name: 'int', value: 10},
  {name: 'wis', value: 10},
  {name: 'cha', value: 10},
])

const toggleStatsLocked = () => {
  statsLocked.value = !statsLocked.value;
}

const changeStat = (index, delta) => {
  stats[index].value = stats[index].value + delta;
}

const lowerStat = (index) => {
  if(stats[index].value > 6) {
    changeStat(index, -1);
  }
}

const higherStat = (index) => {
  if(stats[index].value < 20) {
    changeStat(index, 1);
  }
}

// Lookup object to not run a computation on every stat change
const modifier = {
  6: -2,
  7: -2,
  8: -1,
  9: -1,
  10: 0,
  11: 0,
  12: 1,
  13: 1,
  14: 2,
  15: 2,
  16: 3,
  17: 3,
  18: 4,
  19: 4,
  20: 5,
}

const findModifier = (statName) => {
  const statValue = statName && stats.find(stat => stat.name === statName).value;
  return modifier[statValue];
}

const hp = computed(() => BASE_HP + LEVEL * (HIT_DIE + findModifier('con')));

const ac = computed(() => chosenArmor.value.ac === 0
  ? BASE_AC + findModifier('dex')
  : BASE_AC + chosenArmor.value.ac
)

const weapons = [
  { name: 'Axe', modifier: 'str', damage: '1d6+2' },
  { name: 'Sabre', modifier: 'dex', damage: '1d6+2' },
  { name: 'Bow', modifier: 'dex', damage: '1d6+1' },
 ]

const armors = [
  { name: 'Unarmored', ac: 0, default: true },
  { name: 'Leather', ac: 1, default: false },
  { name: 'Chain Mail', ac: 2, default: false },
  { name: 'Plate', ac: 3, default: false },
 ]
</script>

<template>
  <Widget class="characterWidget">
    <template #header>
      <div class="statsHeader">
        <h2>Character</h2>
        <button @click="toggleStatsLocked" class="statsLock">Lock</button>
        <img v-if="statsLocked" @click="toggleStatsLocked" src="/src/assets/locked.png" alt="Stats Locked" class="statsStatusIcon" />
        <img v-else @click="toggleStatsLocked" src="/src/assets/unlocked.png" alt="Stats Unlocked" class="statsStatusIcon" />
      </div>
    </template>

    <template #body>
      <table class="stats">
        <thead>
          <tr>
            <th>
              <h3>Stats</h3>
            </th>
            <th v-for="stat in stats">
              <h3>{{ stat.name.toUpperCase() }}</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Raw</th>
            <td v-for="(stat, index) in stats">
              <div class="stat">
                <button @click="higherStat(index)" :disabled="statsLocked" class="statsModifier">+</button>
                <b>{{ stat.value }}</b>
                <button @click="lowerStat(index)" :disabled="statsLocked" class="statsModifier">-</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>Mod</th>
            <td v-for="(stat) in stats">
              <b>{{ modifier[stat.value] }}</b>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <h3>Combat</h3>
        <div class="combat">
          <div class="offense">
            <h4>Weapon</h4>
            <select v-model="chosenWeapon" class="characterSelect">
              <option disabled value="">Please select one</option>
              <option v-for="weapon in weapons" :value="weapon">{{ weapon.name }}</option>
            </select>
            <div>
              <div>Mod: {{ findModifier(chosenWeapon.modifier) }}</div>
              <div>Dmg: {{ chosenWeapon.damage }}</div>
            </div>
          </div>
          <div class="defense">
            <h4>Defense</h4>
            <select v-model="chosenArmor" class="characterSelect">
              <option v-for="armor in armors" :value="armor">{{ armor.name }}</option>
            </select>
            <div>HP: {{ hp }}</div>
            <div>AC: {{ ac }}</div>
          </div>
        </div>
      </div>
    </template>
  </Widget>
</template>

<style scoped>
.characterWidget {
  grid-column: span 4;
}

.statsHeader {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.statsLock {
  width: 20%;
}

.statsStatusIcon {
  width: 20px;
}

.stats {
  margin: 0 5px;
}

.stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.statsModifier {
  padding: 0.2em 0.4em;
  cursor: pointer;
}

.statsModifier:disabled {
  cursor: default;
}

.combat {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

.characterSelect {
  width: 80%;
}

.offense,
.defense {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.offense > h4,
.defense > h4{
  margin: 5px 0;
}

@media screen and (min-width: 540px) {
  .statsModifier {
    padding: 0.2em 1em;
    cursor: pointer;
  }
}

@media screen and (min-width: 800px) {
  .characterWidget {
    grid-column: span 3;
  }

  .characterSelect {
    min-width: 150px;
  }

  .offense,
  .defense {
    margin-left: 10px;
    align-items: start;
    text-align: left;
  }
}
</style>
