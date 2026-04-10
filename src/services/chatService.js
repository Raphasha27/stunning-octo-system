import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const chatService = {
  // Setup real-time listener for messages in a chat conversation
  subscribeToMessages: (chatId, callback) => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  },

  // Send a new message
  sendMessage: async (chatId, senderId, text) => {
    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId,
        text,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error sending message: ", error);
      throw error;
    }
  },

  // Get or Create a chat session ID (simple version: tutorId + studentId)
  getChatId: (tutorId, studentId) => {
    return [tutorId, studentId].sort().join("_");
  }
};
