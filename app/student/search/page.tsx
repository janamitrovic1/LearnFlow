'use client'

import Link from "next/link";
import { useRef, useState } from "react";

export default function SearchPage() {
    const searchRef: any = useRef(null);
    const [quizzes, setQuizzes] = useState<any>([]);

    const handleSearch = async () => {
        const res = await fetch("/api/student/quiz/search?search=" + searchRef.current?.value);
        const { data } = await res.json();
        setQuizzes(data);
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    ref={searchRef}
                    className="border border-gray-300 rounded-lg p-3 w-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search quizzes..."
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                    Submit
                </button>
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Quizzes:</h3>

            {quizzes?.length === 0 ? (
                <p className="text-gray-500">No quizzes found.</p>
            ) : (
                
                <div className="">
                    {quizzes?.map((quiz: any, index: number) => (
                        <Link key={index} href={`/student/quiz/${quiz?.id}`}>
                            <div  className="border border-gray-300 rounded-lg p-4 shadow-sm mb-4 hover:shadow-md transition duration-200">
                                <h3 className="text-xl font-bold text-gray-800">{quiz?.name}</h3>
                                <p className="text-gray-600">Teacher: {quiz?.teacher?.email}</p>
                                <p className="text-gray-600">Questions: {quiz?._count?.questions}</p>
                            </div>
                        </Link>
                        
                    ))}
                </div>
            )}
        </div>
    );
}
