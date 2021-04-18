import firebase from "firebase";
import cred from "./cred"
console.log(process.env)
var firebaseConfig = {
    apiKey: cred.REACT_APP_FIREBASE_API_KEY,
    authDomain: cred.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: cred.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "mediport-23.appspot.com",
    messagingSenderId: "458414306135",
    appId: cred.REACT_APP_FIREBASE_APP_ID ,
    measurementId: "G-EPL1ZYFJ3E"
};
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();

export function parseDocs(docs) {
    return docs.map(d => {
        return {...d.data(), id: d.id}
    })
}