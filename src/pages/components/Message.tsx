import React from 'react';

const Message = () => {
  return (
    <>
      <button className="px-5 py-3 bg-orange-100 text-black rounded-sm border-solid border-2 border-orange-300">
        My Message
      </button>

      <div className="bg-slate-300 py-5 px-4 flex flex-col gap-3 rounded-sm">
        <div className="py-5 px-4 bg-slate-100 flex flex-col gap-6 rounded-sm">
          <span>Message</span>

          <div className="flex flex-col gap-4 ">
            <label className="relative block">
              <span
                className="absolute inset-y-0 right-2 flex items-center pl-2 cursor-pointer"
                onClick={() => {}}
              >
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Write Your Message..."
                type="text"
                name="search"
              />
            </label>

            <div className="bg-orange-100 py-1 px-2 rounded-lg relative">
              <span>Hello</span>
              <span className="absolute -right-2.5 -top-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
