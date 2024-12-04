import React from 'react'

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
  
const StudentQuizes = ({props}: StudentQuizesType) => {
    const {quiz}=props;
    const {name,isPrivate,teacher,_count}=quiz;
    const {firstName,lastName}=teacher;
    const {questions}=_count;
    let privacyStatus;
    if (isPrivate)
        privacyStatus="Private"
    else
        privacyStatus="Public"
  
  return (
    <div className="bg-white p-4 flex flex-col justify-between rounded shadow mb-2">
        <div className='flex md:flex-row justify-between flex-col'>
            <h3 className="text-lg truncate font-semibold">{name}</h3>
            {/* <p className="text-text truncate">Status: {privacyStatus}</p> */}
        </div>
        <div>
            <p className="text-black-100 truncate font-semibold">Professor: {firstName} {lastName}</p>
            <p className="text-black-300 truncate ">Number of Questions: {questions}</p>
        </div>
    </div>
  );
}

export default StudentQuizes;