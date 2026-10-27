
"use client";

import Link from "next/link";
import { useState } from "react";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const MobileNav = ({ navs }: { navs: Navs[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-800 transition-colors hover:text-red-600"
        aria-label="Open navigation menu"
      >
        <span className="text-2xl leading-none">☰</span>
        <span>মেনু</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-red-700">
            Bangla News 24
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <form
          action="/search"
          method="get"
          role="search"
          className="border-b border-gray-100 px-5 py-3"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="sidebar-search-input" className="sr-only">
              খবর খুঁজুন
            </label>

            <input
              id="sidebar-search-input"
              type="search"
              name="q"
              required
              placeholder="খবর খুঁজুন..."
              className="h-10 w-full min-w-0 rounded-lg border border-gray-300 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            <button
              type="submit"
              aria-label="সার্চ করুন"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </div>
        </form>

        {/* Navigation */}
        <nav className="flex flex-col py-3">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="border-b border-gray-100 px-5 py-3.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            হোম
          </Link>

          {/* Categories */}
          {navs.map((n) => (
            <Link
              key={n.slug}
              href={`/category/${n.slug}`}
              onClick={() => setIsOpen(false)}
              className="border-b border-gray-100 px-5 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              {n.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default MobileNav;

