import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

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

export async function PUT(req: Request, { params } : { params : { id: string}}) {
    try {
      const session: any = await getServerSession(authOptions);
      const { id } = await params;
      const { name, students } = await req.json();

      const updatedClass = await prisma.class.update({
        where: { id },
        data: { name } 
      })

      await prisma.studentClass.deleteMany({
        where: { classId: id }
      })

      students.map(async (student: string) => {
        
        await prisma.studentClass.create({
            data: {
                classId: updatedClass.id,
                studentId: student
            }
        })
    });

    return Response.json({ message: "Successfully updated class!" }, { status: 200 });

    } catch (error) {
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