import React from "react";
import TeachersClasses from "@/components/TeachersClasses";
import TeachersQuizez from "@/components/TeachersQuizes";

const ProfessorDashboard = () => {
  // Primer podataka o odeljenjima
  const classes = [
    { NameClass: 'Class 1', studentCount: 20 },
    { NameClass: 'Class 2', studentCount: 25 },
    { NameClass: 'Class 3', studentCount: 15 },
  ];

  // Primer podataka o kvizovima
  const quizzes = [
    { quizTitle: 'Quiz 1', className: 'Class 3' },
    { quizTitle: 'Quiz 2', className: 'Class 1' },
    { quizTitle: 'Quiz 3', className: 'Class 2' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      
      {/* Main Section */}
      <main className="mt-6 flex">
        {/* Class Sections */}
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-gray-800">Classes</h1>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {classes.map((classItem, index) => (
              <TeachersClasses 
                key={index} 
                NameClass={classItem.NameClass} 
                studentCount={classItem.studentCount} 
              />
            ))}
          </div>
          
          {/* Quiz Section */}
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Quiz</h2>
            <div className="mt-4">
              {quizzes.map((quizItem, index) => (
                <TeachersQuizez
                  key={index}
                  quizTitle={quizItem.quizTitle}
                  className={quizItem.className}
                />
              ))}
            </div>
          </section>
        </div>
        
       
      </main>
    </div>
  );
};

export default ProfessorDashboard;
