import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Message({ message }) {
  const [user] = useAuthState(auth);
  const isMessageFromUser = user?.uid === message.userUid;
  const className = `${
    isMessageFromUser
      ? "place-self-end text-right"
      : "place-self-start text-left"
  }`;

  return (
    <div className="flex flex-col">
      <div className={className}>
        <div
          className={`p-3 rounded-2xl  ${
            isMessageFromUser
              ? "bg-green-400 text-green-900 rounded-tr-none"
              : "bg-slate-200 rounded-tr-none"
          }`}
        >
          {message.text}
        </div>
      </div>
      <p className={`${className} text-xs text-gray-400`}>
        {message.userUid} - {message.timestamp?.toDate()?.toLocaleString("no-NO")}
      </p>
    </div>
  );
}

export { Message };
