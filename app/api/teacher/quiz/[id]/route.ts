import { prisma } from "@/prisma/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        responses: true,
                    },
                },
                students: {
                    include: {
                        student: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            }
                        }
                    }
                }
            },
        });
          

        return Response.json({ data: quiz }, { status: 200 });

    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const quiz = await prisma.$transaction([
            prisma.answer.deleteMany({
                where: {
                  question: {
                    quizId: id,
                  },
                },
              }),
            prisma.response.deleteMany({
            where: {
                question: {
                quizId: id,
                },
            },
            }),
            prisma.question.deleteMany({
                where: { quizId: id },
            }),
            prisma.studentQuiz.deleteMany({
                where: { quizId: id },
            }),
            prisma.quiz.delete({
                where: { id }
            })
        ])
        return Response.json({ data: quiz }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
    
}