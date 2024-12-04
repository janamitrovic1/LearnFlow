import React from 'react';

const TeachesClasses = ({ NameClass, studentCount }: 
    {
        NameClass?:string, studentCount?: number;
        

    }
) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{NameClass}</h2>
      <p className="text-gray-600">Broj studenata: {studentCount}</p>
    </div>
  );
}

export default TeachesClasses;
