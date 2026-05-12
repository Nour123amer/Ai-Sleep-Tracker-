"use server"
import { db } from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface RecordData {
    text: string;
    amount: number;
    date: string;
    id: string;
}

interface RecordResult {
    data?: RecordData;
    error?: string;
}


export default async function addSleepRecord(formData: FormData): Promise<RecordResult> {
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');
    const dateValue = formData.get('date');

    // check input values
    if (!textValue ||
        textValue === '' ||
        !amountValue ||
        amountValue === '' ||
        !dateValue ||
        dateValue === '') {
        return { error: 'Text, amount or data is missing' }
    }

    const text: string = textValue.toString();
    const amount: number = parseFloat(amountValue.toString());
    let date: string;

    try {
        date = new Date(dateValue.toString()).toISOString();

    } catch (error) {
        console.error('Invalid date format', error);
        return { error: 'Invalid date format' };
    }

    const { userId } = await auth();

    if (!userId) {
        return { error: 'user not logged in' };
    }

    try {
        const existingRecord = await db.record.findFirst({
            where: {
                userId: userId,
                date: date
            }
        });

        let recordData: RecordData;
        if (existingRecord) {
            // update existing record
            const updatedRecord = await db.record.update({
                where: { id: existingRecord.id },
                data: {
                    text: text,
                    amount: amount,
                    date: new Date(date)
                }
            })

            recordData = {
                text: updatedRecord.text,
                amount: updatedRecord.amount,
                date: updatedRecord.date.toISOString(),
                id: updatedRecord.id
            }
        } else {
            // create new record
            const newRecord = await db.record.create({
                data: {
                    text: text,
                    amount: amount,
                    date: new Date(date),
                    userId: userId
                }
            })

            console.log("new record", newRecord)

            recordData = {
                text: newRecord.text,
                amount: newRecord.amount,
                date: newRecord.date.toISOString(),
                id: newRecord.id
            }
        }
        revalidatePath('/info');
        return { data: recordData };
    } catch (error) {
        console.error('Error checking existing record', error);
        return { error: 'Error checking existing record' };
    }
}

