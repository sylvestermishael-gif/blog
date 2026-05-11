import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { auth, googleProvider, signInWithPopup, signOut, db } from "../lib/firebase";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  following: string[];
  interests: string[];
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
  isFollowing: (userId: string) => boolean;
  toggleFollow: (userId: string) => Promise<void>;
  updateInterests: (interests: string[]) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Fetch current user's follows
          const fq = query(collection(db, "follows"), where("followerId", "==", currentUser.uid));
          const [followSnap, userSnap] = await Promise.all([
            getDocs(fq).catch(e => handleFirestoreError(e, OperationType.LIST, "follows")),
            getDoc(doc(db, "users", currentUser.uid)).catch(e => handleFirestoreError(e, OperationType.GET, `users/${currentUser.uid}`))
          ]);

          if (followSnap) {
            const followingIds = followSnap.docs.map(doc => doc.data().followingId);
            setFollowing(followingIds);
          }

          if (userSnap && userSnap.exists()) {
            setInterests(userSnap.data().interests || []);
          }
        } catch (error) {
          console.error("Failed to sync user data:", error);
        }
      } else {
        setFollowing([]);
        setInterests([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef).catch(e => handleFirestoreError(e, OperationType.GET, `users/${user.uid}`));
      
      if (userSnap && !userSnap.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName || user.email?.split('@')[0] || "World Explorer",
          email: user.email || null,
          photoURL: user.photoURL || null,
          createdAt: serverTimestamp(),
          interests: []
        }).catch(e => handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`));
      } else if (userSnap) {
        setInterests(userSnap.data().interests || []);
      }
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error; // Re-throw to show in UI if needed
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isFollowing = (userId: string) => {
    return following.includes(userId);
  };

  const toggleFollow = async (userId: string) => {
    if (!user) return;

    const followId = `${user.uid}_${userId}`;
    const followRef = doc(db, "follows", followId);

    try {
      if (isFollowing(userId)) {
        await deleteDoc(followRef).catch(e => handleFirestoreError(e, OperationType.DELETE, `follows/${followId}`));
        setFollowing(prev => prev.filter(id => id !== userId));
      } else {
        await setDoc(followRef, {
          followerId: user.uid,
          followingId: userId,
          createdAt: serverTimestamp()
        }).catch(e => handleFirestoreError(e, OperationType.WRITE, `follows/${followId}`));
        setFollowing(prev => [...prev, userId]);
      }
    } catch (error) {
      console.error("Toggle follow failed:", error);
    }
  };

  const updateInterests = async (newInterests: string[]) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    try {
      await setDoc(userRef, { interests: newInterests }, { merge: true }).catch(e => handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`));
      setInterests(newInterests);
    } catch (error) {
      console.error("Update interests failed:", error);
      throw error; // Re-throw so the UI knows it failed
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, following, interests, signIn, logout, isFollowing, toggleFollow, updateInterests }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
