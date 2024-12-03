import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: Request) {
    try {
        const session : any = await getServerSession(authOptions);
        const { name, questions } = await req.json();
        await prisma.quiz.create({
            data: {
                name,
                teacherId: session.user.id
            }
        });

            const createdQuestions = await Promise.all(
                questions.map(async (question: any) => {
                    const createdQuestion = await prisma.question.create({
                        data: {
                            text: question.text,
                            questionType: question.questionType,
                            teacherId: session.user.id,
                        },
                    });
                    question.answers.map(async (answer: any, index: number) => {
                        const createdAnswer = await prisma.response.create({
                            data: {
                                questionId: createdQuestion.id,
                                text: answer
                            }
                        });
                        question.correctAnswers.map(async (correctAnswer: any) => {
                            if(correctAnswer == index) {
                                console.log(correctAnswer, index, 'create');
                                await prisma.answer.create({
                                    data: {
                                        questionId: createdQuestion.id,
                                        responseId: createdAnswer.id
                                    }
                                })
                            }
                        
                        })
                    })
                    
                })
            );
          
        return Response.json({ data: createdQuestions }, { status: 201 })
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}