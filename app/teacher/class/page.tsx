import FullTeachersClasses from "@/components/FullTeacherClasses";
import {TeachersClassesType} from "@/components/TeachersClasses";


export default async function ClassPage() {

    const res = await fetch(process.env.APP_API_URL + "/api/teacher/class", {
        credentials: 'include'
    });
    const { data:classes } : { data: TeachersClassesType[] } = await res.json();

    console.log(classes);

    return (
        <div className="flex flex-wrap gap-4 p-6 mt-4">
            {classes.length>0?classes.map((classItem, index) => (
                <FullTeachersClasses 
                    key={index} 
                    props={classItem} 
                />
                )):<p className=''>No Classes Found</p>}
        </div>
    );
}