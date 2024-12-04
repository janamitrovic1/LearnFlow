"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckQuiz } from "./_action/actions";
import TestReport from "@/components/TestReport";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [report, setReport] = useState<any>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await CheckQuiz(formData);

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
    return <h2>Loading...</h2>;

  if(report) 
    return <TestReport report={report}/>; 

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_id" value={quiz?.id || ""} />
      <h2>Quiz: {quiz?.name || "Untitled"}</h2>
      {quiz?.questions?.map((question: any, index: number) => (
        <div key={index}>
          {"Question: " + question?.text}
          {question?.questionType === "RADIO" && (
            <div>
              {question?.responses?.map((response: any, index: number) => (
                <div key={index}>
                  <input type="hidden" 
                    name={question?.id + "-text"}
                    value={response?.text}/>
                  <input
                    type="radio"
                    name={question?.id}
                    value={response?.id}
                  />
                  <label>{response?.text}</label>
                </div>
              ))}
            </div>
          )}
          {question?.questionType === "CHECK" && (
            <div>
              {question?.responses?.map((response: any, index: number) => (
                <div key={index}>
                  <input type="hidden" 
                    name={question?.id + "-" + response?.id}
                    value={response?.text}/>
                  <input
                    type="checkbox"
                    name={question?.id}
                    value={response?.id}
                  />
                  <label>{response?.text}</label>
                </div>
              ))}
            </div>
          )}
          {question?.questionType === "INPUT" && (
            <div>
              <input
                type="text"
                name={question?.id}
              />
            </div>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
