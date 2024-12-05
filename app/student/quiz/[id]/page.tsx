"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckQuiz, getCorrectAnswers } from "./_action/actions";
import TestReport from "@/components/TestReport";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [correct, setCorrect] = useState<any>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await CheckQuiz(formData);
    const correctAnswers = await getCorrectAnswers(formData);

    setCorrect(correctAnswers);
    setReport(result);
  };

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/student/quiz/" + id, {
        credentials: "include",
      });
      const { data } = await res.json();
      setQuiz({ ...data?.quiz, id: data?.quizId });
    };
    run();
  }, [id]);

  if (!quiz)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-500">Loading...</h2>
      </div>
    );

  if (report)
    return <TestReport report={report} correct={correct} />;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <input type="hidden" name="_id" value={quiz?.id || ""} />
      <h2 className="text-3xl font-bold break-all md:truncate text-center text-blue-600 mb-6">
        Quiz: {quiz?.name || "Untitled"}
      </h2>

      {quiz?.questions?.map((question: any, index: number) => (
        <div key={index} className="mb-6">
          <div className="text-lg font-semibold break-all md:truncate text-gray-800">
            Question: {question?.text}
          </div>

          {question?.questionType === "RADIO" && (
            <div className="space-y-3 mt-3">
              {question?.responses?.map((response: any, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="hidden"
                    name={question?.id + "-" + response?.id}
                    value={response?.text}
                  />
                  <input
                    type="radio"
                    name={question?.id}
                    value={response?.id}
                    className="w-5 h-5 text-blue-600"
                  />
                  <label className="text-gray-700 break-all md:truncate">{response?.text}</label>
                </div>
              ))}
            </div>
          )}

          {question?.questionType === "CHECK" && (
            <div className="space-y-3 mt-3">
              {question?.responses?.map((response: any, index: number) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="hidden"
                    name={question?.id + "-" + response?.id}
                    value={response?.text}
                  />
                  <input
                    type="checkbox"
                    name={question?.id}
                    value={response?.id}
                    className="w-5 h-5 text-blue-600"
                  />
                  <label className="text-gray-700 break-all md:truncate" >{response?.text}</label>
                </div>
              ))}
            </div>
          )}

          {question?.questionType === "INPUT" && (
            <div className="mt-3">
              <input
                type="text"
                name={question?.id}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
