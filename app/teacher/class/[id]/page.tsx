'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function ClassPageID() {
    const params = useParams();
    const [clasS, setClass] = useState<any>([]);

    useEffect(() => {
        const run = async() => {
            const res = await fetch("/api/teacher/class/" + params?.id, {
                credentials: 'include'
            })
            const { data } = await res.json();
            console.log(data);
            setClass(data);
        }
        run();
    }, [])

    return (
        <div>
            <h3>{clasS?.id}</h3>
            {clasS?.studentClass?.map((studentClass: any, index: number) => (
                <p key={index}>{studentClass?.student?.firstName} {studentClass?.student?.lastName}</p>
            ))}
        </div>
    )
}