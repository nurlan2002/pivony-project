import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCYtvge85Vkv9LaFXaOR0RtldxcnnwGQ4Y",
    authDomain: "pivony-project.firebaseapp.com",
    projectId: "pivony-project",
    storageBucket: "pivony-project.appspot.com",
    messagingSenderId: "358722966873",
    appId: "1:358722966873:web:85a6c67bdaf7d6ad08a848",
    measurementId: "G-2D96XPY7J8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

const uploadPhoto = async (file) => {
    const uid = auth.currentUser.uid;

    const path = uid + "/profile.jpeg";

    await storage.ref(path).put(file);

    const url = await storage.ref(path).getDownloadURL();

    auth.currentUser.updateProfile({ photoURL: url });

    const doc = await db.collection("insights").doc(uid).get();

    if (doc.exists) {
        await db.collection("insights").doc(uid).update({ photo: url });
    }
};

const update = async (id, mode) => {
    const user = auth.currentUser;
    let obj;
    switch (mode) {
        case "like":
            obj = {
                likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
                dislikes: firebase.firestore.FieldValue.arrayRemove(user.uid)
            };
            break;
        case "dislike":
            obj = {
                likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
                dislikes: firebase.firestore.FieldValue.arrayUnion(user.uid),
            };
            break;
        case "reset":
            obj = {
                likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
                dislikes: firebase.firestore.FieldValue.arrayRemove(user.uid)
            };
            break;

        default:
            obj = {};
            break;
    }
    await db.collection("insights").doc(id).update(obj);
};

const getTimeStamp = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
};

export { firebaseApp, db, auth, uploadPhoto, getTimeStamp, update };
