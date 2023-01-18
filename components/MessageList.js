import { useMessages } from "@/hooks/useMessages";
import { Message } from "./Message";


function MessageList() {
  const messages = useMessages();

  return (
    <div className="space-y-4 grid grid-cols-1 pb-20">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export { MessageList };
