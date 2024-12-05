"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  name: string;
}

interface ErrorData {
  name: string;
}

export default function AddClassForm() {
  const [formData, setFormData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateInput = (value: string): string => {
    if (value.trim() === "") {
      return "Class name cannot be empty.";
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData(value);

    const errorMessage = validateInput(value);
    setError(errorMessage);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the input before making the request
    const validationError = validateInput(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("/api/teacher/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: formData }),
      });

      if (res.ok) {
        router.push("/teacher");
      } else {
        const responseBody = await res.json();
        setError(responseBody.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create class. Please try again later.");
    }
  };

  return (
    <div className="md:max-w-md max-w-72 mx-auto mt-8 p-6 border rounded-md shadow-lg">
      <h2 className="md:text-2xl mt-6 text-xl font-semibold text-center mb-4">
        Create a class
      </h2>
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
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
            value={formData}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 mt-1 border ${
              error ? "border-red-500" : "border-gray-300"
            } bg-gray-50 text-gray-800 rounded-md`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Create Class
        </button>
      </form>
    </div>
  );
}
