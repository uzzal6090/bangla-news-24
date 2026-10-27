
import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

interface CategoryResponse {
  success: boolean;
  title: string;
  data: News[];
}

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`
  );

  // Response body একবারই read করছি
  const data: CategoryResponse = await res.json();

  // API বা category না পাওয়া গেলে 404
  if (!res.ok || !data.success || !data.data) {
    notFound();
  }

  const newsList = data.data;

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6">
      {/* Category Title */}
      <h1 className="mb-4 border-b-2 border-red-700 pb-2 text-xl font-bold text-gray-900 sm:mb-5 sm:text-2xl">
        {data.title}
      </h1>

      {/* News Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;

