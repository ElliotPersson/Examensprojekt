import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";


export function getAllPosts(callback) {

    // listens to post changes:
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {

        // convert snapshot into an array of all post objects:
        const posts = snapshot.docs.map(doc => ({

            id: doc.id,
            ...doc.data(), 

        }));
        callback(posts)

    })

    return unsubscribe;
}