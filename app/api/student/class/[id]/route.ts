import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params } : { params : { id: string}}) {
    try {
        const session: any = await getServerSession(authOptions)
        const { id } = await params;

        const classes = await prisma.studentClass.findUnique({
            where: {
                classId_studentId: {
                    studentId: session?.user?.id,
                    classId: id
                }
            },
            include: {
                student: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        image: true
                    }
                },
                class: {
                    select: {
                        teacher: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                                image: true
                            }
                        }
                    }
                }
            }
        })

        return Response.json({ data: classes }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params } : { params : { id: string}}) {
    try {
        const session: any = await getServerSession(authOptions)
        const { id } = await params;
        const classes = await prisma.studentClass.delete({
            where: {
                classId_studentId: {
                    classId: id,
                    studentId: session?.user?.id
                }
            }
        });
        return Response.json({ message: "Exited class successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ err: error }, { status: 500 });
    }
}