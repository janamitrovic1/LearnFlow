import { prisma } from "@/prisma/db";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        console.log(id);
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