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
  
const StudentClasses = ({ props}: StudentClassesType ) => {

	const{name,id,teacher} = props;
	const {firstName,lastName}=teacher;

  return (
    <div className="bg-white p-4 rounded text-wrap max-w-full w-80 shadow">
    	<h2 className="text-lg truncate font-semibold"><Link href={`student/class/${id}`}>{name}</Link></h2>
    	<p className="text-gray-600 truncate font-semibold">{teacher?`Teacher Name: ${firstName} ${lastName}`:`Teacher Name: unknown `}</p>
    </div>
  );
}

export default StudentClasses;