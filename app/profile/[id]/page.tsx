import React from 'react'

const Page = async ({ params }: { params: { id: string } }) => {
    
    const id = (await params).id;
  
  return (
    <div>{id}</div>
  )
}

export default Page