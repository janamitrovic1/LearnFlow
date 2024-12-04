'use client'

import { useEffect, useState } from "react"

const TestReport = ({ report, correct }: any) => {
  const [showCorrect, setShowCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<any>([])

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
    
  }, [correct])

  useEffect(() => console.log(correctAnswers), [correctAnswers]);
  useEffect(() => console.log(showCorrect), [showCorrect])

  return (
    <div>
      <h3>Your Answers:</h3>
      { report?.map((rep: any, index: number) => (
        <div key={index}>
          <h4>{rep?.text}</h4>
          {rep?.type == "INPUT" &&
            <div>
              {rep?.answer} - {rep?.correct && 'correct!' || 'incorrect!'}
            </div> || rep?.type == "RADIO" &&
            <div>
              {rep?.answer} - {rep?.correct && 'correct!' || 'incorrect!'}
            </div> || rep?.type == "CHECK" &&
            <div>
              {rep?.answers?.map((answer: any, index: number) => (
                <div key={index}>
                  {answer?.answer} - {answer?.correct && 'correct!' || 'incorrect!'}
                </div>
              ))}
            </div>
          }
        </div>
      ))}
      <h2>Corrects:</h2>
      {showCorrect  &&
        (<div>
          {correctAnswers?.map((cor: any, index: number) => (
            <div key={index}>
              <h2>Question: {cor?.question}</h2>
              <h3>Correct Answers: </h3>
              {cor?.answers?.map((ans: any, index: number) => (
                <div key={index}>
                  <p>{ans}</p>
                </div>
              ))}
            </div>
          ))}
        </div>)
      }
      <button type="button" onClick={() => setShowCorrect(prev => (!prev))}>Show</button>
    </div>
  )
}

export default TestReport