import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session: any = await getServerSession(authOptions);
    const { id } = await params;

    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher:{
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true
            }
        }, 
        studentClass: {
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
          },
        },
      },
    });

    return Response.json({ data: classData }, { status: 200 });
  } catch (error) {
    return Response.json({ err: error }, { status: 500 });
  }
}

export async function POST(req: Request, { params } : { params : { id: string}}) {
  try {
    const { id } = await params;
    const session: any = await getServerSession(authOptions);
    
    const exists = await prisma.class.findUnique({
      where: {
        id
      }
    });

    if(!exists)
      return Response.json({ message: "Class does not exists!"}, { status: 404 });
    
    await prisma.studentClass.create({
      data:{
        classId: id,
        studentId: session?.user?.id
      }
    });
    return Response.json({ message: "Successfully added to class!" }, { status: 200 });
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