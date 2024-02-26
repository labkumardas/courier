"use strict";
import { Server } from 'socket.io';
export default class SocketManager {

  constructor(httpServer) {
    this.io = new Server(httpServer);
    this.initializeSocketEvents();
  }

  initializeSocketEvents() {

    this.io.on('connection', (socket) => {
      socket.on('friendRequest', (data) => {
        this.handleFriendRequest(socket, data);
      });

      socket.on('sendMessage', (data) => {
        this.handleSendMessage(socket, data);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });

    });
  }

  handleFriendRequest(socket, data) {
    // Process friend request logic
    // You can emit an event to notify the specific user about the friend request
    const recipientSocket = this.findUserSocket(data.recipientUserId);

    if (recipientSocket) {
      recipientSocket.emit('friendRequestNotification', { senderUserId: data.senderUserId });
    }
  }

  handleSendMessage(socket, data) {
    // Process message logic
    // Save the message to the database, etc.
    // You can emit the message to the sender and receiver as shown in the previous example
    const recipientSocket = this.findUserSocket(data.recipientUserId);
    if (recipientSocket) {
      recipientSocket.emit('newMessageNotification', { senderUserId: data.senderUserId, message: data.message });
    }
  }

  findUserSocket(userId) {

    // Logic to find the socket associated with the specified user ID.
    // You may need to maintain a data structure (e.g., a map) to store user socket associations
    // Example: const userSocketMap = new Map(); userSocketMap.set(userId, socket);
    // Return the socket associated with the userId or null if not found.

  }
}
