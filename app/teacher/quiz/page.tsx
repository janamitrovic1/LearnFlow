import Link from "next/link";
import { env } from "process"

export default async function AllQuizzes() {
  const res = await fetch(process.env.APP_API_URL + "/api/teacher/quiz", {
    credentials: 'include'
  });
  const { data } = await res.json();
  console.log(data);
  return (
    <div>
      {data.map((quiz: any, index: number) => (
        <Link href={"quiz/" + quiz?.id}><p>{quiz?.name} - {quiz?._count?.questions}</p></Link>
      ))}
    </div>
  )
}