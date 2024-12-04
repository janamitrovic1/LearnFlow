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

const FullTeachersClasses = ({props}:TeachersClassesType) => {
	const {id,name,_count}=props;
	const {studentClass}=_count;

  	return (
    	<div className="bg-white p-4 rounded text-wrap max-w-full w-96 h-48 shadow">
    		<h2 className="text-lg truncate font-semibold"><Link href={`/teacher/class/${id}`}>{name}</Link></h2>
    		<p className="text-gray-600 truncate">{studentClass>0?`Number od Students: ${studentClass}`:`No students`}</p>
    		<p className="text-gray-600 truncate">Code:{id}</p>
            {/* <div>
               {studentClass > 0 ? (
                studentClasses.map(({student }) => (
                    <p
                        key={student.id}
                        className="text-sm truncate font-medium text-gray-700"
                        title={`${student.firstName} ${student.lastName}`} // Tooltip prikazuje celo ime
                    >
                    {student.firstName} {student.lastName}
                    </p>
                ))
                ) : (
                <p className="text-sm text-gray-500">No students in this class</p>
                )}  */}
            {/* </div> */}
    	</div>
  );
}

export default FullTeachersClasses;
