import { Socket } from "socket.io";
import { __cg } from "../../lib/utils/log.js";

export const handleSocket = (socket: Socket) => {
  __cg("client connected");

  socket.on("test_client", (data) => {
    __cg("data received as server", data);
    socket.emit("response_server", { msg: "I get data as server" });
  });

  socket.on("disconnect", () => {
    __cg("client disconnection");
  });
};
