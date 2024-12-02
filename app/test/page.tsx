"use client";
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
    const session = useSession();
    console.log(session);
  return (
    <div>Hello world</div>
  )
}

export default page