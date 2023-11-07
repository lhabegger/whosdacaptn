<template>
    <div class="mb-20">
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
        style="width: 500px; height: 300px; margin: auto"
      >
        <GMapMarker
          :key="game.id"
          v-for="(game, index) in games"
          :position="getLatLng(game.data.Ort)"
          :clickable="true"
          :draggable="true"
          @click="openMarker(game.id)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerID === game.id"
          >
          <!-- content of the marker callout --> 
          <div>{{ game.id }}</div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </div>
    <section>
        <div>
            <div v-for="game in games">
                <div>{{ game }}</div>
                <div>{{ getLatLng(game.data.Ort) }}</div>
            </div>
        </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface Game {
  id: string;
  data: {
    Ort: {
      _latitude: number;
      _longitude: number;
    };
  };
}

const center = ref({ lat: 48.8773406, lng: 9.327774 });
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

  const getLatLng = (ort: { _latitude: number; _longitude: number }): { lat: number; lng: number } => {
  return {
    lat: ort._latitude,
    lng: ort._longitude
  };
};
  
  const openMarker = (id: string | null) => {
    openedMarkerID.value = id;
  };
  </script>
  