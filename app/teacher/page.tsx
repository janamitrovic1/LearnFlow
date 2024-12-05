"use client";

import { useEffect, useState } from "react";
import { TeachersClassesType } from "@/components/TeachersClasses";
import TeachersClasses from "@/components/TeachersClasses";
import TeachersQuizes from "@/components/TeachersQuizes";
import { TeachersQuizesType } from "@/components/TeachersQuizes";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const Page = () => {
  const [classes, setClasses] = useState<TeachersClassesType[]>([]);
  const [quizes, setQuizes] = useState<TeachersQuizesType[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingQuizes, setLoadingQuizes] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch(`/api/teacher/class`, {
          credentials: "include",
        });
        const { data }: { data: TeachersClassesType[] } = await res.json();
        setClasses(data);
      } catch (error) {
        console.log("Error fetching classes:", error);
      } finally {
        setLoadingClasses(false);
      }
    };

    const fetchQuizes = async () => {
      try {
        const res = await fetch(`/api/teacher/quiz`, {
          credentials: "include",
        });
        const { data }: { data: TeachersQuizesType[] } = await res.json();
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

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <main className="mt-6 w-full flex">
        {/* Class Sections */}
        <div className="w-full">
          <div className="flex flex-row gap-5 items-center">
            <h1 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text">
              <Link href="/teacher/class">Your Classes</Link>
            </h1>
            <Link href="teacher/class/create" className=" ">
              <PlusCircle stroke="green"></PlusCircle>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {loadingClasses ? (
              <p>Loading classes...</p>
            ) : classes.length > 0 ? (
              classes.map((classItem, index) => (
                <TeachersClasses key={index} props={classItem} />
              ))
            ) : (
              <p>No Classes Found</p>
            )}
          </div>

          {/* Test Section */}
          <section className="mt-6">
            <div className="flex flex-row gap-5 items-center">
              <h1 className="md:text-2xl md:text-left text-center text-xl font-semibold text-text">
                <Link href="/teacher/quiz/">Your Quizzes</Link>
              </h1>
              <Link href="teacher/quiz/create" className=" ">
                <PlusCircle stroke="green"></PlusCircle>
              </Link>
            </div>
            <div className="mt-4">
              {loadingQuizes ? (
                <p>Loading quizzes...</p>
              ) : quizes.length > 0 ? (
                quizes.map((quizItem, index) => (
                  <TeachersQuizes key={index} props={quizItem} />
                ))
              ) : (
                <p>No Tests Found.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;
