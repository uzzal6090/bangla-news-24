
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* =========================
            Featured News
        ========================== */}
       <Link href={`/news/${firstNews.id}`}>
            
             <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

          {/* Featured Image */}
          <div className="relative h-64 w-full overflow-hidden sm:h-72">
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt || firstNews.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Featured Content */}
          <div className="p-5">

            {/* Category */}
            <p className="mb-3 inline-block border-l-4 border-red-600 pl-3 text-sm font-bold uppercase tracking-wide text-red-600">
              {firstNews.category}
            </p>

            {/* Title */}
            <h2 className="text-xl font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600 sm:text-2xl">
              {firstNews.title}
            </h2>

            {/* Description */}
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
              {firstNews.description}
            </p>

            {/* Date */}
            <p className="mt-5 border-t border-gray-200 pt-3 text-xs font-medium text-gray-500">
              {formattedDate}
            </p>
          </div>
        </article>
       </Link>

        {/* =========================
            Other News
        ========================== */}
        <div className="flex flex-col divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white shadow-sm">

          {otherNews.map((on) => (
            <Link
              key={on.id}
              href={`/news/${on.id}`}
              className="group flex gap-4 p-4 transition-colors duration-200 hover:bg-gray-50"
            >

              {/* Thumbnail */}
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={on.imageUrl}
                  alt={on.imageAlt || on.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">

                {/* Category */}
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  {on.category}
                </p>

                {/* Title */}
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600">
                  {on.title}
                </h3>

                {/* Description */}
                <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                  {on.description}
                </p>

                {/* Date */}
                <p className="mt-2 text-xs text-gray-400">
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

