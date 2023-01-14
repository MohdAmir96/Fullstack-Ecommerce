import React, { createContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "products");
  // Get all products
  React.useEffect(() => {
    const getAllData = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAllData();
  }, []);

  const initialData = {
    users: [...users],
  };

  return (
    <AuthContext.Provider value={{ initialData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
