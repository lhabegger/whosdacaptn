import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyDteIYUO-aZQt0u2QFXoT3de_uBV8IBY34",
        authDomain: "whos-da-captn.firebaseapp.com",
        projectId: "whos-da-captn",
        storageBucket: "whos-da-captn.appspot.com",
        messagingSenderId: "923473815967",
        appId: "1:923473815967:web:631e2371048d85a5ce75aa",
        measurementId: "G-P1X5TFWDHE"
    };

    const app = initializeApp(firebaseConfig)

    const db = getFirestore(app)
    
    nuxtApp.vueApp.provide('db', db)
    nuxtApp.provide('db', db)
})