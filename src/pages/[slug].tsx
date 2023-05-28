import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import { useRouter } from 'next/router';
import InputSection from './components/InputSection';
import { getDocs } from 'firebase/firestore';
import { messagesDBRef } from '../../config/firebase';
import { getUserId } from '@/utils';
import Message from './components/Message';

const inter = Inter({ subsets: ['latin'] });

export type Messages = {
  messageId: string;
  message: {
    userId: string;
    text: string;
  };
};

const DetailMessage = () => {
  const router = useRouter();

  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    setLink(`http://localhost:3000${router.asPath}`);
  }, [router]);

  const getMessageList = async () => {
    const messages = await getDocs(messagesDBRef);
    const allOfMessages = messages.docs.map((doc) => ({
      ...doc.data(),
      messageId: doc.id,
    })) as Messages[];

    const filteredMessage = allOfMessages.filter((message) => {
      return getUserId()?.includes(message.message.userId);
    });

    console.log(filteredMessage);

    if (!filteredMessage) return;

    setMessages(filteredMessage);
  };

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <div className={`min-h-screen  ${inter.className}`}>
      <div className="container w-full max-w-[600px] mx-auto ">
        <div className="flex flex-col gap-5 min-h-screen ">
          <Header />

          <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
            <InputSection link={link} />
          </div>

          <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
            <div className="py-5 px-4 bg-slate-100 flex flex-col gap-6 rounded-sm">
              <h3>
                Timeline of <span className="font-bold">Test</span>
              </h3>
              {messages.length !== 0 &&
                messages.map((message, index) => {
                  return (
                    <Message
                      message={message.message.text}
                      messageId={message.messageId}
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

export default DetailMessage;
