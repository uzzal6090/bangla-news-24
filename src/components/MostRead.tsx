
import Link from "next/link";

interface INews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read"
  );

  const data = await res.json();
  const news: INews[] = data.data;

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">

      {/* Header */}
      <h1 className="mb-3 border-b-2 border-red-600 pb-2 text-base font-bold text-red-700 sm:mb-4 sm:text-lg">
        সর্বাধিক পঠিত
      </h1>

      {/* News List */}
      <div className="divide-y divide-gray-200">
        {news.map((n, i) => (
          <Link
            key={n.id}
            href={`/news/${n.id}`}
            className="group block"
          >
            <div className="flex min-w-0 cursor-pointer gap-2.5 py-2.5 transition-colors duration-200 hover:bg-gray-50 sm:gap-3 sm:py-3">

              {/* Index */}
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600 transition-all duration-200 group-hover:bg-red-600 group-hover:text-white sm:h-7 sm:w-7 sm:text-sm">
                {i + 1}
              </span>

              {/* Title */}
              <h2 className="min-w-0 flex-1 text-xs font-semibold leading-5 text-gray-800 transition-colors duration-200 group-hover:text-red-700 sm:text-sm sm:leading-6">
                {n.title}
              </h2>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;

