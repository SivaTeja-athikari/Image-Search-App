import React, { useState } from 'react';
import Images from '../Images';
import { openDB } from 'idb';

const dbName = 'userDB';
const storeName = 'users';

const SignupLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    const db = await openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName, { keyPath: 'username' });
      }
    });
    await db.put(storeName, { username, password });
    setUsername('');
    setPassword('');
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const db = await openDB(dbName, 1);
    const user = await db.get(storeName, username);
    if (user && user.password === password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {isLoggedIn ? (
        <Images/>
      ) : (
        <>
          <form onSubmit={handleSubmitSignup}>
            <h2>Sign up</h2>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Sign up</button>
          </form>
          <form onSubmit={handleSubmitLogin}>
            <h2>Login</h2>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignupLogin;
