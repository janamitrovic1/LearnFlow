import React from 'react';
import Link from 'next/link';

export interface StudentQuizesType {
  quiz: {
    id: string; // ID kviza
    name: string; // Naziv kviza
    isPrivate: boolean; // Da li je kviz privatan
    teacherId: string; // ID profesora
    teacher: {
      firstName: string; // Ime profesora
      lastName: string; // Prezime profesora
    };
    _count: {
      questions: number; // Broj pitanja u kvizu
    };
  };
  quizId: string; // ID kviza (dupliciran na vrhu strukture)
  studentId: string; // ID studenta
}

const StudentQuizes = ({ props }: { props: StudentQuizesType }) => {
  const { quiz } = props;
  const { name, id, isPrivate, teacher, _count } = quiz;
  const { firstName, lastName } = teacher;
  const { questions } = _count;
  let privacyStatus = isPrivate ? 'Private' : 'Public';

  return (
    <Link href={`/student/quiz/${id}`}>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 cursor-pointer">
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <h3 className="text-lg font-semibold text-[#4d4df7] truncate">{name}</h3>
          <p className="text-sm font-medium text-gray-500">
            Status: <span className={`font-semibold ${isPrivate ? 'text-red-500' : 'text-green-500'}`}>{privacyStatus}</span>
          </p>
        </div>
        <div>
          <p className="text-gray-700 font-medium mb-1">
            Teacher: <span className="font-semibold">{firstName} {lastName}</span>
          </p>
          <p className="text-gray-600 text-sm">
            Number of Questions: <span className="font-semibold">{questions}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StudentQuizes;
