import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";

export async function GET() {
    try {
        const session : any = await getServerSession(authOptions);
        const studentPrivateQuizzes = await prisma.studentQuiz.findMany({
            where: {
              studentId: session?.user?.id, 
            },
            include: {
              quiz: {
                include: {
                  _count: {
                    select: {
                      questions: true, 
                    },
                  },
                  teacher: {
                    select: {
                      firstName: true,
                      lastName: true
                    }
                  }
                },
              },
            },
          });
          
        return Response.json({ data: studentPrivateQuizzes }, { status: 200 });          
    } catch (error) {
      console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);
    const { name, questions, teachers } = await req.json();

    const quiz = await prisma.sQuiz.create({
      data: {
          name,
          studentId: session?.user?.id
      }
    });

  await Promise.all(
      questions.map(async (question: any) => {
          const createdQuestion = await prisma.sQuestion.create({
              data: {
                  text: question?.text,
                  questionType: question?.questionType,
                  quizId: quiz?.id 
              },
           });
          console.log(createdQuestion, "Cre")
          question.answers.map(async (answer: any, index: number) => {
              const createdAnswer = await prisma.sResponse.create({
                  data: {
                      questionId: createdQuestion.id,
                      text: answer
                     }
              });
              question.correctAnswers.map(async (correctAnswer: any) => {
                  if(correctAnswer == index)
                      await prisma.sAnswer.create({
                          data: {
                              responseId: createdAnswer.id
                          }
                      })
              })
          })
      })
  );
  if(teachers)
      teachers?.map(async(teacher: any) => {
          await prisma.teacherQuizzes.create({
              data: {
                  teacherId: teacher,
                  quizzId: quiz.id
              }
          });
      });

    return Response.json({ message: "Uspesno Kreirano Kviz!" }, { status: 201 });

  } catch (error) {
    console.log(error)
    return Response.json({ err: "An Unknown Error Occured" }, { status: 500 });
  }
}