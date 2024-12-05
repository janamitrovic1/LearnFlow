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
    <Link href={`student/class/${id}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        <h2 className="text-lg font-semibold text-[#4d4df7] break-all md:break-auto mb-2">{name}</h2>
        <p className="text-gray-600 break-all md:break-auto font-medium">
          {teacher ? `Teacher: ${firstName} ${lastName}` : 'Teacher: unknown'}
        </p>
      </div>
    </Link>
  );
};

export default StudentClasses;
