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
  const [checkedStudentIds, setCheckedStudentIds] = useState<string[]>([]);

  const handleStudentCheckboxChange = (
    studentId: string,
    isChecked: boolean
  ) => {
    setCheckedStudentIds(
      (prev) =>
        isChecked
          ? [...prev, studentId] // Add ID if checked
          : prev.filter((id) => id !== studentId) // Remove ID if unchecked
    );
  };

  const handleClassCheckboxChange = (
    classStudents: any[],
    isChecked: boolean
  ) => {
    const studentIds = classStudents.map((sc: any) => sc.student.id);
    setCheckedStudentIds(
      (prev) =>
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
      
      if (question.answers) {
        // Remove the answer by creating a new array without mutating the original
        question.answers = question.answers.filter((_, index) => index !== answerIndex);
        
        // Adjust correctAnswers
        question.correctAnswers = question.correctAnswers?.filter(
          (id) => id !== answerIndex
        ).map((id) => (id > answerIndex ? id - 1 : id));
      }
  
      // Update the question in the questions array
      updatedQuestions[questionIndex] = question;
  
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

  const validateForm = (): string | null => {
    if (!name.trim()) {
      return "Quiz name is required.";
    }

    if (questions.length === 0) {
      return "At least one question is required.";
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      if (!question.text?.trim()) {
        return `Question ${i + 1} is missing a text value.`;
      }

      if (!["RADIO", "CHECK", "INPUT"].includes(question.questionType)) {
        return `Question ${i + 1} has an invalid question type.`;
      }

      if (
        (question.questionType === "RADIO" ||
          question.questionType === "CHECK") &&
        (!question.answers || question.answers.length === 0)
      ) {
        return `Question ${i + 1} must have at least one answer option.`;
      }

      if (
        question.correctAnswers &&
        question.correctAnswers.some(
          (index) => !question.answers || !question.answers[index]
        )
      ) {
        return `Question ${i + 1} has invalid correct answers.`;
      }
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/teacher/quiz", {
        method: "POST",
        body: JSON.stringify({
          name,
          isPrivate,
          questions,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit quiz.");
      }

      alert("Quiz submitted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to submit quiz.");
    }
  };

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/teacher/class", {
        credentials: "include",
      });
      const { data } = await res.json();
      console.log(data);
      setClasses(data);
    };
    run();
  }, []);
  const questionTypes: QuestionType[] = ["CHECK", "RADIO", "INPUT"];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        {error != "" && <p className="text-red-600">{error}</p>}
        <h1 className="text-2xl font-bold text-center mb-6">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter Quiz Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-lg font-medium">Private Quiz:</span>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-6 h-6 border-gray-300 rounded focus:ring-2 focus:ring-[#767BC4]"
              checked={isPrivate}
              onChange={() => setIsPrivate((prev) => !prev)}
            />
            <span className="text-sm text-gray-700">Enable/Disable</span>
          </label>
        </div>

        <form className="space-y-4">
          {questions.map((question: Question, index: number) => (
            <fieldset
              key={"form" + index}
              className="p-4 border border-gray-300 rounded-lg"
            >
              <label htmlFor="text" className="block text-sm font-medium">
                Enter question text:
              </label>
              <input
                type="text"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                name="text"
                value={question?.text || ""}
                onChange={(e) =>
                  handleQuestionTextChange(e.target.value, index)
                }
              />

              <div className="mt-4 space-y-2">
                {(question.questionType === "RADIO" &&
                  question.answers?.map((answer: string, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <input
                        type="radio"
                        name={index + ""}
                        className="focus:ring-[#767BC4]"
                        onChange={() => handleRadioAnswer(index, i)}
                      />
                      <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg"
                        value={answer}
                        onChange={(e) =>
                          handleAnswerChange(e.target.value, index, i)
                        }
                      />
                      <button
                        type="button"
                        className="text-[#767BC4] hover:text-[#252641]"
                        onClick={() => deleteAnswer(index, i)}
                      >
                        Delete
                      </button>
                    </div>
                  ))) ||
                  (question.questionType === "CHECK" &&
                    question.answers?.map((answer: string, i: number) => (
                      <div key={i} className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          className="focus:ring-[#767BC4]"
                          onChange={() => handleCheckAnswer(index, i)}
                        />
                        <input
                          type="text"
                          className="p-2 border border-gray-300 rounded-lg"
                          value={answer}
                          onChange={(e) =>
                            handleAnswerChange(e.target.value, index, i)
                          }
                        />
                        <button
                          type="button"
                          className="text-[#767BC4] hover:text-[#252641]"
                          onClick={() => deleteAnswer(index, i)}
                        >
                          Delete
                        </button>
                      </div>
                    ))) ||
                  (question.questionType === "INPUT" && (
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={question.answers ? question.answers[0] : ""}
                      onChange={(e) =>
                        handleAnswerChange(e.target.value, index, 0)
                      }
                    />
                  ))}
              </div>

              {question.questionType !== "INPUT" && (
                <button
                  type="button"
                  className="mt-4 mr-2 px-4 py-2 bg-[#767BC4] text-white rounded-lg hover:bg-[#252641]"
                  onClick={() => addAnswer(index)}
                >
                  Add Answer
                </button>
              )}
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-[#BED7DC] text-[#252641] rounded-lg hover:bg-[#767BC4] hover:text-white"
                onClick={() => deleteQuestion(index)}
              >
                Delete Question
              </button>
            </fieldset>
          ))}
        </form>

        <div className="mt-6 relative">
          <button
            className="px-4 py-2 bg-[#BED7DC] text-[#252641] rounded-lg hover:bg-[#767BC4] hover:text-white"
            onClick={toggleDropdown}
          >
            Add Question
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {questionTypes.map((type) => (
                <button
                  key={type}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleButtonClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="mt-6 px-6 py-2 bg-[#252641] text-white rounded-lg hover:bg-[#767BC4]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {/* Logika za izbor odelenja */}
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
