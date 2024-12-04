import Link from "next/link";

export default async function ClassPage() {
    const res = await fetch(process.env.APP_API_URL + "/api/teacher/class", {
        credentials: 'include'
    });
    const { data } = await res.json();

    console.log(data);

    return <div>
        {data?.map((clasS: any, index: number) => (
            <div>
                <Link href={"class/" + clasS?.id}><h2>{clasS?.name}</h2></Link>
                <p>{clasS?._count?.studentClass}</p>
            </div>
        ))}
    </div>
}