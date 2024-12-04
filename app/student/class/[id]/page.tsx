"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
}

interface Teacher {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
}

interface StudentClass {
    classId: string;
    student: Student;
    studentId: string;
}

interface ClassData {
    id: string;
    name: string;
    studentClass: StudentClass[];
    teacher: Teacher;
}

const Class = () => {
    const { id } = useParams();
    const [clasS, setClasS] = useState<ClassData | null>(null); // Start with null
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await fetch("/api/student/class/" + id);
                if (res.ok) {
                    const { data } = await res.json();
                    setClasS(data);
                } else {
                    setError("Unknown error!");
                }
            } catch (error: any) {
                setError(error.message || "Unknown error!");
            }
        };
        run();
    }, [id]);

    return (
        <div>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <h1>{clasS?.name}</h1>
            <h2>{clasS?.teacher.firstName} {clasS?.teacher.lastName}</h2>
            <h4>Students:</h4>
            <ul>
                {clasS?.studentClass.map((studentClass, index) => (
                    <li key={index}>
                        {studentClass.student.firstName} {studentClass.student.lastName} - {studentClass.student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Class;
