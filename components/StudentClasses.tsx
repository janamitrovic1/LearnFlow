import React from 'react';

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

	const{name,teacher} = props;
	const {firstName,lastName}=teacher;

  return (
    <div className="bg-white p-4 rounded text-wrap max-w-full w-80 shadow">
    	<h2 className="text-lg truncate font-semibold">{name}</h2>
    	<p className="text-gray-600 truncate font-semibold">{teacher?`Professor: ${firstName} ${lastName}`:`Professor name: unknown `}</p>
    </div>
  );
}

export default StudentClasses;