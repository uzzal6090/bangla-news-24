
"use client";

import { useState } from "react";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ============ Desktop Search ============ */}
      <form
        action="/search"
        method="get"
        role="search"
        className="hidden items-center gap-2 md:flex"
      >
        <label htmlFor="desktop-search-input" className="sr-only">
          খবর খুঁজুন
        </label>

        <input
          id="desktop-search-input"
          type="search"
          name="q"
          required
          placeholder="খবর খুঁজুন..."
          className="h-10 w-40 rounded-full border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100 lg:w-56"
        />

        <button
          type="submit"
          aria-label="সার্চ করুন"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </form>

      {/* ============ Mobile Search ============ */}
      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="সার্চ করুন"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-red-300 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          <SearchIcon className="h-5 w-5" />
        </button>

        {open && (
          <>
            {/* Backdrop */}
            <button
              type="button"
              aria-label="সার্চ বন্ধ করুন"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 cursor-default"
            />

            {/* Expandable Search Form */}
            <form
              action="/search"
              method="get"
              role="search"
              className="
                absolute right-0 top-full z-50 mt-2
                w-[calc(100vw-2rem)] max-w-sm
                rounded-xl border border-gray-200 bg-white p-2 shadow-lg
              "
            >
              <div className="flex items-center gap-2">
                <label htmlFor="mobile-search-input" className="sr-only">
                  খবর খুঁজুন
                </label>

                <input
                  id="mobile-search-input"
                  type="search"
                  name="q"
                  required
                  autoFocus
                  placeholder="খবর খুঁজুন..."
                  className="
                    h-11 w-full min-w-0 rounded-lg border border-gray-300 px-4
                    text-sm text-gray-900 outline-none transition
                    placeholder:text-gray-400
                    focus:border-red-500 focus:ring-2 focus:ring-red-100
                  "
                />

                <button
                  type="submit"
                  className="
                    h-11 shrink-0 rounded-lg bg-red-600 px-4
                    text-sm font-semibold text-white transition
                    hover:bg-red-700
                    focus:outline-none focus:ring-2 focus:ring-red-300
                  "
                >
                  সার্চ
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default SearchBar;
