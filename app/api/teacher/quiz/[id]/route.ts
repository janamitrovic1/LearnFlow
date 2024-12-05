import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

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

export async function PUT(req: Request, { params }: { params: any }) {

    try {
        const session: any = await getServerSession(authOptions)
        const { id } = await params;
        const {name, isPrivate, questions, students} = await req.json();
        const updatedQuiz = await prisma.quiz.update({
            where: {
              id: id, // Provide the quiz ID to update
            },
            data: {
              name: name,
              isPrivate: isPrivate,
            },
          });
          
          // Delete all existing questions and related responses/answers for the quiz
          
          await prisma.answer.deleteMany({
            where: {
              question: {
                quizId: id
              }
            },
          });

          await prisma.response.deleteMany({
            where: {
              question: {
                quizId: id
              }
            },
          });
          
          await prisma.question.deleteMany({
            where: {
              quizId: id,
            },
          });
          
          // Recreate questions and their related responses and answers
          const updatedQuestions = await Promise.all(
            questions.map(async (question: any) => {
              const createdQuestion = await prisma.question.create({
                data: {
                  text: question.text,
                  questionType: question.questionType,
                  teacherId: session.user.id,
                  quizId: id,
                },
              });
          
              await Promise.all(
                question.answers.map(async (answer: any, index: number) => {
                  const createdAnswer = await prisma.response.create({
                    data: {
                      questionId: createdQuestion.id,
                      text: answer,
                    },
                  });
          
                  // Link correct answers
                  await Promise.all(
                    question.correctAnswers.map(async (correctAnswer: any) => {
                      if (correctAnswer === index) {
                        await prisma.answer.create({
                          data: {
                            questionId: createdQuestion.id,
                            responseId: createdAnswer.id,
                          },
                        });
                      }
                    })
                  );
                })
              );
            })
          );
          
          if(students)
            students?.map(async(student: any) => {
                await prisma.studentQuiz.create({
                    data: {
                        studentId: student,
                        quizId: updatedQuiz?.id
                    }
                });
            });
        
        return Response.json({ message: "Quiz updated successfully!"}, { status: 200 });
        
    } catch (error) {
        console.log(error);
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