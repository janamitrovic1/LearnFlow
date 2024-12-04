'use client'
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

    console.log(quiz)
    return (
        <div className="container mx-auto p-6">
            {/* Card za osnovne informacije o kvizu */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{quiz?.name}</h2>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Quiz ID:</span> {quiz?.id}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Teacher ID:</span> {quiz?.teacherId}
                </p>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Privacy:</span> {quiz?.isPrivate ? "Private" : "Public"}
                </p>
            </div>

            {/* Pitanja i odgovori */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions</h3>
                {quiz?.questions?.length > 0 ? (
                    quiz.questions.map((question: any, index: number) => (
                        <div key={index} className="mb-4">
                            <p className="text-gray-800 mb-2">
                                <span className="font-semibold">Question {index + 1}:</span> {question.text}
                            </p>
                            <div className="ml-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Responses:</h4>
                                {question.responses?.map((response: any, resIndex: number) => (
                                    <p
                                        key={resIndex}
                                        className={`text-gray-600 ${
                                            response.isCorrect
                                                ? "text-green-600 font-semibold" // Stil za tačan odgovor
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
                    <p className="text-gray-600">No questions available.</p>
                )}
            </div>

            {/* Studenti */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Students</h3>
                {quiz?.students?.length > 0 ? (
                    quiz.students.map((studentEntry: any, index: number) => (
                        <div key={index} className="mb-4">
                            <p className="text-gray-800">
                                <span className="font-semibold">Name:</span> {studentEntry.student.firstName}{" "}
                                {studentEntry.student.lastName}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Email:</span> {studentEntry.student.email}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No students assigned to this quiz.</p>
                )}
            </div>
        </div>
    );
}
