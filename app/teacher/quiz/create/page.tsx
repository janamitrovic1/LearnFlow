"use client";

import { Class, QuestionType } from "@prisma/client";
import { useEffect, useState } from "react";

export interface Question {
  text?: string;
  questionType: QuestionType;
  answers?: string[];
  correctAnswers?: number[];
}

export default function CreateQuiz() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<Class[] | null>([]);
  const [checkedStudentIds, setCheckedStudentIds] = useState<string[]>([])

  const handleStudentCheckboxChange = (studentId: string, isChecked: boolean) => {
    setCheckedStudentIds((prev) =>
        isChecked
            ? [...prev, studentId] // Add ID if checked
            : prev.filter((id) => id !== studentId) // Remove ID if unchecked
    );
  };

  const handleClassCheckboxChange = (classStudents: any[], isChecked: boolean) => {
    const studentIds = classStudents.map((sc: any) => sc.student.id);
    setCheckedStudentIds((prev) =>
        isChecked
            ? [...prev, ...studentIds.filter((id) => !prev.includes(id))] // Add only unchecked IDs
            : prev.filter((id) => !studentIds.includes(id)) // Remove class IDs
    );
  };

  const isClassFullyChecked = (classStudents: any[]) => {
      const studentIds = classStudents.map((sc: any) => sc.student.id);
      return studentIds.every((id) => checkedStudentIds.includes(id));
  };

  const handleButtonClick = (buttonType: QuestionType) => {
    if (buttonType === "INPUT")
      setQuestions([
        ...questions,
        { questionType: buttonType, answers: ["Answer"], correctAnswers: [0] },
      ]);
    else setQuestions([...questions, { questionType: buttonType }]);
    setIsDropdownOpen(false);
  };

  const addAnswer = (index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const question = { ...updatedQuestions[index] }; // Copy the question to update
      question.answers = question.answers ? [...question.answers, ""] : [""]; // Add the answer
      updatedQuestions[index] = question; // Update the question in the array
      return updatedQuestions;
    });
  };

  const deleteAnswer = (questionIndex: number, answerIndex: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const question = { ...updatedQuestions[questionIndex] }; // Copy the question

      // Remove the answer from the answers array
      question.answers?.splice(answerIndex, 1);

      // Check if the answer index is in the correctAnswer array
      if (question.correctAnswers?.includes(answerIndex)) {
        // If the answer index is in correctAnswer, remove it
        question.correctAnswers = question.correctAnswers.filter(
          (id) => id !== answerIndex
        );
      } else {
        // Otherwise, adjust the correctAnswer indices for the shifted answers
        question.correctAnswers = question.correctAnswers?.map((id) =>
          id > answerIndex ? id - 1 : id
        );
      }

      updatedQuestions[questionIndex] = question; // Update the question in the array
      return updatedQuestions;
    });
  };

  const handleQuestionTextChange = (value: string, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      text: value,
    };
    setQuestions(updatedQuestions);
  };
  
  const deleteQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const handleAnswerChange = (
    text: string,
    index: number,
    answerid: number
  ) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const question = { ...updatedQuestions[index] }; // Copy the question
      if (question.answers) {
        question.answers[answerid] = text; // Update the specific answer
      } else {
        question.answers = [text];
      }
      updatedQuestions[index] = question; // Update the question in the array
      return updatedQuestions;
    });
  };

  const handleRadioAnswer = (index: number, answerid: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const question = { ...updatedQuestions[index] }; // Copy the question
      if (question.correctAnswers) {
        question.correctAnswers[0] = answerid; // Update the specific answer
      } else {
        question.correctAnswers = [answerid];
      }
      updatedQuestions[index] = question; // Update the question in the array
      return updatedQuestions;
    });
  };

  const handleCheckAnswer = (index: number, answerid: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const question = { ...updatedQuestions[index] }; // Copy the question

      // Ensure `correctAnswer` exists and is an array
      question.correctAnswers = question.correctAnswers || [];

      if (question.correctAnswers.includes(answerid)) {
        // If the answer is already in the array, remove it (uncheck logic)
        question.correctAnswers = question.correctAnswers.filter(
          (id) => id !== answerid
        );
      } else {
        // Otherwise, add it to the array (check logic)
        question.correctAnswers = [...question.correctAnswers, answerid];
      }

      updatedQuestions[index] = question; // Update the question in the array
      return updatedQuestions;
    });
  };

  const toggleDropdown = () => {
    console.log(questions);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubmit = async () => {
    try {
      console.log(questions);
      const data = await fetch("http://localhost:3000/api/teacher/quiz", {
        method: "POST",
        body: JSON.stringify({
          name, isPrivate, questions, students: checkedStudentIds
        }),
        credentials: 'include'
      });
      console.log(await data.json(), process.env.APP_API_URL);
    } catch (error) {
      setError("Failed to make quiz!");
      console.log(process.env.APP_API_URL)
    }
  };

  useEffect(() => {
    const run = async() => {
      const res = await fetch("/api/teacher/class", {
        credentials: 'include'
      })
      const { data } = await res.json();
      console.log(data);
      setClasses(data);
    }
    run();
  }, [])

  return (
    <div>
      <h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </h1>
      <p>
        isPrivate{" "}
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate((prev) => !prev)}
        />
      </p>

      <form>
        {questions.map((question: Question, index: number) => (
          <fieldset key={"form" + index}>
            <label htmlFor="text">Enter question text:</label>
            <br />
            <input type="text" name="text" value={question?.text || ''} onChange={(e) => handleQuestionTextChange(e.target.value, index)} />
            <br />
            {(question.questionType === "RADIO" &&
              question.answers?.map((answer: string, i: number) => (
                <div key={i}>
                  <input
                    type="radio"
                    name={index + ""}
                    onChange={() => handleRadioAnswer(index, i)}
                  />
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(e.target.value, index, i)
                    }
                  />
                  <button type="button" onClick={() => deleteAnswer(index, i)}>
                    Delete Answer
                  </button>
                </div>
              ))) ||
              (question.questionType === "CHECK" &&
                question.answers?.map((answer: string, i: number) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckAnswer(index, i)}
                    />
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(e.target.value, index, i)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => deleteAnswer(index, i)}
                    >
                      Delete Answer
                    </button>
                  </div>
                ))) ||
              (question.questionType === "INPUT" && (
                <input
                  type="text"
                  value={question.answers ? question.answers[0] : ""}
                  onChange={(e) => handleAnswerChange(e.target.value, index, 0)}
                />
              ))}

            {question.questionType !== "INPUT" && (
              <button onClick={() => addAnswer(index)} type="button">
                Add Answer
              </button>
            )}

            <button
              type="button"
              onClick={() => deleteQuestion(index)}
              style={{ marginTop: "10px" }}
            >
              Delete Question
            </button>
          </fieldset>
        ))}
      </form>

      <div style={{ position: "relative", display: "inline-block" }}>
        <button onClick={toggleDropdown}>Select Question Type</button>

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
                color: "black",
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
                color: "black",
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
                color: "black",
              }}
            >
              Text Field
            </button>
          </div>
        )}
      </div>
      <br />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      {/* Logika za dodavanje ucenika! */}
      <div>
            {classes?.map((clasS: any, classIndex: number) => (
                <div key={classIndex} className="class-container">
                    <label>
                        <input
                            type="checkbox"
                            checked={isClassFullyChecked(clasS.studentClass)}
                            onChange={(e) =>
                                handleClassCheckboxChange(clasS.studentClass, e.target.checked)
                            }
                        />
                        <strong>{clasS?.name}</strong><span> - students: {clasS?._count?.studentClass}</span>
                    </label>
                    <div className="students-list">
                        {clasS.studentClass?.map((studentClass: any, studentIndex: number) => (
                            <div key={studentIndex} className="student-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={checkedStudentIds.includes(
                                            studentClass?.student?.id
                                        )}
                                        onChange={(e) =>
                                            handleStudentCheckboxChange(
                                                studentClass?.student?.id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    {studentClass?.student?.firstName}{" "}
                                    {studentClass?.student?.lastName}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className="checked-students">
                <h4>Checked Student IDs:</h4>
                <pre>{JSON.stringify(checkedStudentIds, null, 2)}</pre>
            </div>
        </div>
    </div>
  );
}
