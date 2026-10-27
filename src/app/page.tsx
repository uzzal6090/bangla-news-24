
import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  const res = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections"
  );

  const data = await res.json();
  const section = data.data;

  const mainNews = section[0].articles;

  const otherSections: IOtherSection[] = section.slice(1);

  return (
    <div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-3 sm:px-4 lg:grid-cols-3">

        {/* =========================
            News Section
        ========================== */}
        <div className="lg:col-span-2">
          
          <MainNews news={mainNews} />

          <div className="mt-5 grid gap-5">
            {otherSections.map((os) => (
              <div
                className="border-b-2 border-red-700 pb-1"
                key={os.curationId}
              >
                <h1 className="font-bold">
                  {os.title}
                </h1>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {os.articles.map((news) => (
                    <NewsCard
                      key={news.id}
                      news={news}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            Most Read Section
        ========================== */}
        <div className="lg:col-span-1">
          <MostRead />
        </div>

      </div>
    </div>
  );
}

