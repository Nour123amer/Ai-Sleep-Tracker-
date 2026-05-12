"use client";
import { createContext, use, useEffect, useState } from "react";

export type SleepRecord = {
    amount: number;
    text: string;
    date: string;
    id: string;
}

type SleepDataContextType = {
  sleepData: SleepRecord[];
  addSleepRecord: (record: SleepRecord) => void;
  deleteSleepRecord: (recordId: string) => void;
};

export const SleepDataContext = createContext<SleepDataContextType| null>(null);

export const SleepDataProvider = ({ children }: { children: React.ReactNode }) => {    
    const [sleepData, setSleepData] = useState<SleepRecord[]>([]);
      useEffect(() => {
        const storedData = localStorage.getItem("sleepData");

    if (storedData) {
      setSleepData(JSON.parse(storedData));
    }
    }, []);

    useEffect(() => {
      localStorage.setItem("sleepData", JSON.stringify(sleepData));

    }, [sleepData]);

    const addSleepRecord = (record: SleepRecord) => {
        setSleepData(prevData => [...prevData, record]);
    };

    const deleteSleepRecord = (recordId: string) => {
        setSleepData(prevData => prevData.filter(record => record.id !== recordId));
    }
  

    return(
        <SleepDataContext.Provider value={{ sleepData, addSleepRecord, deleteSleepRecord }}>
            {children}
        </SleepDataContext.Provider>
    )
}
  