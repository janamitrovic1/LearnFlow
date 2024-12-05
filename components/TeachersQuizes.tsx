import React from 'react';
import Link from 'next/link';

export interface TeachersQuizesType {
  id: string; // Jedinstveni identifikator kviza
  name: string; // Naziv kviza
  isPrivate: boolean; // Da li je kviz privatan
  _count: {
    questions: number; // Broj pitanja vezanih za kviz
  };
}

const TeachersQuizes = ({ props }: { props: TeachersQuizesType }) => {
  const { id, name, _count, isPrivate } = props;
  const { questions } = _count;
  const privacyStatus = isPrivate ? "Private" : "Public";

  return (
    <div className="bg-white p-4 flex flex-col justify-between rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
      <div className="flex md:flex-row justify-between flex-col mb-2">
        <h3 className="text-lg font-semibold text-[#4d4df7] truncate">
          <Link href={`/teacher/quiz/${id}`}>{name}</Link>
        </h3>
        <p className={`text-sm ${isPrivate ? 'text-red-500' : 'text-green-500'} font-medium`}>
          Status: {privacyStatus}
        </p>
      </div>
      <div>
        <p className="text-gray-700 text-sm truncate">
          Number of Questions: <span className="font-semibold">{questions}</span>
        </p>
      </div>
    </div>
  );
};

export default TeachersQuizes;
