import { useState, useEffect } from 'react';
import { auth } from '../Component/FirebaseConfig';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthOperation = async (operation) => {
    setLoading(true);
    try {
      await operation();
      return true; // Operation succeeded
    } catch (error) {
      setError(error.message);
      return false; // Operation failed
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    return await handleAuthOperation(async () => {
      await auth.signInWithEmailAndPassword(email, password);
    });
  };

  const createAccount = async (email, password) => {
    return await handleAuthOperation(async () => {
      await auth.createUserWithEmailAndPassword(email, password);
    });
  };

  const logout = async () => {
    return await handleAuthOperation(async () => {
      await auth.signOut();
    });
  };

  const sendEmailVerification = async () => {
    return await handleAuthOperation(async () => {
      const user = auth.currentUser;
      await user.sendEmailVerification();
    });
  };

  const resetPassword = async (email) => {
    return await handleAuthOperation(async () => {
      await auth.sendPasswordResetEmail(email);
    });
  };

  const updateProfile = async (displayName) => {
    return await handleAuthOperation(async () => {
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: displayName,
      });
      setUser({ ...user });
    });
  };

  const isEmailVerified = () => {
    return user ? user.emailVerified : false;
  };

  const getCurrentUser = () => {
    return user;
  };

  return {
    user,
    error,
    loading,
    login,
    createAccount,
    logout,
    sendEmailVerification,
    resetPassword,
    updateProfile,
    isEmailVerified,
    getCurrentUser,
  };
};
