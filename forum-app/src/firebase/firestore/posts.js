import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getAllPosts() {

    // Takes a snapshot of the posts collection as it is right now:
    const snapshot = await getDocs(collection(db, "posts"));

    // Maps over the documents in the snapshot and creates javascript object with ID and data:    
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return posts;
}