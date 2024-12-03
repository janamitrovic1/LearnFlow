import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";

export async function GET(){
    try {
        const session : any = await getServerSession(authOptions);
        const classes = await prisma.class.findMany({
            where: {
                teacherId: session?.user.id
            },
            include: {
                _count: {
                    select: {
                        studentClass: true
                    }
                }
            }
        });
        return Response.json({ data: classes }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(authOptions);
        const { name, students } = await req.json();
        const clasS = await prisma.class.create({
            data: {
                teacherId: session?.user?.id,
                name
            }
        });
        students.map(async (student: string) => {
            await prisma.studentClass.create({
                data: {
                    classId: clasS.id,
                    studentId: student
                }
            })
        });
        return Response.json({ message: "Successfully made class!"}, { status: 201 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 })
    }
}