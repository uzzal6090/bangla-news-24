
import Image from "next/image";
interface INews {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: INews }) => {
  return (
    <article className="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden sm:h-52 md:h-56 lg:h-60">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-xs font-semibold text-white shadow-md sm:left-4 sm:top-4 sm:px-3">
          {news.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-600 sm:text-sm">
          {news.category}
        </p>

        {/* Title */}
        <h2 className="mb-3 line-clamp-2 text-lg font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-red-600 sm:text-xl">
          {news.title}
        </h2>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
          {news.description}
        </p>

        {/* Read More */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-red-600 sm:gap-2"
        >
          Read More

          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </article>
  );
};

export default NewsCard;

