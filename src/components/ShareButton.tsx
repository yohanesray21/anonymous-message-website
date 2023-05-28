import Link from 'next/link';
import React from 'react';

import { AiOutlineWhatsApp, AiFillTwitterCircle } from 'react-icons/ai';

const ShareButtons = ({ link }: { link: string }) => {
  return (
    <>
      <Link
        href={`whatsapp://send?text=Share feedback about Test anonymously. %0ATest will never know who sent the message.%0A😍 *SECRET BOOK* 😍 %0A ${link}`}
      >
        <button className="w-full px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-sm text-white flex gap-2 justify-center">
          <AiOutlineWhatsApp size="24px" />
          <span className="flex-1">Whatsapp Status</span>
        </button>
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?text=Share feedback about Test anonymously. Test will never know who sent the message. 😍 SECRET BOOK 😍 %0A${link}`}
      >
        <button className="w-full px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-sm text-white flex gap-2 justify-center">
          <AiFillTwitterCircle size="24px" />

          <span className="flex-1">Twitter</span>
        </button>
      </Link>
    </>
  );
};

export default ShareButtons;
