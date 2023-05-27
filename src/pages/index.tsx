import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';
import { signInAnonymously } from 'firebase/auth';
import { auth, db, usersDBRef } from '../../config/firebase';
import { sign } from 'crypto';
import {
  FieldValue,
  addDoc,
  collection,
  getDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { useState } from 'react';
import Message from './components/Message';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [username, setUsername] = useState('');

  const signIn = async () => {
    try {
      await signInAnonymously(auth).then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        const userToken = user.accessToken;
        const timeStamp = serverTimestamp();
        const secretKey = userId.substring(0, 6);

        addRegisteredUserToDB(
          username,
          userId,
          userToken,
          timeStamp,
          secretKey
        );

        setUserDataToLocalStorage(username, secretKey, userToken);
      });
      alert('success');
      setUsername('');
    } catch (error) {
      console.error(error);
    }
  };

  async function addRegisteredUserToDB(
    username: string,
    userId: string,
    token: string,
    timeStamp: FieldValue,
    secretKey: string
  ) {
    try {
      await addDoc(usersDBRef, {
        username,
        userId,
        token,
        timeStamp,
        secretKey,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const setUserDataToLocalStorage = (
    username: string,
    secretKey: string,
    token: string
  ) => {
    localStorage.setItem('username', username);
    localStorage.setItem('secretKey', secretKey);
    localStorage.setItem('token', token);
  };

  return (
    <main className={`min-h-screen  ${inter.className}`}>
      <div className="container w-full max-w-[600px] mx-auto ">
        <div className="flex flex-col gap-5 min-h-screen ">
          <Header />
          <main className="flex flex-col gap-5 sm:px-0 px-4 ">
            <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
              <h3 className="font-bold text-lg text-center">
                Secret Message Book
              </h3>

              <ul className="list-disc px-4">
                <li>Get anonymous feedback from your Friends & Coworkers.</li>
                <li>
                  Improve your Friendship by discovering your Strengths and
                  areas for Improvement
                </li>
              </ul>

              <input
                type="text"
                placeholder="Your Name"
                className="px-5 py-3 rounded-sm"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <button
                className="px-5 py-3 bg-gray-800 text-white rounded-sm disabled:bg-gray-500"
                onClick={signIn}
                disabled={username.length === 0}
              >
                Register
              </button>
            </div>
            <Message />
          </main>

          <Footer />
        </div>
      </div>
    </main>
  );
}
