import { FC, ReactNode, useEffect, useState } from "react";
import { SocketCtx } from "./SocketCtx";
import { io, Socket } from "socket.io-client";
import { backSocket } from "@/config/env";

type PropsType = {
  children: ReactNode;
};

const SocketCtxProvider: FC<PropsType> = ({ children }) => {
  const [val, setVal] = useState<Socket | null>(null);

  useEffect(() => {
    const connection = io(backSocket, {
      transports: ["websocket"],
    });

    setVal(connection);

    return () => {
      connection.disconnect();
    };
  }, []);

  return (
    <SocketCtx.Provider value={{ socket: val as Socket }}>
      {children}
    </SocketCtx.Provider>
  );
};
export default SocketCtxProvider;
