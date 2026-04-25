import Image from "next/image";
import Hero from "./components/home/Hero/page";
import FAQ from "./components/home/FAQ/page";
import Testimeniols from "./components/home/Testimeniols/page";

export default function Home() {
  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center  font-sans dark:bg-black">
     <Hero />
     <FAQ />
     <Testimeniols />
    </div>
  );
}
