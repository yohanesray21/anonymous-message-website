import { FieldValue, addDoc, serverTimestamp } from 'firebase/firestore';
import { usersDBRef } from '../../config/firebase';

export async function addRegisteredUserToDB(
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

export const setUserDataToLocalStorage = (
  username: string,
  secretKey: string,
  userId: string
) => {
  localStorage.setItem('username', username);
  localStorage.setItem('secretKey', secretKey);
  localStorage.setItem('userId', userId);
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const timeStamp = serverTimestamp();
