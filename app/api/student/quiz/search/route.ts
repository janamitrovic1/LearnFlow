import { prisma } from "@/prisma/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");

        const quizzes = await prisma.quiz.findMany({
            where: {
              name: {
                contains: search || "",
              },
            },
            include: {
              _count: {
                select: {
                  questions: true, // Count the number of questions
                },
              },
            },
          });

          return Response.json({ data: quizzes }, { status: 200 });

    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}