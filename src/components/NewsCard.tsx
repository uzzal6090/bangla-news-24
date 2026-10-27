
import Image from "next/image";
import Link from "next/link";

interface INews {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: INews }) => {
  // Current date
  const today = new Date();

  const formattedDate = today.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/news/${news.id}`} className="block h-full">
      <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        {/* Image */}
        <div className="relative h-44 w-full shrink-0 overflow-hidden xs:h-48 sm:h-52 md:h-56 lg:h-60">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category Badge */}
          <span className="absolute left-2.5 top-2.5 max-w-[80%] truncate rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-md sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
            {news.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-3.5 sm:p-5">

          {/* Category */}
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-red-600 sm:mb-2 sm:text-sm">
            {news.category}
          </p>

          {/* Title */}
          <h2 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600 sm:mb-3 sm:text-xl">
            {news.title}
          </h2>

          {/* Description */}
          <p className="mb-3 line-clamp-3 text-xs leading-5 text-gray-600 sm:mb-4 sm:text-sm sm:leading-6">
            {news.description}
          </p>

          {/* Date */}
          <p className="mt-auto border-t border-gray-200 pt-2.5 text-[10px] font-medium text-gray-500 sm:pt-3 sm:text-xs">
            {formattedDate}
          </p>
        </div>

      </article>
    </Link>
  );
};

export default NewsCard;

