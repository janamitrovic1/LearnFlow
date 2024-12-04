import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET() {
    try {
        const session : any = await getServerSession(authOptions);
        const quizzes = await prisma.quiz.findMany({
            where: {
                teacherId: session?.user?.id
            }, 
            select: {
                id: true, 
                name: true,
                isPrivate:true,
                _count: {
                    select: {
                        questions: true,
                    },
                },
            }
        });
        return Response.json({ data: quizzes }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session : any = await getServerSession(authOptions);
        const { name, isPrivate, questions, students } = await req.json();
        const quiz = await prisma.quiz.create({
            data: {
                name,
                isPrivate,
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
                        quizId: quiz.id 
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
                        if(correctAnswer == index)
                            await prisma.answer.create({
                                data: {
                                    questionId: createdQuestion.id,
                                    responseId: createdAnswer.id
                                }
                            })
                    })
                })
            })
        );
        if(students)
            students.map(async(student: any) => {
                await prisma.studentQuiz.create({
                    data: {
                        studentId: student,
                        quizId: quiz.id
                    }
                });
            });
        return Response.json({ msg: "Quiz created successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}