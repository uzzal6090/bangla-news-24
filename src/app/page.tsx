import MainNews from "@/components/MainNews";
import Marquee from "@/components/Marquee";


export default  async function Home() {

  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections")
  const data = await res.json()
  const section = data.data
  const mainNews = section[0].articles


  const otherSections = section.slice(1)
  console.log(otherSections)
 

  return (
    <div>
      <Marquee></Marquee>


        <div className="grid grid-cols-3 max-w-7xl mx-auto">

         {/* news section */}

         <div className=" col-span-2 ">

          <MainNews news={mainNews}></MainNews>

          {


otherSections.map(os => <div className="border-b-2 border-red-700" key={os.curationId}>

  <h1 className="font-bold">{os.title}</h1>

</div>)}
      
    </div>

          {/* most read section */}
         <div className="bg-green-500 col-span-1 ">


         </div>

        </div>

    </div>
  );
}
