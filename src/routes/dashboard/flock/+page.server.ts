import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ }) => {
    try {
        const flocks = await prisma.flock.findMany({
            include: {
                weightLogs: true
            }
        })
        return {flocks}
    } catch (e) {
        console.error(e)    
    }

}