'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await updateLastLogin(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateLastLogin = async (user) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        lastLogin: serverTimestamp()
      });
    } catch (error) {
      // If document doesn't exist, create it
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName || '',
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp(),
        plan: 'free'
      });
    }
  };

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, { displayName: name });
    
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: name,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      plan: 'free'
    });
    
    return user;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        plan: 'free'
      });
    }
    
    return user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loginWithGoogle,
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}