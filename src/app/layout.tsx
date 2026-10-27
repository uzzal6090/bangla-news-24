
import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notoSeirfBengali= Noto_Serif_Bengali({
 
  subsets: ["latin", "bengali"],
});


export const metadata: Metadata = {
  title: "Bangla News 24",
  description: "বাংলাদেশের সর্বশেষ ও সর্বাধিক পঠিত খবর — Bangla News 24",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSeirfBengali}} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        <Header></Header>
         <Marquee></Marquee>
       <main className="max-w-7xl mx-auto"> {children}

      
       </main>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
  />
       
       <Footer></Footer>
        </body>
    </html>
  );
}
