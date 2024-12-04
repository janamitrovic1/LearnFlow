"use client"

import React, { useEffect, useState } from 'react'

interface Quiz {
    id: string;
    isPrivate: boolean;
    name: string;
    teacher: {
      firstName: string;
      lastName: string;
    };
    teacherId: string;
    _count: {
      questions: number;
    };
  }
  
const Quizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [error, setError] = useState<any>(null);
    useEffect(() => {
        async function run() {
            try {
                const res = await fetch("http://localhost:3000/api/student/quiz");
                const {data} = await res.json();
                if(res.ok){
                    const quizzes = data.map((item: any) => item.quiz);
                    setQuizzes(quizzes);
                }
                else
                    setError("Unknown error!");
            } catch (error) {
                setError(error);
            }
        }
        run();
    }, []);
    return (
        <div>
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
            {quizzes.length > 0 ? (
                quizzes.map((quiz: any) => (
                    <div key={quiz.id}>
                        <h2>{quiz.name}</h2>
                        <p>{quiz.teacher.firstName + ' ' + quiz.teacher.lastName}</p>
                        <p>Questions: {quiz._count.questions}</p>
                    </div>
                ))
            ) : (
                <p>No quizzes available.</p>
            )}
        </div>
    )
}
export default Quizzes