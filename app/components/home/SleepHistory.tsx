"use client";
import { SleepDataContext } from "@/app/context/SleepDataContext";
import { useContext } from "react";

export const SleepHistory = () => {
        const {sleepData , deleteSleepRecord} = useContext(SleepDataContext)!;
        
    
  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full mt-8">
      <h3 className="text-xl font-bold text-pink-500 text-center mb-6">Sleep History</h3>
      
      {sleepData?.map((record) => (
          <div key={record.id} className="border-t border-gray-100 pt-6">
        {/* Record Item */}
        <div className="relative border border-gray-100 rounded-lg p-4 flex justify-between items-center bg-white shadow-sm">
          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
            record.amount >= 7 ? "bg-green-500" : record.amount <= 4 ? "bg-red-500" : "bg-yellow-400"} rounded-l-lg`}
          ></div>
          
          <div className="pl-4">
            <p className="text-[10px] text-gray-400">{record.date}</p>
            <p className="text-lg font-bold text-gray-800">{record.amount} hours</p>
            <p className="text-[10px] text-gray-500">Sleep Mode: {record.text}</p>
            <p>id: {record.id}</p>
          </div>

          <button 
          onClick={()=>{deleteSleepRecord(record.id)}}
          className="text-red-500 hover:scale-110 transition-transform cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            </svg>
          </button>
        </div>
      </div>
    
    ))}
      
    
    </div>
  );
};