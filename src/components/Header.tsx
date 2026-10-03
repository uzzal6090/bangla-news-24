import Image from "next/image";
import NavLinks from "./NavLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="bg-white">
      <div className="relative mx-auto flex max-w-7xl items-center justify-center px-4 py-5">

        {/* Logo + Title + Date */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Bangla News 24 Logo"
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
          />

          <div className="text-left">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Bangla News 24
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {date}
            </p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <div className="absolute right-4 flex items-center gap-2">
          <button
            className="
              rounded-md
              px-4 py-2
              text-sm font-medium
              text-gray-700
              transition-colors
              hover:bg-gray-100
              hover:text-red-600
            "
          >
            সাইন ইন
          </button>

          <button
            className="
              rounded-md
              bg-red-600
              px-4 py-2
              text-sm font-medium
              text-white
              transition-colors
              hover:bg-red-700
            "
          >
            সাইন আপ
          </button>
        </div>

      </div>

      <NavLinks />
    </header>
  );
};

export default Header;