"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    if (!name.trim()) {
      toast.error("নাম অবশ্যই দিতে হবে");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (error) {
        toast.error(error.message || "Profile update failed");
        return;
      }

      toast.success("Profile successfully updated!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Session loading
  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-red-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Please sign in
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            You need to sign in to view your profile.
          </p>

          <Link
            href="/sign-in"
            className="mt-5 inline-flex rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm font-medium text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Account Settings
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="grid md:grid-cols-[250px_1fr]">

            {/* =========================
                LEFT PROFILE
            ========================== */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-500 to-rose-600 px-6 py-8 text-center text-white">

              {/* Decorative circles */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10" />

              <div className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-white/10" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center">

                {/* Avatar */}
                <div className="rounded-full bg-white p-1 shadow-lg">
                  <img
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "User avatar"}
                    className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
                  />
                </div>

                {/* Name */}
                <h2 className="mt-4 max-w-full break-words text-lg font-bold">
                  {user.name || "User"}
                </h2>

                {/* Email */}
                <p className="mt-1 max-w-full break-all px-2 text-xs text-red-100">
                  {user.email}
                </p>

                {/* Active Status */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                  Active Account
                </div>

                {/* Profile Link */}
                <Link
                  href="/profile"
                  className="mt-5 text-xs font-medium text-white/80 transition hover:text-white"
                >
                  Profile Overview →
                </Link>
              </div>
            </div>

            {/* =========================
                RIGHT FORM
            ========================== */}
            <div className="p-6 sm:p-8">

              {/* Form Header */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Update your account information below.
                </p>
              </div>

              <form
                onSubmit={handleUpdateProfile}
                className="space-y-5"
              >

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={user.name || ""}
                    placeholder="আপনার নাম লিখুন"
                    required
                    className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label
                    htmlFor="image"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Profile Image URL
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="url"
                    defaultValue={user.image || ""}
                    placeholder="https://example.com/profile.jpg"
                    className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-3 focus:ring-red-500/10"
                  />

                  <p className="mt-1.5 text-xs text-gray-400">
                    Use a publicly accessible image URL.
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="h-11 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3.5 pr-20 text-sm text-gray-500"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-gray-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      Locked
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-gray-400">
                    Your email address cannot be changed here.
                  </p>
                </div>

                {/* Security Info */}
                <div className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3.5">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm">
                    🔐
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-amber-900">
                      Account Security
                    </h4>

                    <p className="mt-0.5 text-xs leading-5 text-amber-700">
                      Password changes should be handled from your account
                      security settings.
                    </p>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* Back */}
                  <Link
                    href="/"
                    className="text-center text-sm font-medium text-gray-500 transition hover:text-gray-800 sm:text-left"
                  >
                    ← Back to Home
                  </Link>

                  {/* Update */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-red-500 px-6 text-sm font-semibold text-white shadow-sm shadow-red-500/20 transition hover:bg-red-600 hover:shadow-md hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487 18.5 2.85a1.875 1.875 0 0 1 2.652 2.652L10.582 16.073a4.5 4.5 0 0 1-1.897 1.13L6 18l.797-2.685a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 7.125 16.875 4.5M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>

                        Update Profile
                      </>
                    )}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;