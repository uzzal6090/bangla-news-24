
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

