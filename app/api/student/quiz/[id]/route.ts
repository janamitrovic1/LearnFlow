import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params } :  { params : { id: string}}) {
    try {
        const { id } = await params;
        const session: any = await getServerSession(authOptions);

        const quiz = await prisma.studentQuiz.findUnique({
            where: {
                studentId_quizId: {
                    studentId: session?.user?.id,
                    quizId: id
                }
            },
            include: {
                quiz: {
                    select: {
                        questions: {
                            include: {
                                responses: true,
                            },
                        },
                    }
                }
            }
        });

        return Response.json({ data: quiz }, { status: 200 });

    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params } :  { params : { id: string}}) {
    try {
        const { id } = await params;
        const session: any = await getServerSession(authOptions);

        const studentQuiz = await prisma.studentQuiz.delete({
            where: {
                studentId_quizId: {
                    studentId: session?.user?.id,
                    quizId: id
                }
            }
        })

        return Response.json({ message: "Successfully exited quiz!"}, { status: 200 });
        
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}