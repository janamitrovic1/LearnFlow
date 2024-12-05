'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
const PublicQuizzes = () => {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function run() {
            try {
                const res = await fetch("http://localhost:3000/api/student/quiz");
                if (res.ok) {
                    const { data } = await res.json();
                    const publicQuizzes = data.map((item: any) => item.quiz).filter((quiz: any) => !quiz.isPrivate);
                    setQuizzes(publicQuizzes);
                } else {
                    setError("Failed to fetch quizzes!");
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || "An unknown error occurred!");
            }
        }
        run();
    }, []);

    return (
        <div className="container mx-auto p-6">
            {error && <p className="text-red-600 font-semibold mb-4">Error: {error}</p>}
            <section className="mt-6 ">
                        <Link href="/student/search" className="flex flex-row gap-3 items-center bg-stone-300 w-fit px-4 py-2 rounded-3xl break-all md:truncate">Search for Quizzes!<Search /></Link>        
            </section>
            {quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-6">
                   
                    {quizzes.map((quiz, index) => (
                        <Link href={`/student/quiz/${quiz.id}`} key={quiz.id} passHref>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <h2 className="text-xl font-semibold break-all md:truncate text-gray-800 mb-2">{quiz.name}</h2>
                                <p className="text-gray-600 break-all md:truncate">
                                    <span className="font-semibold ">Teacher:</span> {quiz.teacher.firstName} {quiz.teacher.lastName}
                                </p>
                                <p className="text-gray-600 break-all md:truncate">
                                    <span className="font-semibold">Questions:</span> {quiz._count.questions}
                                </p>
                                <p className="text-gray-600 break-all md:truncate">
                                    <span className="font-semibold">Privacy:</span> Public
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center mt-6">No public quizzes available.</p>
            )}
        </div>
    );
};

export default PublicQuizzes;
