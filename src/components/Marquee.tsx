
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
const Marquee = async() => {

 const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10")
 const data = await res.json()
 const headlines = data.data
 

 console.log(headlines)

    return (
        <div>
                <MarqueeText>
                 {
                headlines.map(h => <sapn>
                   <span>{h.title}</span>
                   <span className="mx-5">•</span>

                </sapn>)
            }

                </MarqueeText>

        </div>
    );
};

export default Marquee;