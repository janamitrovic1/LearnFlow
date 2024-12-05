import { prisma } from "@/prisma/db";

export async function DELETE(req: Request, { params } : any) {
    try{
        const { id, studentId } = await params;
        
        const deletedStudent = await prisma.studentClass.delete({
            where: {
                classId_studentId: {
                    studentId,
                    classId: id
                }
            }
        })

        return Response.json({ message: "Deleted Student Successfully From Class"}, { status: 200 });

    } catch(error) {
        return Response.json({ err: error }, { status: 500 });
    }
}