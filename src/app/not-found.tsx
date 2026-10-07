
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl text-center">

        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[100px] font-black leading-none tracking-tight text-red-600 sm:text-[140px] md:text-[180px]">
            404
          </h1>

          <div className="absolute inset-x-0 bottom-1 mx-auto h-3 w-28 rounded-full bg-red-100 blur-sm sm:w-40" />
        </div>

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-8 w-8 text-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 4V10m-6 4V10"
            />

            <rect
              width="12"
              height="12"
              x="6"
              y="6"
              rx="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        {/* Description */}
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত, আপনি যে সংবাদ বা পেজটি খুঁজছেন সেটি হয়তো সরিয়ে ফেলা
          হয়েছে, পরিবর্তন করা হয়েছে অথবা এই ঠিকানায় আর নেই।
        </p>

        {/* Home Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="
              flex h-12 w-full items-center justify-center
              rounded-xl border border-red-600 bg-red-600
              px-6 text-sm font-semibold text-white
              transition-all duration-200
              hover:bg-red-700 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-red-200
              active:scale-[0.98]
              min-[420px]:w-auto
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="mr-2 h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.954a1.125 1.125 0 011.592 0L21.75 12M4.5 9.75v9.75A1.5 1.5 0 006 21h4.5v-5.25h3V21H18a1.5 1.5 0 001.5-1.5V9.75"
              />
            </svg>

            হোম পেজে যান
          </Link>
        </div>

        {/* Bottom Message */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400 sm:text-sm">
            আপনি হয়তো ভুল ঠিকানায় চলে এসেছেন।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

