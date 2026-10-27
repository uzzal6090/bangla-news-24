
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSignout = async () => {
    setIsOpen(false);
    await authClient.signOut();
  };

  return (
    <div ref={menuRef} className="relative">

      {/* ===================== Desktop ===================== */}
      {user ? (
        <div className="hidden items-center gap-2.5 md:flex">

          {/* Profile */}
          <Link
            href="/profile"
            className="flex items-center gap-2.5 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition-colors hover:border-red-200 hover:bg-red-50"
          >
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User avatar"}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
                <UserIcon className="h-5 w-5" />
              </span>
            )}

            <span className="max-w-[120px] truncate text-sm font-semibold text-gray-800">
              {user.name || "User"}
            </span>
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleSignout}
            className="
              rounded-md border border-gray-300 px-3.5 py-2
              text-sm font-semibold text-gray-600 transition
              hover:border-red-300 hover:bg-red-50 hover:text-red-600
              focus:outline-none focus:ring-2 focus:ring-red-200
            "
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="hidden items-center gap-2.5 md:flex">

          {/* Sign In — outline style */}
          <Link
            href="/signin"
            className="
              rounded-md border border-red-600 bg-white px-5 py-2
              text-sm font-semibold text-red-600 transition
              hover:bg-red-50
              focus:outline-none focus:ring-2 focus:ring-red-300
            "
          >
            সাইন ইন
          </Link>

          {/* Sign Up — solid style */}
          <Link
            href="/signup"
            className="
              rounded-md bg-red-600 px-5 py-2
              text-sm font-semibold text-white shadow-sm transition
              hover:bg-red-700
              focus:outline-none focus:ring-2 focus:ring-red-300
            "
          >
            সাইন আপ
          </Link>
        </div>
      )}

      {/* ===================== Mobile Icon Trigger ===================== */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="অ্যাকাউন্ট মেনু"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="
          flex h-10 w-10 items-center justify-center rounded-full
          border border-gray-200 text-gray-700 transition
          hover:border-red-300 hover:text-red-600
          focus:outline-none focus:ring-2 focus:ring-red-200
          md:hidden
        "
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name || "User avatar"}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : user ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600">
            <UserIcon className="h-5 w-5" />
          </span>
        ) : (
          <UserIcon className="h-5 w-5" />
        )}
      </button>

      {/* ===================== Mobile Dropdown ===================== */}
      {isOpen && (
        <div
          className="
            absolute right-0 top-full z-50 mt-2 w-56
            overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl
            md:hidden
          "
        >
          {user ? (
            <>
              {/* User Info */}
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.name || "User"}
                </p>

                {user.email && (
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                )}
              </div>

              {/* Profile */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                প্রোফাইল
              </Link>

              {/* Sign Out */}
              <button
                onClick={handleSignout}
                className="block w-full border-t border-gray-100 px-4 py-3 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                href="/signin"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                সাইন ইন
              </Link>

              {/* Sign Up */}
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="block border-t border-gray-100 bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default UserInfo;
