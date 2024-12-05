"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage() {
    const params = useParams();
    const [quiz, setQuiz] = useState<any>(null);

    useEffect(() => {
        const run = async () => {
            const res = await fetch("http://localhost:3000/api/teacher/quiz/" + params?.id);
            const { data: quizes } = await res.json();
            setQuiz(quizes);
        };
        run();
    }, []);

    return (
        <div className="flex justify-center min-h-screen bg-white p-6">
            <div className="w-full max-w-3xl bg-gray-100 rounded-lg shadow-md p-8">
                {/* Card za osnovne informacije o kvizu */}
                <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-3xl font-semibold break-words md:break-all text-gray-800 mb-4">{quiz?.name}</h2>
                    <div className="text-gray-700 break-words md:break-all space-y-2">
                        <p><span className="font-semibold">Quiz ID:</span> {quiz?.id}</p>
                        <p><span className="font-semibold">Teacher ID:</span> {quiz?.teacherId}</p>
                        <p><span className="font-semibold">Privacy:</span> {quiz?.isPrivate ? "Private" : "Public"}</p>
                    </div>
                </div>

                {/* Pitanja i odgovori */}
                <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h3>
                    {quiz?.questions?.length > 0 ? (
                        quiz.questions.map((question: any, index: number) => (
                            <div key={index} className="mb-6">
                                <p className="text-gray-800 break-words md:break-all mb-2">
                                    <span className="font-semibold">Question {index + 1}:</span> {question.text}
                                </p>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-700 mb-2">Responses:</h4>
                                    {question.responses?.map((response: any, resIndex: number) => (
                                        <p
                                            key={resIndex}
                                            className={`text-gray-600 break-words md:break-all ${
                                                response.isCorrect
                                                    ? "text-green-600 font-semibold"
                                                    : ""
                                            }`}
                                        >
                                            {resIndex + 1}. {response.text}{" "}
                                            {response.isCorrect && (
                                                <span className="text-sm text-green-600">(Correct)</span>
                                            )}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No questions available.</p>
                    )}
                </div>

                {/* Studenti */}
                <div className="bg-gray-200 p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Students</h3>
                    {quiz?.students?.length > 0 ? (
                        quiz.students.map((studentEntry: any, index: number) => (
                            <div key={index} className="mb-4 break-words md:break-all border-b border-gray-300 pb-4">
                                <p className="text-gray-800">
                                    <span className="font-semibold">Name:</span> {studentEntry.student.firstName} {studentEntry.student.lastName}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Email:</span> {studentEntry.student.email}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No students assigned to this quiz.</p>
                    )}
                </div>

                <button className="bg-red-500 mt-4 rounded-3xl px-4 py-2 transition hover:scale-105 duration-500 text-white">
                    Delete Quiz
                </button>
            </div>
        </div>
    );
}
