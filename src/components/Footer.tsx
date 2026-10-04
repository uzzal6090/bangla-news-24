
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight text-white"
            >
              বাংলা<span className="text-red-500"> নিউজ ২৪</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              দেশের ও বিশ্বের সর্বশেষ সংবাদ, গুরুত্বপূর্ণ খবর এবং
              নির্ভরযোগ্য তথ্য একসাথে। সত্য ও বস্তুনিষ্ঠ সংবাদ পৌঁছে দিতে
              আমাদের পথচলা।
            </p>

          
          </div>

           
            <div className="">
                 <div className="mb-5 text-lg font-bold text-white"><h3>সংযুক্ত থাকুন</h3></div>
               
                <div className="flex gap-4">

                <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-semibold transition hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-semibold transition hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-sm font-semibold transition hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                Y
              </a>

                </div>
            </div>

          {/* News Categories */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              সংবাদ বিভাগ
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/category/Home"
                  className="transition hover:text-red-500"
                >
                  বাংলাদেশ
                </Link>
              </li>

              <li>
                <Link
                  href="/category/world"
                  className="transition hover:text-red-500"
                >
                  আন্তর্জাতিক
                </Link>
              </li>

              <li>
                <Link
                  href="/category/sports"
                  className="transition hover:text-red-500"
                >
                  খেলাধুলা
                </Link>
              </li>

              <li>
                <Link
                  href="/category/technology"
                  className="transition hover:text-red-500"
                >
                  প্রযুক্তি
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/Home"
                  className="transition hover:text-red-500"
                >
                  হোম
                </Link>
              </li>

            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              যোগাযোগ
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <span className="text-red-500">📍</span>
                <span>ঢাকা, বাংলাদেশ</span>
              </li>

              <li className="flex gap-3">
                <span className="text-red-500">✉</span>
                <span>info@banglanews24.com</span>
              </li>

              <li className="flex gap-3">
                <span className="text-red-500">☎</span>
                <span>+880 1XXXXXXXXX</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-center text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:px-8 md:text-left">
          <p>
            © {new Date().getFullYear()} বাংলা নিউজ ২৪. সর্বস্বত্ব
            সংরক্ষিত।
          </p>

          <div className="flex justify-center gap-5">
            <Link
              href="/privacy"
              className="transition hover:text-red-500"
            >
              গোপনীয়তা নীতি
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-red-500"
            >
              ব্যবহারের শর্তাবলি
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

