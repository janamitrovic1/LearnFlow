"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Class {
    id: string;
    name: string;
    teacher: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }
const Classes = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const run = async() => {
            try {
                const res = await fetch("/api/student/class");
                if(res.ok){
                    const { data } = await res.json();
                    setClasses(data);
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
            { classes.map((clasS) => (
                <Link href={"class/" + clasS.id} key={clasS.id}>
                    <div>
                        <h2>{clasS.name}</h2> 
                        <p>{clasS.teacher.firstName} {clasS.teacher.lastName}</p> 
                    </div> 
                </Link>
            ))}
        </div>
        
    )
}

export default Classes