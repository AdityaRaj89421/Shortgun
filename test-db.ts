import { prisma } from "./src/lib/prisma";

async function main() {
    console.log("Attempting to connect to DB...");
    try {
        const users = await prisma.user.findMany({ take: 1 });
        console.log("Connection successful. Users found:", users.length);
    } catch (e: any) {
        console.error("CONNECTION ERROR MESSAGE:", e.message);
        console.error("FULL ERROR:", JSON.stringify(e, null, 2));
        process.exit(1);
    }
}

main();
