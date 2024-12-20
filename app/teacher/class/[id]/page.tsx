"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TeachersClassesType } from "@/components/TeachersClasses";
import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleX } from "lucide-react";
export default function ClassPageID() {
  const params = useParams();
  const [clasS, setClass] = useState<TeachersClassesType | null>(null); // Precizno tipizovanje
  const router = useRouter();

  const fetchData = async () => {
    const res = await fetch("/api/teacher/class/" + params?.id, {
      credentials: "include",
    });
    const { data: classData }: { data: TeachersClassesType } = await res.json();
    setClass(classData);
  };

  useEffect(() => {
    fetchData();
  }, [params?.id]);

  if (!clasS) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading class information...</p>
      </div>
    );
  }

  const handleDelete = async () => {
    const res = await fetch("/api/teacher/class/" + params?.id, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      router.push("../");
    }
  };

  const handleThrowOut = async (id: any) => {
    const res = await fetch(`/api/teacher/class/${clasS?.id}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchData();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md flex flex-col text-wrap rounded-lg mt-8">
      <h1 className="text-2xl font-bold md:text-left text-center text-gray-800 mb-4">
        {clasS.name}
      </h1>
      <p className="text-gray-600 text-sm">
        Teacher ID: <span className="font-medium">{clasS.teacherId}</span>
      </p>
      <p className="text-gray-600 text-sm mt-1 mb-6">
        Code: <span className="font-medium">{clasS.id}</span>
      </p>
      <h2 className="text-xl md:text-left text-center font-semibold text-gray-700 mb-3">
        Students in Class ({clasS._count.studentClass})
      </h2>
      {clasS.studentClass.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {clasS.studentClass.map((studentClass, index) => (
            <li key={index} className="py-3 bg-slate-50 rounded-xl mb-2 flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {studentClass.student.firstName.charAt(0)}
                {studentClass.student.lastName.charAt(0)}
              </div>
              <div className="ml-4 truncate">
                <p className="text-sm text-wrap font-medium text-gray-900">
                  {studentClass.student.firstName}{" "}
                  {studentClass.student.lastName}
                </p>
                <p className="text-sm text-wrap text-gray-500 ">
                  {studentClass.student.email}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => handleThrowOut(studentClass?.student?.id)}
                >
                  <CircleX></CircleX>
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No students enrolled in this class yet.</p>
      )}
      <div className="flex justify-center gap-4 mt-4">
        <Button
          className="text-white md:text-auto text-sm rounded-3xl px-6 py-2 bg-red-500 hover:bg-red-600 transition-colors"
          onClick={handleDelete}
        >
          Delete Class
        </Button>
        <Link
          href={clasS?.id + "/edit"}
          className="text-white md:text-auto text-sm rounded-3xl px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-center"
        >
          Edit Class
        </Link>
      </div>
    </div>
  );
}
