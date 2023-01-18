import { db } from "@/config/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

function getMessages(callback) {
  return onSnapshot(
    query(collection(db, "messages"), orderBy("timestamp", "asc")),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = getMessages(setMessages);
    return unsubscribe;
  }, []);

  return messages;
}

export { useMessages };
