import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db, auth } from "../Firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // Get All Products
  const [products, setProducts] = useState([]);
  const userCollectionRef = collection(db, "products");
  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (e) {
        console.log(e.message);
      }
    };
    getAllData();
  }, []);

  // Modal contorol
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Signup/login toggle control
  const [adminSignupPage, setAdminSignupPage] = useState(true);
  const [userSignupPage, setUserSignupPage] = useState(true);
  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        open,
        setOpen,
        handleClose,
        handleOpen,
        adminSignupPage,
        setAdminSignupPage,
        userSignupPage,
        setUserSignupPage,
        products,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
