"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorData extends FormData{
	request: string;
}

export default function StudentSignIn() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<Partial<ErrorData>>({});
  const router = useRouter()

  const validateInput = (name: keyof FormData, value: string) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.trim() === "") return "This field is required.";
        if (value.length < 2) return "Must be at least 2 characters.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email address.";
        break;
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value !== formData.password) return "Passwords do not match.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateInput(name as keyof FormData, value);
    setError((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    // Validate all fields on submit
    const newErrors: Partial<FormData> = {};
    for (const [key, value] of Object.entries(formData)) {
      const error = validateInput(key as keyof FormData, value);
      if (error) newErrors[key as keyof FormData] = error;
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      const res = await signIn("SignUpS", {
        redirect: false,
        ...formData
      })
      if(!res?.ok)
			  setError({ request: "Invalid Credentials Are Provided!" })
      router.push("/student")
    }
  };
 return(
  <div className="md:max-w-md max-w-72 mx-auto mt-8 p-6 border rounded-md shadow-lg">
  <h2 className="md:text-2xl text-xl font-semibold text-center mb-4">Sign Up As a Student</h2>
  {error.request}
  <form onSubmit={handleSubmit}>
    {["firstName", "lastName", "email", "password", "confirmPassword"].map(
      (field) => (
        <div key={field} className="mb-4">
          <label
            htmlFor={field}
            className={`block md:text-sm text-[10px] font-medium ${
              error[field as keyof FormData] ? "text-red-500" : "text-gray-700"
            }`}
          >
            {field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
          <input
            type={
              field.includes("password") || field.includes("confirmPassword")
                ? "password"
                : "text"
            }
            id={field}
            name={field}
            className={`w-full px-3 py-2 mt-1 border ${
              error[field as keyof FormData]
                ? "border-red-500"
                : "border-gray-300"
            } bg-gray-50 text-gray-800 rounded-md focus:outline-none focus:ring-2 ${
              error[field as keyof FormData]
                ? "focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
            value={formData[field as keyof FormData]}
            onChange={handleInputChange}
          />
          {error[field as keyof FormData] && (
            <p className="text-red-500 text-sm mt-1">
              {error[field as keyof FormData]}
            </p>
          )}
        </div>
      )
    )}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Sign Up
    </button>
    <p className="mt-4 text-center md:text-lg text-sm">
      Already have an account?{" "}
      <Link href="/student/signin" className="text-blue-600 hover:underline">
        Sign In!
      </Link>
    </p>
  </form>
</div>
 );
}
