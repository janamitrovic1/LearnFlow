"use client";

import React, { useEffect, useState } from "react";
import StudentClasses, { StudentClassesType } from "@/components/StudentClasses";
import StudentQuizes, { StudentQuizesType } from "@/components/StudentQuizes";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [classes, setClasses] = useState<StudentClassesType[]>([]);
  const [quizes, setQuizes] = useState<StudentQuizesType[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingQuizes, setLoadingQuizes] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`/api/student/class`, {
          credentials: "include",
        });
        const { data }: { data: StudentClassesType[] } = await res.json();
        setClasses(data);
      } catch (error) {
        console.log("Error fetching classes:", error);
      } finally {
        setLoadingClasses(false);
      }
    };

    const fetchQuizes = async () => {
      try {
        const res = await fetch(`/api/student/quiz`, {
          credentials: "include",
        });
        const { data }: { data: StudentQuizesType[] } = await res.json();
        setQuizes(data);
      } catch (error) {
        console.log("Error fetching quizzes:", error);
      } finally {
        setLoadingQuizes(false);
      }
    };

    fetchClasses();
    fetchQuizes();
  }, []);

  const privateQuizes = quizes.filter((quizItem) => quizItem.quiz.isPrivate);
  const publicQuizes = quizes.filter((quizItem) => !quizItem.quiz.isPrivate);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <main className="mt-6 w-full flex">
        {/* Class Sections */}
        <div className="w-full">
          <div className="flex flex-row gap-5 items-center">
            <h1 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text">
              <Link href="/student/class">Your Classes</Link>
            </h1>
            <Link href="student/class/join" className=" ">
              <PlusCircle stroke="green"></PlusCircle>
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            {loadingClasses ? (
              <p>Loading classes...</p>
            ) : classes.length > 0 ? (
              classes.map((classItem, index) => (
                <StudentClasses key={index} props={classItem} />
              ))
            ) : (
              <p>No Classes Found</p>
            )}
          </div>

          {/* Test Section */}
          <section className="mt-6">
            <h2 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text">
              <Link href="/student/quiz/private">Your Private Quizzes</Link>
            </h2>
            <div className="mt-4">
              {loadingQuizes ? (
                <p>Loading private quizzes...</p>
              ) : privateQuizes.length > 0 ? (
                privateQuizes.map((quizItem, index) => (
                  <StudentQuizes key={index} props={quizItem} />
                ))
              ) : (
                <p>No Tests Found.</p>
              )}
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mt-6">
            <h2 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text">
              <Link href="/student/quiz/public">Your Public Quizzes</Link>
            </h2>
            <div className="mt-4">
              {loadingQuizes ? (
                <p>Loading public quizzes...</p>
              ) : publicQuizes.length > 0 ? (
                publicQuizes.map((quizItem, index) => (
                  <StudentQuizes key={index} props={quizItem} />
                ))
              ) : (
                <p>No Quizzes Found.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;
