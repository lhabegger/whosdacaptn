import { firestore } from '../utils/firestore';

export default defineEventHandler(async event => {
    const ref = firestore.collection(`games`);
    const snapshot = await ref.get();
    const games = [];
  
    snapshot.forEach(doc => {
      games.push({
        id: doc.id,
        data: doc.data(),
      });
    });
  
    return {
      games
    };
  });