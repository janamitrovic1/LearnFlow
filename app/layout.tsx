import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const poppins = localFont(
  {
    src :[
      {
        path:'./fonts/Poppins-Black.ttf',
        weight:'900',
        style:'normal'
      },{
        path:'./fonts/Poppins-ExtraBold.ttf',
        weight:'800',
        style:'normal'
      },{
        path:'./fonts/Poppins-Bold.ttf',
        weight:'700',
        style:'normal'
      },{
        path:'./fonts/Poppins-SemiBold.ttf',
        weight:'600',
        style:'normal'
      },{
        path:'./fonts/Poppins-Medium.ttf',
        weight:'500',
        style:'normal'
      }
      ,{
        path:'./fonts/Poppins-Regular.ttf',
        weight:'400',
        style:'normal'
      }
      ,{
        path:'./fonts/Poppins-Light.ttf',
        weight:'300',
        style:'normal'
      },{
        path:'./fonts/Poppins-ExtraLight.ttf',
        weight:'200',
        style:'normal'
      },
      {
        path:'./fonts/Poppins-Thin.ttf',
        weight:'100',
        style:'normal'
      },
    ],
    variable: '--font-poppins',
  }
);

export const metadata: Metadata = {
  title: "LearnFlow",
  description: "Made for students and teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.variable}
      >
          <AuthProvider>
            <Nav/>
            {children}
          </AuthProvider>

      </body>
    </html>
  );
}
