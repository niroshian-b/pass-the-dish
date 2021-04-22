import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAyPX26VvYQsqBDym1cJalMsVtY2sd1sMQ',
	authDomain: 'passthedish-v2.firebaseapp.com',
	projectId: 'passthedish-v2',
	storageBucket: 'passthedish-v2.appspot.com',
	messagingSenderId: '313963087499',
	appId: '1:313963087499:web:52036a95a5da3c11a2368e',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
