import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const TUTORS_COLLECTION = "tutors";

export const tutorService = {
  // Get all tutors
  getAllTutors: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, TUTORS_COLLECTION));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting tutors: ", error);
      throw error;
    }
  },

  // Filter tutors by subject
  getTutorsBySubject: async (subject) => {
    try {
      const q = query(collection(db, TUTORS_COLLECTION), where("subject", "==", subject));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error filtering tutors: ", error);
      throw error;
    }
  },

  // Add a new tutor (useful for the "Register as Tutor" feature)
  registerTutor: async (tutorData) => {
    try {
      const docRef = await addDoc(collection(db, TUTORS_COLLECTION), {
        ...tutorData,
        rating: 5.0,
        reviews: 0,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error registering tutor: ", error);
      throw error;
    }
  }
};
