import firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const messaging = firebase.messaging();
const firestore = firebase.firestore();

/* register service worker */
window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
        });
        registration.update();
        messaging.useServiceWorker(registration);
    }
});

firestore.settings({
    timestampsInSnapshots: true
});

export {
    firebase,
    messaging,
    firestore
};