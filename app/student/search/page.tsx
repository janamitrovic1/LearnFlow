'use client'

import { useRef } from "react"

export default function SearchPage() {
    const searchRef: any = useRef(null)
    const handleSearch = async() => {
        const res = await fetch("/api/student/quiz/search?search=" + searchRef.current?.value);
        const { data } = await res.json();
        console.log(data);
    }
    return <div>
        <input type="text" ref={searchRef}/>
        <button onClick={handleSearch}>Submit</button>
        <h3>Quizzes:</h3>
        <div>

        </div>
    </div>
}