import { db } from "../firebase";
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

// listens to comment changes in firestore and updates ui:
export function listenToComments(postId, callback) {
  const commentsRef = collection(db, "posts", postId, "comments");
   const q = query(commentsRef, orderBy("createdAt", "desc"))

  const unsubscribe = onSnapshot( q, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(comments);
  });

  return unsubscribe;
}

// add comment document:
export async function addComment(postId, commentData) {
  const commentsRef = collection(db, "posts", postId, "comments");
  await addDoc(commentsRef, {
    ...commentData,
    createdAt: serverTimestamp(),
  } );
}
