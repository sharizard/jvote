import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function useName(user) {
  const [name, setName] = useState(user?.displayName || user?.email || "");

  async function fetchNameFromDb(user) {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists()) {
        setName(docSnap.data().name);
      }
    }
  }

  useEffect(() => {
    fetchNameFromDb(user);
  }, [user]);

  return name;
}

export { useName };
