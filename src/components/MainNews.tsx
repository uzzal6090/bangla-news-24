
import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const MainNews = ({ news }: { news: News[] }) => {
  const firstNews = news[0];
  const otherNews = news.slice(1, 5);

  // Current date
  const today = new Date();

  const formattedDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">

        {/* =========================
            Featured News
        ========================== */}
        <Link href={`/news/${firstNews.id}`}>
          <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg sm:rounded-2xl">

            {/* Featured Image */}
            <div className="relative h-52 w-full overflow-hidden sm:h-64 md:h-72">
              <Image
                src={firstNews.imageUrl}
                alt={firstNews.imageAlt || firstNews.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Featured Content */}
            <div className="p-4 sm:p-5">

              {/* Category */}
              <p className="mb-2 inline-block border-l-4 border-red-600 pl-2.5 text-xs font-bold uppercase tracking-wide text-red-600 sm:mb-3 sm:pl-3 sm:text-sm">
                {firstNews.category}
              </p>

              {/* Title */}
              <h2 className="text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600 sm:text-xl md:text-2xl">
                {firstNews.title}
              </h2>

              {/* Description */}
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 sm:mt-3">
                {firstNews.description}
              </p>

              {/* Date */}
              <p className="mt-4 border-t border-gray-200 pt-3 text-xs font-medium text-gray-500 sm:mt-5">
                {formattedDate}
              </p>
            </div>
          </article>
        </Link>

        {/* =========================
            Other News
        ========================== */}
        <div className="flex flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm sm:rounded-2xl">

          {otherNews.map((on) => (
            <Link
              key={on.id}
              href={`/news/${on.id}`}
              className="group flex gap-3 p-3 transition-colors duration-200 hover:bg-gray-50 sm:gap-4 sm:p-4"
            >

              {/* Thumbnail */}
              <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-32">
                <Image
                  src={on.imageUrl}
                  alt={on.imageAlt || on.title}
                  fill
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">

                {/* Category */}
                <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-red-600 sm:mb-1.5 sm:text-xs">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />
                  <span className="truncate">{on.category}</span>
                </p>

                {/* Title */}
                <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600 sm:text-base">
                  {on.title}
                </h3>

                {/* Description */}
                <p className="mt-1 hidden line-clamp-1 text-xs text-gray-500 sm:block">
                  {on.description}
                </p>

                {/* Date */}
                <p className="mt-1.5 text-[10px] text-gray-400 sm:mt-2 sm:text-xs">
                  {formattedDate}
                </p>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default MainNews;

