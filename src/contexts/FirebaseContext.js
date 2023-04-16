import React, { useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

const FirebaseContext = React.createContext();

export function useAuth() {
  return useContext(FirebaseContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
      }
    );
  }

  async function register(email, password, displayName, address) {
    const registerUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: displayName,
        }).then(() => {
          setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            address: address,
            role: "guest",
          }).catch((error) => {
            return error.code;
          });
        });

        console.log(user);

        return true;
      })
      .catch((error) => {
        return error.code;
      });

    return registerUser;
  }

  async function logout() {
    return signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/login";
    });
  }

  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function authErrorHandler(authCode) {
    switch (authCode) {
      // authorization error code
      case "auth/wrong-password":
        return "Password yang anda masukkan salah.";

      case "auth/user-not-found":
        return "Email yang anda masukkan tidak terdaftar.";

      case "auth/too-many-requests":
        return "Terlalu banyak percobaan masuk, coba lagi nanti.";

      case "auth/missing-email":
        return "Email tidak terdaftar.";

      case "auth/invalid-email":
        return 'Masukkan email dengan format "email@email.com".';

      case "auth/email-already-in-use":
        return "Email telah terdaftar!";

      default:
        return "Proses masuk gagal, hubungi penyedia layanan.";
    }
  }

  async function fetchData(dataCol, dataDoc) {
    const dataRef = doc(db, dataCol, dataDoc);
    const docSnap = await getDoc(dataRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  async function fetchConstants(dataCol, dataDoc) {
    const constantRef = await fetchData(dataCol, dataDoc);

    if (constantRef) return constantRef;
    else return null;
  }

  async function fetchAssets(path, child) {
    const assetsRef = ref(storage, `${path}/${child}`);

    const downloadUrl = await getDownloadURL(assetsRef);

    if (downloadUrl) {
      return downloadUrl;
    } else {
      return null;
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  });

  const value = {
    register,
    login,
    logout,
    resetPassword,
    authErrorHandler,
    fetchConstants,
    fetchData,
    fetchAssets,
    currentUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
