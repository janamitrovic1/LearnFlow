"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ClassEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("")
  const [odlValue, setOldValue] = useState("")

  const handleEdit = async () => {
    try {
        if(odlValue == name)
            throw new Error("You Enter Same Class Name!")
      const res = await fetch(`/api/teacher/class/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
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

  useEffect(() => {
    const run = async() => { 
        const res = await fetch("/api/teacher/class/" + id, {
            credentials: 'include'
        })
        const { data } = await res.json();
        setName(data?.name);
        setOldValue(data?.name);
    }
    run();
  }, [])

  return (
    <div className="md:max-w-md max-w-72 mx-auto mt-8 p-6 border rounded-md shadow-lg">
      <h2 className="md:text-2xl mt-6 text-xl font-semibold text-center mb-4">
        Edit class
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form>
        <div className="mb-4">
          <label
            htmlFor="className"
            className={`block md:text-sm text-[10px] font-medium ${
              error ? "text-red-500" : ""
            }`}
          >
            Class Name
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 mt-1 border ${
              error ? "border-red-500" : "border-gray-300"
            } bg-gray-50 text-gray-800 rounded-md`}
          />
        </div>
        <button
          onClick={handleEdit}
          type="button"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Edit Class
        </button>
      </form>
    </div>
  );
}
