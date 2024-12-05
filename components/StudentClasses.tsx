import React from 'react';
import Link from 'next/link';

export interface StudentClassesType {
  id: string; // ID klase
  name: string; // Naziv klase
  teacher?: {
    id: string; // ID profesora
    firstName: string; // Ime profesora
    lastName: string; // Prezime profesora
  };
}

const StudentClasses = ({ props }: { props: StudentClassesType }) => {
  const { name, id, teacher } = props;
  const { firstName, lastName } = teacher || { firstName: '', lastName: '' };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-[#4d4df7] truncate mb-2">
        <Link href={`student/class/${id}`}>{name}</Link>
      </h2>
      <p className="text-gray-600 font-medium">
        {teacher ? `Teacher: ${firstName} ${lastName}` : 'Teacher: unknown'}
      </p>
    </div>
  );
};

export default StudentClasses;
