"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function ClassEdit() {
    const ref: any = useRef(null);
    const { id } = useParams();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleEdit = async () => {
        try {
            const res = await fetch(`/api/teacher/class/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: ref.current?.value,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData?.message || "Failed to update class");
            }

            router.push("/teacher");
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        }
    };

    return (
        <div>
            <input type="text" ref={ref} placeholder="Enter class name" />
            <button onClick={handleEdit}>Submit</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
