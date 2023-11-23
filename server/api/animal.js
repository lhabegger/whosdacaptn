import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firestore';

export default defineEventHandler(async (event) => {
  try {
    const gamesRef = collection(firestore, 'games');
    const snapshot = await getDocs(gamesRef);

    const games = snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return {
      games,
    };
  } catch (error) {
    console.error('Error fetching games:', error);
    return {
      statusCode: 500,
      message: 'Internal Server Error',
    };
  }
});