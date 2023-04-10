import React, { useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

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
        return "Masukkan email dengan format 'example@email.com'";

      default:
        return "Proses masuk gagal, hubungi penyedia layanan.";
    }
  }

  useEffect(() => {
    // auth.onAuthStateChanged(setCurrentUser);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  });

  const value = {
    login,
    logout,
    resetPassword,
    authErrorHandler,
    currentUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
