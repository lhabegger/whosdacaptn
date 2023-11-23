<template>
  <div class="modal-overlay">
    <div class="modal-dialog">
      <button class="btn btn-modal-close" @click="$emit('closeModal')">X</button>
      <form @submit.prevent="saveGameToFirebase">

        <div class="mb-4">
          <label>
            Ort
            <input
            id="autocomplete"
            type="text"
            placeholder="Location"
            v-model="googleLocation"
            class="w-80 m-2 p-2 rounded-md border-2"
            aria-label="Ort"
          />
          </label>

        </div >
          <div class="mb-4">
            <div v-for="(player, index) in players" :key="index" class="flex items-center mb-2">
            <input v-model="player.name" placeholder="Player Name" />
            <input v-model="player.score" placeholder="Player Score" type="number" />
          </div>
        </div>
        <!-- Player scores input fields -->

        
        <div class="btn-modal-actions">
        <button class="btn mr-2" @click="$emit('closeModal')">Dismiss</button>
        <button class="btn btn-primary" type="submit">Save</button>
        
      </div>
      </form>


    </div>
  </div>

</template>

<script setup>
import { EmitFlags } from 'typescript';
import { ref, onMounted } from 'vue';
import { collection, addDoc, GeoPoint  } from 'firebase/firestore'

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db
const players = ref([]);

const props = defineProps(['players']);
players.value = props.players;

const selectedLocation = ref(null);
const googleLocation = ref(null);


onMounted(async () => {
  try {
    const userLocation = await getUserLocation();
    updateAutocompleteInput(userLocation.lat, userLocation.lng);
  } catch (error) {
    console.error(error);
    // Handle geolocation error here
  }
});

const updateAutocompleteInput = (lat, lng) => {
  const geocoder = new google.maps.Geocoder();
  const latlng = { lat, lng };

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        const formattedAddress = results[0].formatted_address;

        // Set the formatted address to the Autocomplete input field
        googleLocation.value = formattedAddress;
      } else {
        console.error("No results found");
        // Handle no results found
      }
    } else {
      console.error("Geocoder failed due to: " + status);
      // Handle geocoding failure
    }
  });
};

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const usrLatitude = position.coords.latitude;
          const usrLongitude = position.coords.longitude;
          resolve({ lat: usrLatitude, lng: usrLongitude });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported'));
    }
  });
};

const saveGameToFirebase = async () => {

    try {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: googleLocation.value },  async (results, status) => {
      if (status === 'OK' && results[0]) {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        const geoPoint = new GeoPoint(latitude, longitude);
        debugger;
        const gameData = {
          Ort: geoPoint,
          players: players.value.map(player => ({
            name: player.name,
            score: player.score,
          })),
        };

        const gameRef = collection(db, 'games');
        const newGameDoc = await addDoc(gameRef, gameData);

        console.log('Document written with ID:', newGameDoc.id);
        return newGameDoc.id;
      } else {
        console.error('Geocode was not successful for the following reason:', status);
      }
    });
  } catch (error) {
    console.error('Error adding game data:', error);
    throw error;
  }
};
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal-dialog {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
  position:relative;
}

.btn-modal-close{
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.btn-modal-actions{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>