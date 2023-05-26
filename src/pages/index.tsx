import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen  ${inter.className}`}>
      <div className="container w-full max-w-[600px] mx-auto ">
        <div className="flex flex-col gap-5 min-h-screen ">
          <Header />
          <main className="flex sm:px-0 px-4 ">
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
              />
              <button className="px-5 py-3 bg-gray-800 text-white rounded-sm">
                Register
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </main>
  );
}
