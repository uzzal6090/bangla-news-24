
"use client";

import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="absolute right-2 top-2 flex items-center gap-2 text-5m sm:right-4 sm:top-4 sm:gap-3">
      {user ? (
        <div className="flex flex-col items-center gap-2">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2 sm:w-14">
              <img
                src={user?.image || "/default-avatar.png"}
                alt={user?.name || "User avatar"}
                className="object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h2 className="max-w-[120px] truncate text-center text-xs font-semibold text-gray-800 sm:max-w-none sm:text-sm">
            {user?.name || "User"}
          </h2>

          {/* Sign Out */}
          <button
            onClick={handleSignout}
            className="btn btn-error btn-xs mt-1 rounded-md px-3 text-white sm:px-4"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-red-600 sm:px-4 sm:py-2 sm:text-sm">
            সাইন ইন
          </button>

          <button className="rounded-md bg-red-600 px-2 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700 sm:px-4 sm:py-2 sm:text-sm">
            সাইন আপ
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
