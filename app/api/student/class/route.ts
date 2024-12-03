import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";

export async function GET() {
    try {
        const session: any = await getServerSession(authOptions);
        const classes = await prisma.class.findMany({
            where: {
                studentClass: {
                    some: {
                        studentId: session?.user?.id
                    }
                }
            }
        });
        return Response.json({ data: classes }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}