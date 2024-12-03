"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    
    const {data:session,status}:any = useSession();
  
  return (
    <div>
        Hello Student {session?.user.id}
    </div>
  )
}

export default Page