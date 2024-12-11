import { prisma } from "@/prisma/db";

export async function GET() {
    try {
        const teachers = await prisma.teacher.findMany({
            select: {
                id,
                firstName,
                lastName,
                email
            }
        })

        return Response.json({ data: teachers }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}