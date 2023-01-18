import { MessageList } from "@/components/MessageList";
import { auth, db } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat() {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageRef = await addDoc(collection(db, "messages"), {
      timestamp: serverTimestamp(),
      text: message,
      userUid: user.uid,
    });

    if (messageRef.id) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
      setMessage("");
    }
  };

  const updateMessage = (e) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="p-8">
      <MessageList />
      <span ref={dummy}></span>
      <div className="fixed bg-gray-700 bottom-0 right-0">
        <form className="flex justify-between" onSubmit={sendMessage}>
          <input
            value={message}
            name="melding"
            className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-whiteresize-none outline-none"
            placeholder="Skriv en melding"
            onChange={updateMessage}
          />
          <button className="m-2 outline-none text-white">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
