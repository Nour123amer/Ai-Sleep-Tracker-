import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";


export const checkUser = async () => {
  const user = await currentUser();

  if(!user) return null;

  // check if the user is already in the db
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  
  })

  if(loggedInUser) return loggedInUser;

  // if not in db, create a new user in the db
  const newUser = await db.user.create({

    data:{
        clerkUserId: user.id,
        imageUrl:user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
        name:`${user.firstName}  ${user.lastName}` || "No name"
    }
  });
    return newUser;

}