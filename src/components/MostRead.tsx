

const MostRead =  async() => {

    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read")
    const data = await res.json();
    const news = data.data
    console.log(news);
    return (
        <div className="card border border-gray-200 bg-base-100 p-4 shadow-sm">
  {/* Header */}
  <h1 className="mb-4 border-b-2 border-red-600 pb-2 text-lg font-bold text-red-700">
    সর্বাধিক পঠিত
  </h1>

  {/* News List */}
  <div className="divide-y divide-gray-200">
    {news.map((n, i) => (
      <div
        key={n.id}
        className="group flex cursor-pointer gap-3 py-3 transition-colors duration-200 hover:bg-gray-50"
      >
        {/* Index */}
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600 transition-all duration-200 group-hover:bg-red-600 group-hover:text-white">
          {i + 1}
        </span>

        {/* Title */}
        <h2 className="text-sm font-semibold leading-6 text-gray-800 transition-colors duration-200 group-hover:text-red-700">
          {n.title}
        </h2>
      </div>
    ))}
  </div>
</div>
    );
};

export default MostRead;