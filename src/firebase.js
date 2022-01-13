import firebase from "firebase/compat";



const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyCAeWnsr4KU_OSovuG8glb_rJl9agkJOT8",
    authDomain: "instagram-clone-react-64a18.firebaseapp.com",
    projectId: "instagram-clone-react-64a18",
    storageBucket: "instagram-clone-react-64a18.appspot.com",
    messagingSenderId: "454479612029",
    appId: "1:454479612029:web:e0fff227aa4e814a2f4914"
})
export default firebaseApp;

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export {db, auth, storage}
