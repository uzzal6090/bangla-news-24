
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

const EyeIcon = ({ off }: { off?: boolean }) => (
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
    {off ? (
      <>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 8 10 8a9.74 9.74 0 0 0 5.39-1.61" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <path d="m2 2 20 20" />
      </>
    ) : (
      <>
        <path d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    if (!user.email.trim() || !user.password.trim()) {
      toast.error("ইমেইল এবং পাসওয়ার্ড পূরণ করুন।");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authClient.signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      if (data) {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (socialLoading) return;
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করতে সমস্যা হয়েছে।`
        );
        setSocialLoading(null);
      }
      // On success the browser is redirected to the provider — no need to reset.
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="w-full">
      <div
        className="
          mx-auto
          flex
          min-h-[calc(100vh-180px)]
          w-full
          items-center
          justify-center
          px-4
          py-10
          sm:px-6
          sm:py-12
          md:px-8
          lg:px-12
          xl:px-16
        "
      >
        {/* Login Card */}
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-lg
            sm:p-7
            md:p-8
          "
        >
          {/* Header */}
          <div className="mb-7 text-center">
            <h1
              className="
                text-2xl
                font-bold
                text-red-700
                sm:text-3xl
              "
            >
              সাইন ইন
            </h1>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-500
                sm:text-base
              "
            >
              আপনার অ্যাকাউন্টে প্রবেশ করতে সাইন ইন করুন
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="w-full">
            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="
                  block
                  h-12
                  w-full
                  min-w-0
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  text-gray-900
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-red-500
                  focus:ring-2
                  focus:ring-red-100
                  sm:text-base
                "
              />
            </div>

            {/* Password */}
            <div className="mt-5 w-full">
              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="
                    block
                    h-12
                    w-full
                    min-w-0
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    pr-12
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-red-500
                    focus:ring-2
                    focus:ring-red-100
                    sm:text-base
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                  tabIndex={-1}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition
                    hover:text-gray-600
                  "
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                mt-6
                flex
                h-12
                w-full
                items-center
                justify-center
                rounded-xl
                border
                border-red-600
                bg-red-600
                px-4
                text-sm
                font-semibold
                text-white
                transition
                duration-200
                hover:bg-red-700
                focus:outline-none
                focus:ring-2
                focus:ring-red-200
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:text-base
              "
            >
              {isLoading
                ? "সাইন ইন হচ্ছে..."
                : "সাইন ইন করুন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex w-full items-center gap-3">
            <div className="h-px min-w-0 flex-1 bg-gray-200" />

            <span className="shrink-0 text-xs text-gray-400 sm:text-sm">
              অথবা
            </span>

            <div className="h-px min-w-0 flex-1 bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid w-full grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={socialLoading !== null}
              className="
                flex
                min-h-12
                w-full
                min-w-0
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-gray-300
                bg-white
                px-3
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition-all
                duration-200
                hover:bg-gray-50
                hover:shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-gray-200
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:px-4
              "
            >
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.23-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.16c1.85-1.7 2.9-4.2 2.9-7.38Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.75c2.65 0 4.87-.88 6.49-2.39l-3.16-2.45c-.88.59-2 .94-3.33.94-2.56 0-4.73-1.73-5.5-4.05H3.23v2.53A9.8 9.8 0 0 0 12 21.75Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.5 13.8a5.88 5.88 0 0 1 0-3.6V7.67H3.23a9.75 9.75 0 0 0 0 8.66L6.5 13.8Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.15c1.44 0 2.73.5 3.75 1.49l2.81-2.81C16.86 3.23 14.65 2.25 12 2.25a9.8 9.8 0 0 0-8.77 5.42L6.5 10.2C7.27 7.88 9.44 6.15 12 6.15Z"
                />
              </svg>

              <span className="truncate">
                {socialLoading === "google" ? "লোড হচ্ছে..." : "Google"}
              </span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={socialLoading !== null}
              className="
                flex
                min-h-12
                w-full
                min-w-0
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gray-900
                px-3
                py-3
                text-sm
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-gray-800
                hover:shadow-sm
                focus:outline-none
                focus:ring-2
                focus:ring-gray-300
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:px-4
              "
            >
              <svg
                className="h-5 w-5 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.579.688.481A10.001 10.001 0 0 0 22 12C22 6.477 17.523 2 12 2Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="truncate">
                {socialLoading === "github" ? "লোড হচ্ছে..." : "GitHub"}
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <a
              href="/signup"
              className="font-semibold text-red-600 transition-colors hover:text-red-700"
            >
              সাইন আপ করুন
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
