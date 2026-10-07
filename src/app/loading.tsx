"use client";
const LoadingPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center bg-white px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center">

        {/* Spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-gray-100 border-t-red-600" />

          <div className="h-7 w-7 rounded-full bg-red-50" />
        </div>

        {/* Loading Text */}
        <h2 className="mt-6 text-lg font-semibold text-gray-800 sm:text-xl">
          লোড হচ্ছে...
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          অনুগ্রহ করে একটু অপেক্ষা করুন
        </p>

        {/* Loading Dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-600 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-red-600" />
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;

