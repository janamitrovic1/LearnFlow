import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params } : { params: any }) {

    try {
        const { id } = await params;
        const session: any = await getServerSession(authOptions);

        const quiz = await prisma.quiz.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                isPrivate: true,
                questions: {
                    select: {
                        id: true,
                        text: true,
                        questionType: true,
                        responses: {
                            select: {
                                id: true,
                                text: true
                            }
                        },
                        answers: {
                            select: {
                                responseId: true,
                                questionId: true
                            }
                        }
                    }
                }
            }
        });

        if(quiz?.isPrivate) {
            const studentQuiz = await prisma.studentQuiz.findUnique({
                where: {
                    studentId_quizId: {
                        studentId: session?.user?.id,
                        quizId: id
                    }
                }
            })

            if(!studentQuiz)
                return Response.json({ message: "Unauthorized!"}, { status: 401 });
            
        }

        return Response.json({ data: quiz }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
    
}