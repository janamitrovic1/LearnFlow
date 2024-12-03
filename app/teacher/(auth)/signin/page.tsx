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

export default function StudentSignIn() {
  const [formData, setFormData] = useState<FormData>({
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
  });
  const [error, setError] = useState<Partial<FormData>>({});
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
	  await signIn("SignInT", {
		redirect: false,
		...formData
	  })
	  router.push("/teacher")
	}
  };
return(
<div className="max-w-md mx-auto mt-8 p-6 border rounded-md shadow-lg">
  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
	<h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
	{["email", "password"].map((field) => (
	  <div key={field} className="mb-4">
		<label
		  htmlFor={field}
		  className="block text-sm font-medium text-gray-700"
		>
		  {field
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase())}
		</label>
		<input
		  type={field.includes("password") ? "password" : "text"}
		  id={field}
		  name={field}
		  value={formData[field as keyof FormData]}
		  onChange={handleInputChange}
		  className="w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-50 text-gray-800 rounded-md focus:ring-blue-500 focus:border-blue-500"
		/>
		{error[field as keyof FormData] && (
		  <p className="text-red-500 text-sm mt-1">
			{error[field as keyof FormData]}
		  </p>
		)}
	  </div>
	))}
	<button
	  type="submit"
	  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
	>
	  Sign In
	</button>
	<p className="mt-4 text-center">
	  Don&apos;t have an account?{" "}
	  <Link href="/teacher/signup" className="text-blue-600 hover:underline">
		Sign Up!
	  </Link>
	</p>
  </form>
</div>
);
}
