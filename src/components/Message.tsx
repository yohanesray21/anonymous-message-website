import React, { useCallback, useEffect, useState } from 'react';

import Comments from './Comments';
import { commentsDBRef, db } from '../../config/firebase';

import { timeStamp } from '@/utils';
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';

type MessageProps = {
  message: string;
  messageId: string;
  getMessageList: () => Promise<void>;
  isUserExist: boolean;
};

export type Comments = {
  comment: {
    text: string;
    messageId: string;
  };
  id: string;
};

const Message = ({
  message,
  messageId,
  getMessageList,
  isUserExist,
}: MessageProps) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comments[]>([]);

  const getCommentsList = useCallback(async () => {
    const orderByTimestamp = query(commentsDBRef, orderBy('timeStamp', 'desc'));
    const comments = await getDocs(orderByTimestamp);
    const allOfComments = comments.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Comments[];

    const filteredComments = allOfComments.filter((comment) => {
      return comment.comment.messageId === messageId;
    });

    if (!filteredComments) return;
    setComments(filteredComments);
  }, [messageId]);

  const deleteMessage = async () => {
    try {
      const commentDoc = doc(db, 'messages', messageId);
      await deleteDoc(commentDoc);
      getMessageList();
    } catch (error) {
      console.error(error);
    }
  };

  const addNewComment = async (message: string) => {
    try {
      await addDoc(commentsDBRef, {
        comment: {
          text: message,
          messageId: messageId,
        },
        timeStamp: timeStamp,
      });

      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewComment(newComment);
    getCommentsList();
  };

  useEffect(() => {
    getCommentsList();
  }, [getCommentsList]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="relative">
        {isUserExist && (
          <button className="absolute right-0 top-0" onClick={deleteMessage}>
            x
          </button>
        )}
        <span>{message}</span>
      </div>
      <form onSubmit={(e) => onSubmitComment(e)}>
        <label className="relative block">
          <button
            className="absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer"
            type="submit"
          >
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="text"
            name="search"
            placeholder="Write a comment"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              console.log(newComment);
            }}
            required
          />
        </label>
      </form>
      {comments.map((comment) => {
        return (
          <Comments
            comment={comment.comment.text}
            commentId={comment.id}
            getCommentsList={getCommentsList}
            key={comment.id}
          />
        );
      })}
    </div>
  );
};

export default Message;
