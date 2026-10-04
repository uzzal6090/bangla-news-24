import NewsCard from "@/components/NewsCard";


const CategoryNews = async ({params}) => {
    const {categoryId} = await params
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)
    const data = await res.json()
 const CategoryNews = data.data

    return (
        <div>
            <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">{data.title}</h1>

            <div className="grid grid-cols-3 gap-10">
     
                {CategoryNews.map(news => <NewsCard key={news.id} news={news}></NewsCard>)


                }


            </div>
        </div>
    );
};

export default CategoryNews;