// lib/syncUser.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function syncUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const existing = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (existing) return existing;

  return await db.user.create({
    data: {
      clerkUserId: userId,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.firstName ?? "",
      imageUrl: clerkUser.imageUrl,
    },
  });
}