import React, { useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

  async function register(newEmail, newPassword, newName, newAddresses, newPhoneNumber) {
    const registerUser = await createUserWithEmailAndPassword(
      auth,
      newEmail,
      newPassword
    )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: newName
        }).then(() => {
          setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            addresses: newAddresses,
            phone_number: newPhoneNumber,
            profile_picture: "",
            cart: [],
            wishlist: [],
            role: "guest",
          }).then(() => {
            setDoc(doc(db, "users", user.uid, "orders", "order_status"), {
              finished: [],
              processed: [],
            }).catch((error) => {
              return error.code;
            })
          }).catch((error) => {
            return error.code;
          });
        });
        return true;
      })
      .catch((error) => {
        return error.code;
      });

    return registerUser;
  }

  async function verifyEmail() {
    return sendEmailVerification(currentUser).then(() => {
      return true
    }).catch((error) => {
      return error.code;
    })
  }

  async function editUserData(editedUser) {
    const updateUserData = await updateProfile(currentUser, {
      displayName: editedUser?.displayName
    }).then(() => {
      return true;
    }).catch((error) => {
      return error.code
    })

    if (updateUserData === true) {
      const userRef = doc(db, "users", currentUser.uid);
      setDoc(userRef, editedUser, { merge: true });
    }

    return updateUserData;
  }

  async function uploadImage(imageRef, imageFile) {
    return uploadBytes(ref(storage, imageRef), imageFile)
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

  async function fetchCollection(dataCol) {
    const events = getDocs(collection(db, dataCol))
      .then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })

        return tempDoc;
      });

    return events;
  }

  async function fetchSubDoc(dataCol, dataDoc, dataSubCol, dataSubDoc) {
    const dataRef = doc(db, dataCol, dataDoc, dataSubCol, dataSubDoc);
    const docSnap = await getDoc(dataRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
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
    editUserData,
    authErrorHandler,
    verifyEmail,
    fetchConstants,
    fetchData,
    fetchAssets,
    fetchCollection,
    fetchSubDoc,
    uploadImage,
    currentUser,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
