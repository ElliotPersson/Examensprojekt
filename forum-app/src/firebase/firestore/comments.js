import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function addComment(postId, commentData) {
    const commentsRef = collection(db, "posts", postId, "comments");
    await addDoc(commentsRef, { ...commentData, createdAt: serverTimestamp() })
}

export async function getComments(postId) {
    const commentsRef = collection(db, "posts", postId, "comments");
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}