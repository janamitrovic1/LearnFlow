import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/db";
import LoginSchema from "@/utils/zodschemas/LoginSchema";
import RegisterSchema from "@/utils/zodschemas/RegisterSchema";
import { text } from "stream/consumers";
import { object } from "zod";

export const authOptions: AuthOptions = {
  providers: [
    //  SignUpT
    CredentialsProvider({
        id: "SignUpT",
      credentials: {
        firstName: { label: 'Enter First Name:', type: 'text' },
        lastName: { label: 'Enter Last Name: ', type: 'text' },
        email: { label: 'Enter Email: ', type: 'email'},
        password: { label: 'Enter Password: ', type: 'password'}
      },
      async authorize(credentials) {
        try {
            if(credentials == null)
              return null;

            const exists = await prisma.teacher.findFirst({where: {
                email: credentials.email
            }});

            if(exists)
              return null;

            const hashed = await bcrypt.hash(credentials.password, 10);

            const { firstName, lastName, email, password} = {...credentials, password: hashed};

            return await prisma.teacher.create({
              data: {
                firstName,
                lastName,
                email,
                password
              }
            })

        } catch (error) {
          console.log(error)
            return Promise.reject("Invalid Credentials!");
        }
    }}),
    //  SignInT
    CredentialsProvider({
      id: "SignInT",
      credentials: {
        email: { label: 'Enter Email: ', type: 'email'},
        password: { label: 'Enter Password: ', type: 'password'}
      },
      async authorize(credentials) {
        try {
            if(credentials == null)
              return null;

            const user = await prisma.teacher.findFirst({where: {
                email: credentials.email
            }});

            if(!user)
              return null;

            const valid = await bcrypt.compare(credentials.password, user?.password);

            if(valid)
              return user

            return null;
        } catch (error) {
            return Promise.reject("Invalid Credentials!");
        }
    }}),
    //  SignUpS
    CredentialsProvider({
      id: "SignUpS",
    credentials: {
      firstName: { label: 'Enter First Name:', type: 'text' },
      lastName: { label: 'Enter Last Name: ', type: 'text' },
      email: { label: 'Enter Email: ', type: 'email'},
      password: { label: 'Enter Password: ', type: 'password'}
    },
    async authorize(credentials) {
      try {
          if(credentials == null)
            return null;

          const exists = await prisma.student.findFirst({where: {
              email: credentials.email
          }});

          if(exists)
            return null;

          const hashed = await bcrypt.hash(credentials.password, 10);

          const { firstName, lastName, email, password} = {...credentials, password: hashed};

          return await prisma.student.create({
            data: {
              firstName,
              lastName,
              email,
              password
            }
          })

      } catch (error) {
        console.log(error)
          return Promise.reject("Invalid Credentials!");
      }
    }}),
    //  signInS
    CredentialsProvider({
      id: "SignInS",
      credentials: {
        email: { label: 'Enter Email: ', type: 'email'},
        password: { label: 'Enter Password: ', type: 'password'}
      },
      async authorize(credentials) {
        try {
            if(credentials == null)
              return null;

            const user = await prisma.student.findFirst({where: {
                email: credentials.email
            }});

            if(!user)
              return null;

            const valid = await bcrypt.compare(credentials.password, user?.password);

            if(valid)
              return user

            return null;
        } catch (error) {
            return Promise.reject("Invalid Credentials!");
        }
    }})
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };