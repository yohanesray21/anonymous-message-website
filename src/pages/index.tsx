import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

import Header from './components/Header';
import Footer from './components/Footer';

import { auth } from '../../config/firebase';
import { signInAnonymously } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';

import { addRegisteredUserToDB, setUserDataToLocalStorage } from '@/utils';
import { useRouter } from 'next/router';
import InputSection from './components/InputSection';
import MessageButton from './components/MessageButton';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [link, setLink] = useState('');
  const [userInLocalStorage, setUserInLocalStorage] = useState<null | string>(
    null
  );

  function getDataFromLocalStorage() {
    const user = localStorage.getItem('username');
    const secretKey = localStorage.getItem('secretKey');
    if (!user) return;
    setUserInLocalStorage(user);
    setLink(`http://localhost:3000${router.pathname}${secretKey}`);
  }

  const signIn = async () => {
    try {
      await signInAnonymously(auth).then((userCredential) => {
        const user: any = userCredential.user;
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

        setUserDataToLocalStorage(username, secretKey, userId);
        getDataFromLocalStorage();
      });
      alert('success');
      setUsername('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <div className={`min-h-screen  ${inter.className}`}>
      <div className="container w-full max-w-[600px] mx-auto ">
        <div className="flex flex-col gap-5 min-h-screen ">
          <Header />
          <div className="flex flex-col gap-5 sm:px-0 px-4 ">
            <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
              {!userInLocalStorage && (
                <>
                  <h3 className="font-bold text-lg text-center">
                    Secret Message Book
                  </h3>

                  <ul className="list-disc px-4">
                    <li>
                      Get anonymous feedback from your Friends & Coworkers.
                    </li>
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
                </>
              )}

              {userInLocalStorage && <InputSection link={link} />}
            </div>
            {userInLocalStorage && <MessageButton link={link} />}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
