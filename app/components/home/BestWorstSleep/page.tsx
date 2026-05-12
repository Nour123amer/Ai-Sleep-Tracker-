"use client";
import { SleepDataContext, SleepRecord } from "@/app/context/SleepDataContext";
import { useContext, useEffect, useState } from "react";

export const BestWorstSleep = () => {
    const {sleepData} = useContext(SleepDataContext)!;
    console.log("sleep data from best & worst =>", sleepData)
    const [bestSleep, setBestSleep] = useState<SleepRecord | null>(null);
    const [worstSleep, setWorstSleep] = useState<SleepRecord | null>(null);

    useEffect(() => {

        const dataOfBestSleep =sleepData.filter(record => record.text === "Refreshed" || "Enerly Refreshed" 
            && record.amount >= 7);
        
        setBestSleep(dataOfBestSleep[0]);

        const dataOfWorstSleep = sleepData.filter(record =>  record.amount <= 4);
        setWorstSleep(dataOfWorstSleep[0]);
        console.log("dataOfWorstSleep", dataOfWorstSleep);
    }, [sleepData])


  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
      <h3 className="text-xl font-bold text-pink-500 mb-6">Best and Worst Sleep</h3>
      <div className="flex divide-x divide-gray-200">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-semibold mb-2">Best Sleep</p>
          <p className="text-3xl font-bold text-green-600">{bestSleep?.amount } hours</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-semibold mb-2">Worst Sleep</p>
          <p className="text-3xl font-bold text-red-500">{worstSleep?.amount} hours</p>
        </div>
      </div>
    </div>
  );
};