<template>
  
    <div>
      <header class="z-20 border-b bg-background/80">
        <div class="container flex h-16 items-center justify-between">
          <NuxtLink to="/" class="text-lg font-bold">Who's da Captn?</NuxtLink>
          <div class="flex items-center">

          </div>
        </div>
      </header>
      <main class="container grid lg:grid-cols-5">
        <!-- Side nav  -->
        <aside
          class="hidden h-[calc(100dvh-65px)] shrink-0 overflow-y-auto border-r bg-background pb-12 scrollbar-thin scrollbar-thumb-accent scrollbar-thumb-rounded-full lg:block"
        >

        </aside>
        <div class="lg:col-span-4">
          <section class="container py-5">
            <h3>Modify Scores</h3>
            <button class="btn btn-primary btn-xs" @click="resetScores()">reset scores</button>
            <div class="overflow-x-auto">
            <table class="table table-fixed">
              <thead>
                <th class="w-60">Name</th>
                <th class="w-80">Actions</th>
                <th class="w-36">Score</th>
              </thead>
              <tr v-for="player in players">
                  <td class="player-content">
                    <input type="text" v-model="player.name" class="font-bold text-xl" style="display: inline;"/>
                    <button class="btn-xs btn btn-error ml-2" @click="removePlayer(player.name)">-</button>
                  </td>
                  <td>
                    <div class="join mb-1 mr-1">
                      <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player.name, 10)">+10</button>
                      <button class="btn btn-xs btn-primary join-item"  @click="modifyScore(player.name, 11)">+11</button>
                      <button class="btn btn-xs btn-primary join-item"  @click="modifyScore(player.name, 12)">+12</button>
                      <button class="btn btn-xs btn-primary join-item"  @click="modifyScore(player.name, 13)">+13</button>
                    </div>
                    <div class="join mb-1">
                      <button class="btn btn-xs btn-primary join-item"  @click="modifyScore(player.name, -1)">-1</button>
                      <button class="btn btn-xs btn-primary join-item"  @click="modifyScore(player.name, -2)">-2</button>
                      <button class="btn btn-xs btn-primary join-item"  @click="modifyScore(player.name, -3)">-3</button>
                    </div>
                    <div>
                      <input type="number"
                        class="input input-bordered input-xs  max-w-xs" 
                        placeholder="custom score" v-model.number="player.customScore"/>
                        <button class="btn btn-xs btn-primary" @click="modifyScore(player.name, player.customScore)">Go!</button>
                    </div>
                  </td>
                  <td>{{ player.score }}</td>
                </tr>
            </table>
          </div>
          </section>
          <!-- Leaderboard -->
          <section class="container py-5">
            <div>
              <h3>Leaderboard</h3>

              <TransitionGroup name="fade" tag="ol">
                <li v-for="(player, index) in sortedPlayers" :key="player.name" class="p-5">

                  <img style="display:inline; margin-left:-40px; margin-right:10px;"  v-if="index === 0" src="/sailor-hat.png" alt="Icon" width="30" height="30" />

                  <span class="mr-3 font-bold text-xl">{{ player.name }}</span><span>{{ player.score }}</span>
                </li>
              </TransitionGroup>

            </div>
          </section>
            
          <section class="container py-5">
            <div>  
                
                <form>
                  <h3>Spielermanagement</h3>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    class="input input-bordered w-full max-w-xs" 
                    v-model="name" />
                  <button type="button" 
                    class="btn"
                    @click="addPlayer(name)">
                    Spieler hinzufügen
                  </button>
                </form>

              </div>
          </section>

          <!-- Past Games -->
          <section class="container py-5">
            <table class="table">
              <thead>
                <tr>
                  <th>Game ID</th>
                  <th>Ort</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="game in games">
                  <td>{{ game.game_uid }}</td>
                  <td>{{ game.location }}</td>
                  <td>{{ game.player }}</td>
                  <td>{{ game.score }}</td>
                  <td>{{ game.createdAt }}</td>
                  <!-- Render other properties of the game object as table cells -->
                  <!-- For example: <td>{{ game.propertyName }}</td> -->
                </tr>
              </tbody>
            </table>
          </section>
          
      

          
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted, computed, watch } from 'vue'

  interface Player {
      name: string
      score: number
      customScore: number
    }
    const players = ref<Player[]>([])

    const sortedPlayers = computed(() => {
        return [...players.value].sort((a, b) => b.score - a.score);
      });
    const name = ref('')

  
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


    // DB Interaction for past games //////////////////////////////////////////////
    const games = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('/api/games');
        if (response.ok) {
          const data = await response.json();
          games.value = data.games;
        } else {
          console.error('Error fetching games data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching games data:', error);
      }
    });

  </script>

  <style scoped>
    .fade-move {
  transition: transform 1s;
}
  </style>