import { initializeApp, cert,  AppOptions } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const config = {
     credential: cert({
        projectId: useRuntimeConfig().projectId,
      clientEmail: useRuntimeConfig().clientEmail,
      privateKey: useRuntimeConfig().privateKey.replace(/\\n/g, "\n"),
    }),
     databaseURL: "https://whos-da-captn.firebaseio.com",
  };
export const app = initializeApp({
    credential: cert('./service-account.json'),
    //config
})

export const firestore = getFirestore();