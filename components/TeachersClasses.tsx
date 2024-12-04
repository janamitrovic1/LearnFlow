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

const TeachersClasses = ({props}:TeachersClassesType) => {
	const {id,name,_count}=props;
	const {studentClass}=_count;

  	return (
    	<div className="bg-white p-4 rounded text-wrap max-w-full w-80 shadow">
    		<h2 className="text-lg truncate font-semibold"><Link href={`teacher/class/${id}`}>{name}</Link></h2>
    		<p className="text-gray-600 truncate">{studentClass>0?`Number od Students: ${studentClass}`:`No students`}</p>
    		<p className="text-gray-600 truncate">Code:{id}</p>
    	</div>
  );
}

export default TeachersClasses;
