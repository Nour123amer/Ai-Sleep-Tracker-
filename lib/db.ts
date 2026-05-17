// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';



// declare global {
//     var prisma: PrismaClient | undefined
// }

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });


// export const db = globalThis.prisma || new PrismaClient({ adapter });

// if(process.env.NODE_ENV !== 'production') globalThis.prisma = db

// const adapter = new PrismaNeon({
//   connectionString: process.env.DATABASE_URL!,
// })

// export const prisma = new PrismaClient({ adapter })

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from "pg";


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}