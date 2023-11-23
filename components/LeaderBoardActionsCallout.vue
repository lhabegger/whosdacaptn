<!-- Callout.vue -->
<template>
                    <div v-if="isVisible" class="callout" :style="{ top: positionY + 'px', left: positionX + 'px' }">
                        <button class="btn btn-modal-close" @click="$emit('hideCallout')">X</button>
                        <div>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, 10)">+10</button>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, 11)">+11</button>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, 12)">+12</button>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, 13)">+13</button>
                        </div>
                        <div>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, -1)">-1</button>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, -2)">-2</button>
                            <button class="btn btn-xs btn-primary join-item" @click="modifyScore(player, -3)">-3</button>
                        </div>
                        <div>
                            <input type="number" class="input input-bordered input-xs max-w-xs" placeholder="custom score"
                                v-model.number="customScore" />
                            <button class="btn btn-xs btn-primary" @click="modifyScore(player, customScore)">Go!</button>
                        </div>
                        <!-- <button class="btn btn-xs btn-error" @click="removePlayer()">Remove Player</button> -->
    </div>
</template>

<script setup lang="ts">

// Define the players prop
const { player, positionX, positionY } = defineProps(['player', 'positionX', 'positionY']);
const customScore = ref(0)
const emit = defineEmits();
const isVisible = ref(true); // Add this line to declare the isVisible property

// Function to emit the modifyScore event
const modifyScore = (playername: string, scoreChange: number) => {
    // Emit the event with player name and score change
    emit('modifyScore', playername, scoreChange);
};
</script>

<style scoped>
.callout {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 999;
}

.btn-modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}
</style>
