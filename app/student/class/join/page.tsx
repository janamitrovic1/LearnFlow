
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
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const validateInput = (value: string) => {
    if (value.trim() === "") {
      return "Class name cannot be empty.";
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(value);

    const errorMessage = validateInput(value);
    setError(errorMessage);
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    if (formData == "")
      setError("Enter class code!");
    else{
        const res = await fetch("/api/student/class/" + formData, {
            method: "POST",
            body: JSON.stringify({ name: formData })
        })
        if(res.ok)
            router.push("/student");
        else
            setError("Unknown error occured")
    }
  };

  return (
    <div className="md:max-w-md max-w-72 mx-auto mt-8 p-6 border rounded-md shadow-lg">
      <h2 className="md:text-2xl text-xl font-semibold text-center mb-4">
        Enter a class
      </h2>
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="className"
            className={`block md:text-sm text-[10px] font-medium ${
              error ? "text-red-500" : ""
            }`}
          >
            Class Code
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
          onSubmit={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Join Class
        </button>
      </form>
    </div>
  );
}
