'use client'

import { useRef, useState } from "react"

export default function SearchPage() {
    const searchRef: any = useRef(null)
    const [quizzes, setQuizzes] = useState<any>([])
    const handleSearch = async() => {
        const res = await fetch("/api/student/quiz/search?search=" + searchRef.current?.value);
        const { data } = await res.json();
        setQuizzes(data);
    }
    return <div>
        <input type="text" ref={searchRef}/>
        <button onClick={handleSearch}>Submit</button>
        <h3>Quizzes:</h3>
        <div>
            {quizzes?.map((quiz: any, index: number) => (
                <div key={index} style={{border: "2px solid"}}>
                    <h3>{quiz?.name}</h3>
                    <p>Teacher: {quiz?.teacher?.email}</p>
                    <p>Questions: {quiz?._count?.questions}</p>
                </div>
            ))}
        </div>
    </div>
}