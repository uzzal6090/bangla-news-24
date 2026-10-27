
import Image from "next/image";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-4 sm:gap-4 sm:px-4 sm:py-5">

        {/* Logo + Title + Date */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src="/logo.webp"
            alt="Bangla News 24 Logo"
            width={56}
            height={56}
            className="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14"
          />

          <div className="text-left">
            <h1 className="truncate text-lg font-bold tracking-tight text-red-700 sm:text-2xl">
              Bangla News 24
            </h1>

            <p className="mt-1 hidden text-[10px] text-gray-500 sm:block sm:text-sm">
              {date}
            </p>
          </div>
        </div>

        {/* Search + Authentication (Desktop & Mobile) */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <SearchBar />
          <UserInfo />
        </div>

      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
