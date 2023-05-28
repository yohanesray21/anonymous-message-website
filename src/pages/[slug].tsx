import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Message from '../components/Message';
import InputSection from '../components/InputSection';

import { addDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { messagesDBRef, usersDBRef } from '../firebase';

import { getUserId, timeStamp } from '@/utils';

const inter = Inter({ subsets: ['latin'] });

export type Messages = {
  messageId: string;
  message: {
    userId: string;
    text: string;
  };
};

type DetailMessageProps = {
  slug: string;
};

const DetailMessage = ({ slug }: DetailMessageProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);
  const [isUserExist, setIsUserExist] = useState(false);

  const getMessageList = useCallback(async () => {
    const orderByTimestamp = query(messagesDBRef, orderBy('timeStamp', 'desc'));
    const messages = await getDocs(orderByTimestamp);
    const allOfMessages = messages.docs.map((doc) => ({
      ...doc.data(),
      messageId: doc.id,
    })) as Messages[];

    const filteredMessage = allOfMessages.filter((message) => {
      return slug === message?.message?.userId;
    });

    if (!filteredMessage.length) return;
    setMessages(filteredMessage);
  }, [slug]);

  const validateUser = () => {
    if (getUserId()) {
      setIsUserExist(true);
    } else {
      setIsUserExist(false);
    }
  };

  const addNewMessage = async (message: string) => {
    try {
      await addDoc(messagesDBRef, {
        message: {
          text: message,
          userId: slug,
        },
        timeStamp: timeStamp,
      });

      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewMessage(message);
    getMessageList();
  };

  useEffect(() => {
    getMessageList();
    validateUser();
  }, [getMessageList]);

  return (
    <div className={`min-h-screen  ${inter.className}`}>
      <div className="container w-full max-w-[600px] mx-auto ">
        <div className="flex flex-col gap-5 min-h-screen ">
          <Header />

          <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
            {isUserExist ? (
              <InputSection link={`http://localhost:3000/${slug}`} />
            ) : (
              <div className="flex flex-col gap-3">
                <h1 className="text-center text-lg">SEND SECRET MESSAGE TO</h1>
                <span className="text-center text-lg font-bold">Yohanes</span>
                <span className="text-center text-lg ">
                  Yohanes will never know who sent this message
                </span>

                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => onSubmitMessage(e)}
                >
                  <textarea
                    className="px-5 py-3"
                    placeholder="Write Secret Message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required
                  ></textarea>
                  <button
                    className="px-5 py-3 bg-orange-100 text-black rounded-sm border-solid border-2 border-orange-300 disabled:opacity-60"
                    type="submit"
                    disabled={message.length === 0}
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
            <div className="py-5 px-4 bg-slate-100 flex flex-col gap-6 rounded-sm">
              <h3>
                Timeline of <span className="font-bold">Test</span>
              </h3>
              {messages.length > 0 &&
                messages.map((message, index) => {
                  return (
                    <Message
                      message={message.message.text}
                      messageId={message.messageId}
                      getMessageList={getMessageList}
                      isUserExist={isUserExist}
                      key={index}
                    />
                  );
                })}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  console.log(params);

  const secretKey = query(usersDBRef, where('secretKey', '==', slug));
  const user = await getDocs(secretKey);

  const allOfUser = user.docs.map((doc) => ({
    ...doc.data(),
  }));

  if (!allOfUser.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      slug,
    },
  };
};
export default DetailMessage;
