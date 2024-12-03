"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

export default function StudentSignIn() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<Partial<FormData>>({});
  const router = useRouter()

  const validateInput = (name: keyof FormData, value: string) => {
    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email address.";
        break;
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters.";
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
      await signIn("SignInS", {
        redirect: false,
        ...formData
      })
      router.push("/student")
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      {["email", "password"].map(
        (field) => (
          <div key={field} style={{ marginBottom: 16 }}>
            <label
              htmlFor={field}
              style={{ display: "block", marginBottom: 4 }}
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
              style={{ width: "100%", padding: 8, color: 'black' }}
            />
            {error[field as keyof FormData] && (
              <p style={{ color: "red", fontSize: 12 }}>
                {error[field as keyof FormData]}
              </p>
            )}
          </div>
        )
      )}
      <button
        type="submit"
        style={{
          padding: 10,
          width: "100%",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: 4,
        }}
      >
        Sign In
      </button>
      <Link href="/student/signup">SignUp!</Link>
    </form>
  );
}
