import FullTeachersClasses from "@/components/FullTeacherClasses";
import { TeachersClassesType } from "@/components/TeachersClasses";

export default async function ClassPage() {
    try {
        const res = await fetch(`${process.env.APP_API_URL}/api/teacher/class`, {
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch classes');
        }

        const { data: classes }: { data: TeachersClassesType[] } = await res.json();

        console.log(classes);

        return (
            <div className="flex flex-wrap gap-4 p-6 mt-4">
                {classes.length > 0 ? (
                    classes.map((classItem) => (
                        <FullTeachersClasses
                            key={classItem.id} // Use classItem.id for better key uniqueness
                            props={classItem}
                        />
                    ))
                ) : (
                    <p>No Classes Found</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error fetching classes:", error);
        return (
            <div className="p-6 mt-4">
                <p className="text-red-500">An error occurred while loading classes. Please try again later.</p>
            </div>
        );
    }
}
