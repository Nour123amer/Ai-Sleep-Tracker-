import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export default async function deleteRecord(recordId: string):Promise<{
    message?: string;
    error?: string;
}> {

    const { userId } = await auth();
    if(!userId){
        return{
            error: "User not found"
        }
    }

    try{
        await db.record.delete({
            where:{
                id: recordId,
                userId
            }
        });

        revalidatePath("/");
        return{
            message: "Record deleted successfully"
        }
    }catch(error){
        return{
            error: "Failed to delete record"
        }
    }
}