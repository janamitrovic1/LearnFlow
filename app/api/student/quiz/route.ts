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