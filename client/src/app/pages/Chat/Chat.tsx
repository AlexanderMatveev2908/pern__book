import { useSocket } from "@/contexts/socket/SocketCtx";
import { FC, useEffect } from "react";

const Chat: FC = () => {
  const { socket } = useSocket() ?? {};

  useEffect(() => {
    if (socket) {
      socket.emit("test_client", { msg: "I send data as client" });

      socket.on("response_server", (res) => {
        console.log(res);
      });
    }
  }, [socket]);

  return <div>Chat</div>;
};
export default Chat;
