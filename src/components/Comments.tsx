import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { commentsDBRef, db } from '../../config/firebase';
import { getUserId } from '@/utils';

type CommentProps = {
  comment: string;
  commentId: string;
  getCommentsList: () => Promise<void>;
};

const Comments = ({ comment, commentId, getCommentsList }: CommentProps) => {
  const [isUserExist, setIsUserExist] = useState(false);

  const deleteComments = async () => {
    try {
      const commentDoc = doc(db, 'comments', commentId);
      await deleteDoc(commentDoc);
      getCommentsList();
    } catch (error) {
      console.error(error);
    }
  };

  const validateUser = () => {
    if (getUserId()) {
      setIsUserExist(true);
    } else {
      setIsUserExist(false);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <div className="bg-orange-100 py-1 px-2 rounded-lg relative">
      <span>{comment}</span>
      {isUserExist && (
        <button
          className="absolute -right-2.5 -top-2.5"
          onClick={deleteComments}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Comments;
