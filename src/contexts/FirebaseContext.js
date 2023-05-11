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
import {
  getDoc,
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const FirebaseContext = React.createContext();

export function useAuth() {
  return useContext(FirebaseContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("guest");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const getUserData = async () => {
          const userRef = doc(db, "users", user?.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUserRole(userDoc?.data()?.role);
          } else {
            setUserRole("guest");
          }
        };
        getUserData();
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user?.uid), (doc) => {
          setUserData(doc.data());
        });
      }
    });
  }, []);

  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
      }
    );
  }

  async function register(
    newEmail,
    newPassword,
    newName,
    newAddresses,
    newPhoneNumber
  ) {
    const registerUser = await createUserWithEmailAndPassword(
      auth,
      newEmail,
      newPassword
    )
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: newName,
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
          })
            .then(() => {
              setDoc(doc(db, "users", user.uid, "orders", "order_status"), {
                finished: [],
                processed: [],
              }).catch((error) => {
                return error.code;
              });
            })
            .catch((error) => {
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
    return sendEmailVerification(currentUser)
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error.code;
      });
  }

  async function editUserData(editedUser) {
    const updateUserData = await updateProfile(currentUser, {
      displayName: editedUser?.displayName,
    })
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error.code;
      });

    if (updateUserData === true) {
      const userRef = doc(db, "users", currentUser.uid);
      setDoc(userRef, editedUser, { merge: true });
    }

    return updateUserData;
  }

  async function uploadImage(imageRef, imageFile) {
    return uploadBytes(ref(storage, imageRef), imageFile);
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
        return "Proses gagal, hubungi penyedia layanan.";
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

  async function fetchCategory(categoryName) {
    const q = query(
      collection(db, "products"),
      where("category", "==", categoryName)
    );
    const result = getDocs(q).then((querySnapshot) => {
      const productData = [];
      querySnapshot.forEach((doc) => {
        productData.push({ id: doc.id, ...doc.data() });
      });
      return productData;
    });

    return result;
  }

  async function fetchConstants(dataCol, dataDoc) {
    const constantRef = await fetchData(dataCol, dataDoc);

    if (constantRef) return constantRef;
    else return null;
  }

  async function fetchCollection(dataCol) {
    const events = getDocs(collection(db, dataCol)).then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });

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

  async function updateData(dataCol, dataDoc, dataToChange, newData) {
    const dataRef = doc(db, dataCol, dataDoc);

    return await updateDoc(dataRef, {
      [dataToChange]: newData,
    })
      .then(() => {
        return true;
      })
      .catch((error) => {
        return error.code;
      });
  }

  async function addProductToCart(userId, productId) {
    const userRef = doc(db, "users", userId);
    const cart = (await getDoc(userRef)).data().cart;

    const existingItemIndex = cart.findIndex((item) => item.id === productId);
    if (existingItemIndex !== -1) {
      const prevItem = cart[existingItemIndex];
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...prevItem,
        quantity: prevItem.quantity + 1,
      };
      return await updateDoc(userRef, { cart: updatedCart })
        .then(() => {
          return true;
        })
        .catch((error) => {
          return error.code;
        });
    } else {
      return await updateDoc(userRef, {
        cart: arrayUnion({
          id: productId,
          quantity: 1,
        }),
      })
        .then(() => {
          return true;
        })
        .catch((error) => {
          return error.code;
        });
    }
  }

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
    fetchCategory,
    uploadImage,
    updateData,
    addProductToCart,
    currentUser,
    userRole,
    userData,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
