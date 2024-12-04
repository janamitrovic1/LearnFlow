import { prisma } from "@/prisma/db";

export async function GET(req: Request, { params } : { params: { id: string }}){
    try {
        const { id } = await params;
        const correctAnswers = await prisma.answer.findMany({
            where: {
                question: {
                    quizId: id
                }
            }, select: {
                response: {
                    select: {
                        text: true
                    }
                },
                question: {
                    select: {
                        text: true
                    }
                }
            }
        });
        return Response.json({ data: correctAnswers }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}