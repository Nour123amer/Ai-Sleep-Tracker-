import Image from "next/image";
import Hero from "./components/home/Hero/page";
import FAQ from "./components/home/FAQ/page";
import Testimeniols from "./components/home/Testimeniols/page";
import { currentUser } from "@clerk/nextjs/server";
import { UserInfo } from "./components/home/UserInfo/page";
import { AverageSleepCard } from "./components/home/AverageSleepCard/page";
import { SleepTrackerForm } from "./components/home/SleepTrackerForm/page";
import { BestWorstSleep } from "./components/home/BestWorstSleep/page";
import { SleepHistory } from "./components/home/SleepHistory/page";
import SleepRecordChart from "./components/home/SleepRecordChart/page";
import { syncUser } from "@/lib/syncUser";


export default async function Home() {
  const user = await currentUser();
  console.log("current user", user)
  await syncUser();

  if (!user) {
    return (
      <div className="flex flex-col w-full flex-1 items-center justify-center  font-sans dark:bg-black">
        <Hero />
        <FAQ />
        <Testimeniols />
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen dark:bg-black p-4 md:p-8 font-sans">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <div className="space-y-5">
            <UserInfo />
            <SleepTrackerForm />
          </div>

          <div className="space-y-5">
            <SleepRecordChart />
            <BestWorstSleep />
            <AverageSleepCard />
          </div>

          <div className="space-y-2 col-span-2 ">
            <SleepHistory />
          </div>

        </div>
      </div>
    </>


  );

}

