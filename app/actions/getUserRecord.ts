"use server"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


export default async function getUserRecord():Promise<{
    record?:number;
    daysWithRecords?: number;
    error?: string
}> {

    const {userId} = await auth();
    if(!userId){
        return{
            error: "User not found"
        }
    }

    try{
        const records = await db.record.findMany({
            where:{
                userId
            }
        });

        const record = records.reduce((total: number, record: { sleepHours: number }) => total + record.sleepHours, 0);
        const daysWithRecords = records.filter((record: { sleepHours: number }) => record.sleepHours > 0).length;
        return{
            record,
            daysWithRecords
        }

    }catch(error){
        return{
            error: "Failed to fetch user record"
        }
    }

}