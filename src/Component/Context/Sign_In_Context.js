import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';
export const UserContext = createContext();

export const Sign_In_Context = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(function (usr) {
      if (usr) {
        const { email, emailVerified } = usr;
        const updateUser = {
          isSignIn: true,
          email: email,
          emailVerified,
        };
        setUser(updateUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
