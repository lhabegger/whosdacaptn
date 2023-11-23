import { firestore } from '../utils/firebase';

<template>
  <div class="lg:col-span-4">
    <!-- Leaderboard -->
    <section class="container py-5">
      <div>
        <h3 class="heading3">Leaderboard</h3>
        <button class="btn btn-secondary btn-xs mr-2" @click="saveScores()">save game</button>
        <button class="btn btn-primary btn-xs" @click="resetScores()">reset scores</button>
        <TransitionGroup name="fade" tag="ol" class="mt-10">
          <li v-for="(player, index) in sortedPlayers" :key="player.name" class="pb-5 relative"
          @click="showCallout(player.name, $event)">
            <img style="display:inline;
                                                                              margin-top:-15px;
                                                                              margin-left:-12px;
                                                                              transform: rotate(-15deg);
                                                                              z-index:2;" class="absolute"
              v-if="index === 0" src="/sailor-hat.png" alt="Icon" width="30" height="30" />

            <span :id="'leaderboard-' + player.name" class="mr-3 font-bold text-xl relative"
              >
              {{ player.name }}
            </span>
            <span>
              {{ player.score }}
            </span>
            <button class="btn btn-xs btn-circle btn-outline btn-secondary absolute right-0"
              @click="removePlayer(player.name)">-</button>
          </li>
        </TransitionGroup>

      </div>
    </section>
    <LeaderBoardActionsCallout v-show="isCalloutVisible" :player="clickedPlayer" :positionX="calloutX"
      :positionY="calloutY" @modifyScore="modifyScore" @hideCallout="hideCallout" />
    <div class="divider"></div>
    <section class="container py-5">
      <div>

        <form>
          <input type="text" placeholder="Name" class="input input-bordered w-full max-w-xs" v-model="name" />
          <button type="button" class="btn btn-primary m-1" @click="addPlayer(name)">
            Add Player
          </button>
        </form>

      </div>
    </section>
    </div>

  <!-- Save Modal -->
  <SaveModal v-show="isSaveModalVisible" :players="players" @closeModal="closeModal" />
</template>
  
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

interface Player {
  name: string
  score: number
  customScore: number
}
const players = ref<Player[]>([])
const clickedPlayer = ref<string>('');


const sortedPlayers = computed(() => {
  return [...players.value].sort((a, b) => b.score - a.score);
});
const name = ref('')
const isSaveModalVisible = ref(false);
const isCalloutVisible = ref(false);


// Methods to show/hide callout
const calloutX = ref(0);
const calloutY = ref(0);
const showCallout = (playerName: string, event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement;
  const spanRect = clickedElement.getBoundingClientRect();

  // Adjust for scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  calloutX.value = event.clientX + scrollX;
  calloutY.value = spanRect.top + scrollY;

  clickedPlayer.value = playerName;
  isCalloutVisible.value = true
}

const hideCallout = () => {
  // Reset clickedPlayer when callout is hidden
  clickedPlayer.value = '';
  isCalloutVisible.value = false
}


watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

watch(players, (newVal) => {
  localStorage.setItem('players', JSON.stringify(newVal))
}, { deep: true })

onMounted(() => {
  name.value = localStorage.getItem('name') || ''

  const storedPlayers = localStorage.getItem('players');
  if (storedPlayers) {
    players.value = JSON.parse(storedPlayers);
  } else {
    players.value = []; // Set to an empty array if no data is found in localStorage
  }
})

const addPlayer = (name: string) => {
  if (name === '') {
    return
  }

  players.value.push({
    name: name,
    score: 0,
    customScore: 0,
  })
}

const removePlayer = (playername: string) => {
  players.value = players.value.filter(t => t.name !== playername)
}

const modifyScore = (playername: string, x: number) => {
  const player = players.value.find((p) => p.name === playername);

  if (player) {
    player.score += x;
    player.customScore = 0;
  } else {
    console.error(`Player with name '${playername}' not found.`);
  }
}
const resetScores = () => {
  players.value.forEach(player => {
    player.score = 0;
    player.customScore = 0;
  });
}

const closeModal = () => {
  isSaveModalVisible.value = false;
}

const saveScores = () => {
  // Logic to prepare data and save scores
  isSaveModalVisible.value = true;
};

</script>

<style scoped>
.fade-move {
  transition: transform 1s;
}
</style>