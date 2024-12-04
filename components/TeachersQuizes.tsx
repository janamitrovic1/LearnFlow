import React from 'react';
import Link from 'next/link';

export interface TeachersQuizesType {
  id: string; // Jedinstveni identifikator klase
  name: string; // Naziv klase
  isPrivate:boolean;
  _count: {
      questions: number; // Broj pitanja vezanih za klasu
  };

}

const TeachersQuizes = ({props}:TeachersQuizesType) => {
	const {id,name,_count,isPrivate}=props;
	const {questions} = _count;
	let privacyStatus;
    if (isPrivate)
        privacyStatus="Private"
    else
        privacyStatus="Public"

	return (
		<div className="bg-white p-4 flex flex-col justify-between rounded shadow mb-2">
        <div className='flex md:flex-row justify-between flex-col'>
            <h3 className="text-lg truncate font-semibold"><Link href={`/teacher/quiz/${id}`}>{name}</Link></h3>
            <p className="text-text truncate">Status: {privacyStatus}</p>
        </div>
        <div>
            {/* <p className="text-black-100 truncate font-semibold">Teacher: {firstName} {lastName}</p> */}
            <p className="text-black-300 truncate ">Number of Questions: {questions}</p>
        </div>
    </div>
	);
}

export default TeachersQuizes;
