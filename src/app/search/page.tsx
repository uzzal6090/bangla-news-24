
import Image from "next/image";
import Link from "next/link";

interface ISearchArticle {
  id: string;
  title: string;
  description: string | null;
  link: string;
  imageUrl: string | null;
  imageAlt: string | null;
  category: string | null;
  firstPublished: string | null;
  source: string | null;
}

interface ISearchResponse {
  success: boolean;
  query: string;
  total: number;
  count: number;
  indexed: number;
  data: ISearchArticle[];
}

export const metadata = {
  title: "সার্চ | Bangla News 24",
};

const formatDate = (iso: string | null) => {
  if (!iso) return null;

  try {
    return new Date(iso).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let results: ISearchArticle[] = [];
  let total = 0;
  let failed = false;

  if (query) {
    try {
      const res = await fetch(
        `https://news-api-v2.vercel.app/api/search?q=${encodeURIComponent(query)}`,
        {
          next: { revalidate: 60 },
        }
      );

      if (res.ok) {
        const data: ISearchResponse = await res.json();
        results = data.data ?? [];
        total = data.total ?? results.length;
      } else {
        failed = true;
      }
    } catch (error) {
      console.error("Search fetch error:", error);
      failed = true;
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6">
      {/* Heading */}
      <div className="mb-5 border-b-2 border-red-700 pb-2">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          সার্চ ফলাফল
        </h1>

        {query && (
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            &ldquo;{query}&rdquo; এর জন্য{" "}
            {failed ? (
              <span className="font-semibold text-red-600">
                ফলাফল আনা যায়নি
              </span>
            ) : (
              <span className="font-semibold text-gray-800">
                {total}টি ফলাফল
              </span>
            )}
            {total > 0 && !failed && (
              <span className="text-gray-400"> (সর্বশেষ খবরগুলো আগে)</span>
            )}
          </p>
        )}
      </div>

      {/* Empty / Error / No Query State */}
      {!query ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center sm:py-20">
          <svg
            className="mb-4 h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m20 20-3.5-3.5"
            />
          </svg>

          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            কী খুঁজছেন?
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            উপরের সার্চ বারে লিখে সার্চ করুন — বিষয়, স্থান বা যেকোনো শব্দ
            দিয়ে খবর খুঁজে দেখুন।
          </p>
        </div>
      ) : failed ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-14 text-center sm:py-20">
          <h2 className="text-lg font-bold text-red-700 sm:text-xl">
            দুঃখিত, সার্চ করা যায়নি
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-red-500">
            সার্ভারে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।
          </p>

          <Link
            href="/search"
            className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            আবার চেষ্টা করুন
          </Link>
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center sm:py-20">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            কোনো ফলাফল পাওয়া যায়নি
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            &ldquo;{query}&rdquo; এর জন্য কোনো খবর পাওয়া যায়নি। অন্য শব্দ
            দিয়ে আবার চেষ্টা করুন।
          </p>
        </div>
      ) : (
        /* Results List */
        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {results.map((article) => {
            const date = formatDate(article.firstPublished);

            return (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="group flex w-full gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:p-4"
              >
                {/* Image */}
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-32 sm:w-44">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.imageAlt || article.title}
                      fill
                      sizes="(max-width: 640px) 112px, 176px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        className="h-8 w-8 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col">
                  {/* Category + Source */}
                  <div className="mb-1.5 flex flex-wrap items-center gap-2">
                    {article.category && (
                      <span className="max-w-[70%] truncate rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-semibold text-white sm:text-xs">
                        {article.category}
                      </span>
                    )}

                    {article.source && (
                      <span className="text-[10px] font-medium text-gray-400 sm:text-xs">
                        {article.source}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-red-600 sm:text-lg">
                    {article.title}
                  </h2>

                  {/* Description */}
                  {article.description && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-600 sm:line-clamp-3 sm:text-sm sm:leading-6">
                      {article.description}
                    </p>
                  )}

                  {/* Date */}
                  {date && (
                    <p className="mt-auto pt-2 text-[10px] font-medium text-gray-500 sm:text-xs">
                      {date}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
