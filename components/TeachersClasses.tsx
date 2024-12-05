import React from 'react';
import Link from 'next/link';

export interface TeachersClassesType {
  id: string; // ID predmeta
  name: string; // Ime predmeta
  studentClass: Array<{
    student: {
      id: string; // ID studenta
      firstName: string; // Ime studenta
      lastName: string; // Prezime studenta
      email: string; // Email studenta
    };
  }>;
  teacherId: string; // ID profesora
  _count: {
    studentClass: number; // Broj studenata u klasi
  };
}

const TeachersClasses = ({ props }: { props: TeachersClassesType }) => {
  const { id, name, _count } = props;
  const { studentClass } = _count;
  const studentCount = studentClass > 0 ? studentClass : 'No students';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
      <h2 className="text-lg font-semibold text-[#4d4df7] mb-2 truncate">
        <Link href={`teacher/class/${id}`}>{name}</Link>
      </h2>
      <p className="text-gray-600 mb-1">
        {studentClass > 0 ? (
          <span className="font-medium">Number of Students: {studentCount}</span>
        ) : (
          <span className="font-medium text-red-500">No students</span>
        )}
      </p>
      <p className="text-gray-600 text-sm">Code: <span className="font-semibold text-gray-800">{id}</span></p>
    </div>
  );
};

export default TeachersClasses;
