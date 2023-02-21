import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';
import { useHistory } from 'react-router-dom';
import NavbarLogin from './NavbarLogin/NavbarLogin';
import NavbarLogout from './NavbarLogout/NavbarLogout';

export default function Navbar() {
  const history = useHistory();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      setUserSession(user);
    });
    return listener;
  }, []);

  return (
    <>
      {userSession ? <NavbarLogin /> : <NavbarLogout />}
    </>
  );
}