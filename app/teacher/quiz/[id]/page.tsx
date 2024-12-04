'use client'

import { Quiz } from "@prisma/client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function() {
    const params = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        const run = async() => {
            const res = await fetch("http://localhost:3000/api/teacher/quiz/" + params?.id);
            const { data } = await res.json();
            setQuiz(data);
        }
        run();
    }, [])

    return (
        <div>
            <h2>{params?.id}</h2>
            <p>{quiz?.name}</p>
        </div>
    )
}