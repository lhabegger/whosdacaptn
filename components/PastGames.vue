<template>
            <!-- Past Games -->
            <section class="container py-5">
                <h3 class="heading3">Past Games</h3>
                <table class="table table-auto table-zebra">
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Winner</th>
                            <th>Highest Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="game in games" :key="game.id">
                        <td>{{ getLocationAddress(game.data.Ort._latitude, game.data.Ort._longitude) }}</td>
                        <td>{{ getWinner(game.data.players).name }}</td>
                        <td>{{ getWinner(game.data.players).score }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
</template>

<script setup  lang="ts">
    // DB Interaction for past games //////////////////////////////////////////////
interface Game {
    id: number;
    data: {
        Ort: string;
        players: string[];
        // Add other properties as needed
    };
}
const games = ref<Array<Game>>([]);

// const formattedGames = computed(async () => {
//     return Promise.all(
//         games.value.map(async (game) => {
//             const location = await getLocationAddress(
//                 game.data.Ort._latitude,
//                 game.data.Ort._longitude
//             );
//             const winner = getWinner(game.data.players);
//             return { location, winner };
//         })
//     );
// });
// console.log(formattedGames)

const getLocationAddress = (latitude: number, longitude: number) => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };

    return new Promise<string>((resolve, reject) => {
        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK' && results[0]) {
                resolve(results[0].formatted_address);
            } else {
                console.error(`Geocoder failed due to: ${status}`);
                reject(new Error(`Geocoder failed due to: ${status}`));
            }
        });
    });
};

const getWinner = (players: { name: string; score: number }[]): { name: string; score: number } => {
    // Ensure players array exists and is not empty
    if (!players || players.length === 0) {
        return { name: '', score: 0 };
    }

    // Find the player with the highest score
    const winner = players.reduce((prev, current) => (prev.score > current.score ? prev : current), players[0]);
    return winner;
};

onMounted(async () => {
    try {
        const response = await fetch('/api/animal');
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