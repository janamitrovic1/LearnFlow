import React from 'react';

const TeachesQuizez = ({ quizTitle, className }: 
    {
        quizTitle?: string, className?: string;
    }
) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-2"> 
      <h3 className="text-lg font-semibold">{quizTitle}</h3>
      <p className="text-gray-600">{className}</p>
    </div>
  );
}

export default TeachesQuizez;
