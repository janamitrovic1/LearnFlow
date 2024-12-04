"use client"
import React from 'react'
import {X} from 'lucide-react'
import Link from 'next/link'

const SearchFormReset = ({props}:{props?:boolean}) => {
    
    const reset = ()=>{
        const form = document.querySelector(".search_form") as HTMLFormElement;
        if(form) form.reset()
    }
    if(props){
        return (
            <button onClick={reset}>
                <Link href="/products/" className='search-btn text-white-100' >
                    <X className='size-5' />
                </Link>
            </button>
            );
    }
    else{
        return (
            <button onClick={reset}>
                <Link href="/" className='search-btn text-white-100' >
                    <X className='size-5' />
                </Link>
            </button>
            );
    }
  
}

export default SearchFormReset