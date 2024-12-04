import { prisma } from "@/prisma/db";

export async function GET(req: Request, { params } : { params : { id: string}}) {
    try {
        const { id } = await params;
        const clasS = await prisma.class.findFirst({
            where: { id },
            include: {
              _count: {
                select: {
                  studentClass: true,
                },
              },
              studentClass: {
                include: {
                  student: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      email: true,
                      image: true, 
                    },
                  },
                },
              },
            },
          });
          
        return Response.json({ data: clasS }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params } : { params : { id: string}}) {
    try {
        const { id } = await params;
        const clasS = await prisma.$transaction([
            prisma.studentClass.deleteMany({
                where: {
                    classId: id
                }
            }),
            prisma.class.delete({
                where: { id } 
            })
        ]);
        return Response.json({ data: clasS }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ err: error }, { status: 500 });
    }
}