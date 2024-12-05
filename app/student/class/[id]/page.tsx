'use client';

import { useParams, useRouter  } from 'next/navigation';
import { useEffect, useState } from 'react';

const Class = () => {
    const { id } = useParams();
    const router = useRouter();
    const [clasS, setClasS] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleExit = () => {
        const run = async() => {
            const res = await fetch("/api/student/class/" + clasS?.id, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(res.ok)
                router.push("/student")
        }
        run();
    }

    useEffect(() => {
        const run = async () => {
            try {
                const res = await fetch("/api/student/class/" + id, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const { data } = await res.json();
                    setClasS(data);
                } else {
                    setError("Failed to fetch class data.");
                }
            } catch (error: any) {
                console.error(error);
                setError(error.message || "An unknown error occurred.");
            }
        };
        run();
    }, [id]);

    return (
        <div className="container mx-auto p-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">Error: {error}</span>
                </div>
            )}

            {clasS && (
                <div>
                    
                    {/* Header section */}
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h1 className="md:text-3xl font-bold break-words md:truncate text-lg text-gray-800 mb-4">{clasS.name}</h1>
                        <div className="flex items-center gap-4">
                            {clasS.teacher.image && (
                                <img
                                    src={clasS.teacher.image}
                                    alt={`${clasS.teacher.firstName} ${clasS.teacher.lastName}`}
                                    className="w-16 h-16 rounded-full object-cover border-2"
                                />
                            )}
                            <div>
                                <h2 className="md:text-xl text-md break-all md:truncate font-semibold text-gray-700">
                                    Teacher: {clasS.teacher.firstName} {clasS.teacher.lastName}
                                </h2>
                                <p className=" break-all md:truncate md:text-md text-sm text-gray-600">{clasS.teacher.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Students section */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                        <h4 className="md:text-2xl text-base font-semibold text-gray-800 mb-4">Students</h4>
                        {clasS.studentClass.length > 0 ? (
                            <ul className="space-y-4">
                                {clasS.studentClass.map((studentClass: any, index: number) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {studentClass.student.image && (
                                            <img
                                                src={studentClass.student.image}
                                                alt={`${studentClass.student.firstName} ${studentClass.student.lastName}`}
                                                className="w-12 h-12 rounded-full object-cover border-2"
                                            />
                                        )}
                                        <div>
                                            <p className="md:text-lg text-sm break-all md:truncate font-medium text-gray-800">
                                                {studentClass.student.firstName} {studentClass.student.lastName}
                                            </p>
                                            <p className="break-all md:truncate md:text-md text-sm text-gray-600">{studentClass.student.email}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No students enrolled in this class.</p>
                        )}
                    </div>
                    <button onClick={handleExit} className='bg-red-500 transition duration-500 hover:scale-105 text-white px-4 py-2 mt-4 rounded-xl'>Exit Class!</button>
                </div>
            )}
        </div>
    );
};

export default Class;
