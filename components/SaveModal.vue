<template>
  <div class="modal-overlay">
    <div class="modal-dialog">
      <button class="btn btn-modal-close" @click="$emit('closeModal')">X</button>
      <form @submit.prevent="saveScores">
        <!-- Location dropdown -->
        <div>
          <select v-model="selectedLocation">
          <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
        </select>
        </div>


        <!-- Player scores input fields -->
        <div v-for="(player, index) in players" :key="index">
          <input v-model="player.name" placeholder="Player Name" />
          <input v-model="player.score" placeholder="Player Score" type="number" />
        </div>
        
        
      </form>
      <div class="btn-modal-actions">
        <button class="btn mr-2" @click="$emit('closeModal')">Dismiss</button>
        <button class="btn btn-primary" type="submit">Save</button>
        
      </div>

    </div>
  </div>

</template>

<script setup>
import { EmitFlags } from 'typescript';
import { ref } from 'vue';

const props = defineProps(['players']);
const selectedLocation = ref(null);
// const players = ref(props.players); // Initialize players with the received prop value

const locations = [
  { id: 1, name: 'Location 1' },
  { id: 2, name: 'Location 2' },
  // ... other locations
];

const saveScores = () => {
  // Save scores to the database using an API call or other logic
  console.log('Selected Location:', selectedLocation.value);
  console.log('Players Data:', players.value);
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