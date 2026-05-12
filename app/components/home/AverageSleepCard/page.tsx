"use client";

import { SleepDataContext } from "@/app/context/SleepDataContext";
import { useContext } from "react";

export const AverageSleepCard = () => {
        const {sleepData} = useContext(SleepDataContext)!;
        const avg = sleepData.reduce((acc,record)=> acc + record.amount, 0) /sleepData.length;
    
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
      <h3 className="text-gray-600 font-medium mb-1">Your Average Sleep Last Month</h3>
      <p className="text-3xl font-bold text-fuchsia-600">
        {avg.toFixed(0)} hours {Math.round((avg % 1) * 60)} minutes
      </p>
    </div>
  );
};