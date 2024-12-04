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

interface ErrorData extends FormData {
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
      const res = await signIn("SignUpT", {
        redirect: false,
        ...formData
      })
		  if(!res?.ok)
			  setError({ request: "Invalid Credentials Are Provided!" })
      router.push("/teacher")
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-xl overflow-hidden flex">
        {/* Leva strana sa slikom i tekstom */}
        <div className="hidden md:flex md:w-1/2 bg-[#252641] items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Capturing Moments, Creating Memories</h1>
            <p className="text-gray-300">Join us to build amazing experiences.</p>
          </div>
        </div>
  
        {/* Desna strana sa formom */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold mb-4">Sign Up As a Teacher</h2>
          {error?.request && (
            <p className="text-red-400 mb-4 text-sm">{error.request}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {["firstName", "lastName", "email", "password", "confirmPassword"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-400 mb-1"
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
                  className={`w-full px-4 py-2 border ${
                    error[field as keyof FormData]
                      ? "border-red-500"
                      : "border-gray-700"
                  } bg-gray-900 text-gray-200 rounded-lg focus:ring-[#767BC4] focus:border-[#767BC4]`}
                  value={formData[field as keyof FormData]}
                  onChange={handleInputChange}
                />
                {error[field as keyof FormData] && (
                  <p className="text-red-400 text-sm mt-1">
                    {error[field as keyof FormData]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-[#767BC4] text-white rounded-lg hover:bg-[#5a5e99] transition-colors"
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/teacher/signin" className="text-[#767BC4] hover:underline">
                Sign In!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  ) };
  