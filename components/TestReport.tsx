'use client';

import { useEffect, useState } from "react";

const TestReport = ({ report, correct }: any) => {
  const [showCorrect, setShowCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<any>([]);

  useEffect(() => {
    const merged: any = [];
    const map = new Map();

    correct.forEach(({ question, response }: any) => {
      if (!map.has(question.text)) {
        map.set(question.text, { question: question.text, answers: [] });
      }
      map.get(question.text).answers.push(response?.text);
    });

    // Convert map to array
    map.forEach(value => merged.push(value));

    setCorrectAnswers(merged);
    
  }, [correct]);

  useEffect(() => console.log(correctAnswers), [correctAnswers]);
  useEffect(() => console.log(showCorrect), [showCorrect]);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 break-all md:truncate">Your Answers:</h3>

      {report?.map((rep: any, index: number) => (
        <div key={index} className="mb-6">
          <h4 className="text-xl font-semibold break-all md:truncate text-gray-700 mb-2">{rep?.text}</h4>

          {rep?.type === "INPUT" && (
            <div className="text-lg break-all md:truncate text-gray-600">
              {rep?.answer} - <span className={rep?.correct ? 'text-green-500' : 'text-red-500'}>{rep?.correct ? 'correct!' : 'incorrect!'}</span>
            </div>
          )}

          {rep?.type === "RADIO" && (
            <div className="text-lg break-all md:truncate text-gray-600">
              {rep?.answer} - <span className={rep?.correct ? 'text-green-500' : 'text-red-500'}>{rep?.correct ? 'correct!' : 'incorrect!'}</span>
            </div>
          )}

          {rep?.type === "CHECK" && (
            <div className="space-y-2 break-all md:truncate mt-2">
              {rep?.answers?.map((answer: any, index: number) => (
                <div key={index} className="text-lg text-gray-600">
                  {answer?.answer} - <span className={answer?.correct ? 'text-green-500' : 'text-red-500'}>{answer?.correct ? 'correct!' : 'incorrect!'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="mt-8">
        <h2 className="text-2xl font-bold break-all md:truncate text-gray-800 mb-4">Correct Answers:</h2>

        {showCorrect && (
          <div className="space-y-6">
            {correctAnswers?.map((cor: any, index: number) => (
              <div key={index} className="border-t pt-4">
                <h3 className="text-xl font-semibold break-all md:truncate text-gray-700">{cor?.question}</h3>
                <h4 className="text-lg font-medium break-all md:truncate text-gray-600">Correct Answers:</h4>
                <div className="space-y-2">
                  {cor?.answers?.map((ans: any, index: number) => (
                    <div key={index} className="text-lg text-gray-600">
                      <p>{ans}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowCorrect(prev => !prev)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            {showCorrect ? 'Hide' : 'Show'} Correct Answers
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestReport;
