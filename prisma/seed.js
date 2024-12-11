import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const n = 5;

const main = async() => {
    for(let i = 0; i < n; i++) {
        const firstName =  faker.person.firstName();
        const lastName = faker.person.lastName();
        const pass = await bcrypt.hash("test123", 10);
        await prisma.teacher.create({
            data: {
                firstName,
                lastName,
                email: firstName + lastName + "@gmail.com",
                password: pass
            }
        })
    }
}

main();