import { useRouter } from 'next/router';
import React, { useState } from 'react';

const MessageButton = ({ link }: { link: string }) => {
  const route = useRouter();

  return (
    <button
      className="px-5 py-3 bg-orange-100 text-black rounded-sm border-solid border-2 border-orange-300"
      onClick={() => route.push(link)}
    >
      My Message
    </button>
  );
};

export default MessageButton;
