
import Link from "next/link";
import MobileNav from "./MobileNav";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");

  const data = await res.json();

  const navs: Navs[] = data.data;

  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="w-full border-y border-gray-200 bg-white">
      
      {/* ================= Desktop Navbar ================= */}
      <div className="mx-auto hidden max-w-7xl items-center justify-center gap-5 px-4 py-3 md:flex">
        
        <Link
          href="/"
          className="text-sm font-semibold text-gray-800 transition-colors hover:text-red-600"
        >
          হোম
        </Link>

        {filteredNavs.map((n) => (
          <Link
            key={n.slug}
            href={`/category/${n.slug}`}
            className="text-sm font-semibold text-gray-700 transition-colors hover:text-red-600"
          >
            {n.title}
          </Link>
        ))}
      </div>

      {/* ================= Mobile Navbar ================= */}
      <div className="flex items-center px-4 py-3 md:hidden">
        <MobileNav navs={filteredNavs} />
      </div>
    </nav>
  );
};

export default NavLinks;

