'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Classes = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await fetch("/api/student/class");
                if (res.ok) {
                    const { data } = await res.json();
                    setClasses(data);
                } else {
                    setError("Failed to fetch classes.");
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message || "An unknown error occurred.");
            }
        };
        run();
    }, []);

    return (
        <div className="container mx-auto p-6">
            {error && <p className="text-red-600 font-semibold mb-4">Error: {error}</p>}

            {classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((clasS) => (
                        <Link href={`class/${clasS.id}`} key={clasS.id} passHref>
                            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{clasS.name}</h2>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Teacher:</span> {clasS.teacher.firstName} {clasS.teacher.lastName}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center mt-6">No classes available.</p>
            )}
        </div>
    );
};

export default Classes;
