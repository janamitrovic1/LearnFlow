'use client';

import { QuestionType } from "@prisma/client";
import { Input } from "postcss";
import { useState } from "react";

interface Question {
    text?: string;
    type: QuestionType;
    answers?: string[];
    correctAnswer?: number[];
}

export default function CreateQuiz() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleButtonClick = (buttonType: QuestionType) => {
        if(buttonType == "INPUT")
            setQuestions([...questions, { type: buttonType, answers: [""] }])
        setQuestions([...questions, { type: buttonType }])
        setIsDropdownOpen(false);
    };

    const addAnswer = (index: number, text: string) => {
        console.log(text)
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const question = { ...updatedQuestions[index] }; // Copy the question to update
            question.answers = question.answers ? [...question.answers, text] : [text]; // Add the answer
            updatedQuestions[index] = question; // Update the question in the array
            return updatedQuestions;
        });
    }

    const handleAnswerChange = (text: string, index: number, answeid: number) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const question = { ...updatedQuestions[index] }; // Copy the question
            if (question.answers) {
                question.answers[answeid] = text; // Update the specific answer
            }
            updatedQuestions[index] = question; // Update the question in the array
            return updatedQuestions;
        });
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <h1>Create Quiz</h1>

            <div>
                {questions.map((question: Question, index: number) => 
                    <form key={"form" + index}>
                        <label htmlFor="text">Enter question text:</label><br />
                        <input type="text" name="text" className="text-black" /><br />
                        {   question.type == 'RADIO' && 
                            question.answers?.map((answer: string, i: number) => (
                                <div key={i}><input type="radio"  className="text-black" /><input type="text" className="text-black" value={answer} onChange={(e) => handleAnswerChange(e.target.value, index, i)}/></div>
                            )) ||
                            question.type == "CHECK" && 
                            question.answers?.map((answer: string, i: number) => (
                                <div key={i}><input type="checkbox"  className="text-black" /><input type="text" className="text-black" value={answer} onChange={(e) => handleAnswerChange(e.target.value, index, i)}/></div>
                            )) ||
                            question.type == "INPUT" &&
                            (<input type="text" value={question.answers ? question.answers[0] : ""} onChange={(e) => handleAnswerChange(e.target.value, index, 0)} />)
                        }
                        
                        {question.type == "INPUT" || <button onClick={() => addAnswer(index, "hello")} type="button">Add Answer</button>}
                    </form>
                )}
            </div>

            <div style={{ position: "relative", display: "inline-block" }}>
                <button onClick={toggleDropdown}>
                    Select Question Type
                </button>

                {isDropdownOpen && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                        }}
                    >
                        <button
                            onClick={() => handleButtonClick("CHECK")}
                            style={{
                                display: "block",
                                padding: "8px 16px",
                                border: "none",
                                backgroundColor: "white",
                                width: "100%",
                                textAlign: "left",
                                cursor: "pointer",
                                color: 'black'
                            }}
                        >
                            CheckBox Buttons
                        </button>
                        <button
                            onClick={() => handleButtonClick("RADIO")}
                            style={{
                                display: "block",
                                padding: "8px 16px",
                                border: "none",
                                backgroundColor: "white",
                                width: "100%",
                                textAlign: "left",
                                cursor: "pointer",
                                color: 'black'
                            }}
                        >
                            Radio Buttons
                        </button>
                        <button
                            onClick={() => handleButtonClick("INPUT")}
                            style={{
                                display: "block",
                                padding: "8px 16px",
                                border: "none",
                                backgroundColor: "white",
                                width: "100%",
                                textAlign: "left",
                                cursor: "pointer",
                                color: 'black'
                            }}
                        >
                            Text Field
                        </button>
                    </div>
                )}
            </div>
            <br />
            <button type="button" onClick={() => console.log(questions)}> Console.log </button>
        </div>
    );
}
