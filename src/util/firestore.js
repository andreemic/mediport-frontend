import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyDHtlmzSYjAyupC5mDum2KGwTN1qXhBE1M",
    authDomain: "mediport-23.firebaseapp.com",
    projectId: "mediport-23",
    storageBucket: "mediport-23.appspot.com",
    messagingSenderId: "458414306135",
    appId: "1:458414306135:web:1b62505114d9d600af8412",
    measurementId: "G-EPL1ZYFJ3E"
};
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

export function parseDocs(docs) {
    return docs.map(d => {
        return {...d.data(), id: d.id}
    })
}