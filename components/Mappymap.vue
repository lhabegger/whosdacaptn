<template>
  <section class="container py-5">
         <h3 class="heading3">Game Map</h3>
      <div class="pt-5">
        <GMapMap
          :center="center"
          :zoom="8"
          :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
          }"
          style="width: 100%; height: 300px; margin: auto;"
        >
          <GMapMarker
            :key="game.id"
            v-for="(game, index) in games"
            :position="getLatLng(game.data.Ort)"
            :clickable="true"
            :draggable="true"
            @click="openMarker(game)"
          >
            <GMapInfoWindow
              :closeclick="true"
              @closeclick="openMarker(null)"
              :opened="openedMarkerID === game.id"
            >
            <!-- content of the marker callout --> 
                        <!-- content of the marker callout -->
              <div>
                <p>Game ID: {{ game.id }}</p>
      <!-- Logic to find the player with the highest score -->
              <div v-if="game.data.players && game.data.players.length > 0">
                <p>Winner: {{ getPlayerWithMostPoints(game.data.players).name }}</p>
                <p>Score: {{ getPlayerWithMostPoints(game.data.players).score }}</p>
              </div>
              </div>
            </GMapInfoWindow>
          </GMapMarker>
        </GMapMap>
        </div>
  </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  const config = useRuntimeConfig()

  // console.log('Runtime config:', config.public)
  interface Game {
  id: string;
  data: {
    Ort: {
      latitude: number;
      longitude: number;
    };
    players: {
      name: string;
      score: number;
    }
  };
}

const center = ref({ lat: 47.376888, lng: 8.541694 });
const openedMarkerID = ref<string | null>(null);
const games = ref<Game[]>([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('/api/animal'); // Update the API endpoint to match your route
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

  const getLatLng = (ort: { latitude: number; longitude: number }): { lat: number; lng: number } => {
  return {
    lat: ort.latitude,
    lng: ort.longitude
  };
};
  
  const openMarker = (game: Game | null) => {
    openedMarkerID.value = game ? game.id : null;
  };

  const getPlayerWithMostPoints = (players: { name: string; score: number }[]) => {
    if (!players || players.length === 0) {
      return { name: "", score: 0 }; // Default values if no players or an empty array
    }

    // Find the player with the highest score
    return players.reduce((prev, current) => (prev.score > current.score ? prev : current));
  };
  </script>
  