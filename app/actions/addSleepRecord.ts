"use server"
import { db } from "@/lib/db";
import OpenAI from "openai";
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

    const { userId: clerkId } = await auth();
    if (!clerkId) {
        return { error: 'user not logged in' };
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: clerkId,
        },
    });
    if (!user) {
        return { error: 'user not found' };
    }

    try {
        const existingRecord = await db.record.findFirst({
            where: {
                userId: user.id,
            }
        });

        let recordData: RecordData;
        if (existingRecord) {
            // update existing record
            const updatedRecord = await db.record.update({
                where: { id: existingRecord.id },
                data: {
                    sleepQuality: text,
                    sleepHours: amount,
                    createdAt: new Date(date)
                }
            })

            recordData = {
                text: updatedRecord.sleepQuality,
                amount: updatedRecord.sleepHours,
                date: updatedRecord.createdAt.toISOString(),
                id: updatedRecord.id
            }
        } else {
            // create new record
            const newRecord = await db.record.create({
                data: {
                    sleepQuality: text,
                    sleepHours: amount,
                    createdAt: new Date(date),
                    userId: user.id,
                }
            })

            console.log("new record", newRecord)

            recordData = {
                text: newRecord.sleepQuality,
                amount: newRecord.sleepHours,
                date: newRecord.createdAt.toISOString(),
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



const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeSleep(formData: FormData) {
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

    const { userId: clerkId } = await auth();

    if (!clerkId) {
        return { error: 'user not logged in' };
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: clerkId,
        },
    });
    if (!user) {
        return { error: 'user not found' };
    }

    const record = await db.record.findUnique({
        where: {
            id: formData.get('recordId')?.toString() || '',
        },
    });

    if (!record) return;

    const prompt = `
  Analyze this sleep data:

  ${JSON.stringify(record)}

  Return JSON:
  {
    sleepScore,
    summary,
    detectedIssues,
    recommendations
  }
  `;

    const completion = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        response_format: {
            type: "json_object",
        },
    });

    const result = JSON.parse(
        completion.choices[0].message.content || "{}"
    );

    await db.record.create({
        data: {
            sleepQuality: text,
            sleepHours: amount,
            createdAt: new Date(date),
            userId: user.id,
        }
    });

    return result;
}