import type { Socket } from "socket.io";

let mapSocketToUser: Record<string, string> = {};
let mapUserToSocket: Record<string, string> = {};
let rooms: Record<string, string[]> = {};

export const handleSocketIO = (socket: Socket) => {};
