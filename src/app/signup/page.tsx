
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Reset previous errors
    setErrors({
      name: "",
      email: "",
      password: "",
    });

    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    // Name validation
    if (!name.trim()) {
      newErrors.name = "নাম অবশ্যই পূরণ করতে হবে";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "ইমেইল অবশ্যই পূরণ করতে হবে";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "সঠিক ইমেইল অ্যাড্রেস দিন";
    }

    // Password validation
    if (!password) {
      newErrors.password = "পাসওয়ার্ড অবশ্যই পূরণ করতে হবে";
    } else if (password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "পাসওয়ার্ডে কমপক্ষে একটি ছোট হাতের অক্ষর (a-z) থাকতে হবে";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password =
        "পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা (0-9) থাকতে হবে";
    } else if (!/[@$!%*?&]/.test(password)) {
      newErrors.password =
        "পাসওয়ার্ডে কমপক্ষে একটি special character (@$!%*?&) থাকতে হবে";
    }

    // If there are validation errors, show them and stop
    if (newErrors.name || newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    console.log({
      name,
      image,
      email,
      password,
    });

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/",
    });

    if (error) {
      console.log("SIGN UP ERROR:", error);
      return;
    }

    if (data) {
      console.log("SIGN UP SUCCESS:", data);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <h2 className="text-2xl font-bold text-red-700">
        সাইন আপ
      </h2>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset rounded-box w-md">

          {/* Name */}
          <label className="label">
            নাম
          </label>

          <input
            name="name"
            type="text"
            className="input w-md"
            placeholder="Name"
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name}
            </p>
          )}

          {/* Image URL */}
          <label className="label">
            ImageURL
          </label>

          <input
            name="image"
            type="url"
            className="input w-md"
            placeholder="Image URL"
          />

          {/* Email */}
          <label className="label">
            ইমেইল
          </label>

          <input
            name="email"
            type="email"
            className="input w-md"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <label className="label">
            পাসওয়ার্ড
          </label>

          <input
            name="password"
            type="password"
            className="input w-md"
            placeholder="Password"
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password}
            </p>
          )}

          <button
            type="submit"
            className="btn bg-red-500 mt-4"
          >
            সাইন আপ করুন
          </button>

        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
