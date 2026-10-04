
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IBodyItem {
  type: "text" | "image" | "subheading";
  text?: string;
  url?: string;
  width?: number;
  height?: number;
  caption?: string;
  altText?: string;
  copyrightHolder?: string;
}

interface INews {
  id: string;
  title: string;
  description: {
    blocks: {
      type: string;
      model: {
        blocks: {
          type: string;
          model: {
            text: string;
          };
        }[];
      };
    }[];
  };
  link: string;
  firstPublished: string;
  lastPublished: string;
  byline: {
    name: string;
    role: string;
  }[];
  topics: {
    id: string;
    name: string;
  }[];
  tags: string[];
  imageUrl: string;
  body: IBodyItem[];
}

const NewsDetails = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const result = await res.json();

  if (!result.success || !result.data) {
    notFound();
  }

  // data.data is ONE article, not an array
  const news: INews = result.data;

  // Format publication date
  const publishedDate = new Date(
    news.firstPublished
  ).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="mx-auto max-w-5xl px-4">

        {/* =========================
            ARTICLE HEADER
        ========================== */}
        <article className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* Header Content */}
          <div className="px-5 pb-6 pt-6 md:px-10 md:pt-10">

            {/* Topics */}
            {news.topics.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {news.topics.map((topic) => (
                  <span
                    key={topic.id}
                    className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600"
                  >
                    {topic.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">
              {news.title}
            </h1>

            {/* Description */}
            <div className="mt-5 max-w-4xl text-lg leading-8 text-gray-600 md:text-xl">
              {news.description.blocks.map((block, blockIndex) =>
                block.model.blocks.map((innerBlock, innerIndex) => (
                  <p
                    key={`${blockIndex}-${innerIndex}`}
                    className="mb-2"
                  >
                    {innerBlock.model.text}
                  </p>
                ))
              )}
            </div>

            {/* Author / Date */}
            <div className="mt-7 flex flex-col gap-4 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

              {/* Authors */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {news.byline.map((author, index) => (
                  <div key={index}>
                    <p className="font-semibold text-gray-900">
                      {author.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {author.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* Date */}
              <time
                dateTime={news.firstPublished}
                className="text-sm text-gray-500"
              >
                Published: {publishedDate}
              </time>
            </div>
          </div>

          {/* =========================
              FEATURED IMAGE
          ========================== */}
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* =========================
              ARTICLE BODY
          ========================== */}
          <div className="px-5 py-8 md:px-10 md:py-12">

            <article className="mx-auto max-w-3xl">

              {news.body.map((item, index) => {

                /* ---------------------
                   TEXT
                ---------------------- */
                if (item.type === "text") {
                  return (
                    <p
                      key={index}
                      className="mb-7 text-[17px] leading-8 text-gray-700 md:text-lg md:leading-9"
                    >
                      {item.text}
                    </p>
                  );
                }

                /* ---------------------
                   SUBHEADING
                ---------------------- */
                if (item.type === "subheading") {
                  return (
                    <h2
                      key={index}
                      className="mb-6 mt-10 border-l-4 border-red-600 pl-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl"
                    >
                      {item.text}
                    </h2>
                  );
                }

                /* ---------------------
                   IMAGE
                ---------------------- */
                if (item.type === "image" && item.url) {
                  return (
                    <figure
                      key={index}
                      className="my-10"
                    >
                      <div className="overflow-hidden rounded-xl bg-gray-100">
                        <Image
                          src={item.url}
                          alt={
                            item.altText ||
                            item.caption ||
                            news.title
                          }
                          width={item.width || 1200}
                          height={item.height || 700}
                          className="h-auto w-full object-cover"
                        />
                      </div>

                      {/* Caption */}
                      {item.caption && (
                        <figcaption className="mt-3 text-sm leading-6 text-gray-500">
                          {item.caption}
                        </figcaption>
                      )}

                      {/* Copyright */}
                      {item.copyrightHolder && (
                        <p className="mt-1 text-xs text-gray-400">
                          © {item.copyrightHolder}
                        </p>
                      )}
                    </figure>
                  );
                }

                return null;
              })}

              {/* =========================
                  TAGS
              ========================== */}
              {news.tags.length > 0 && (
                <div className="mt-12 border-t border-gray-200 pt-7">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">
                    Tags
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-red-50 hover:text-red-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* =========================
                  ORIGINAL ARTICLE
              ========================== */}
              <div className="mt-10 border-t border-gray-200 pt-7">
                <Link
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Read Original Article
                  <span className="ml-2">↗</span>
                </Link>
              </div>

            </article>
          </div>
        </article>

        {/* =========================
            BACK TO NEWS
        ========================== */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 transition hover:text-red-600"
          >
            ← Back to News
          </Link>
        </div>

      </div>
    </main>
  );
};

export default NewsDetails;

