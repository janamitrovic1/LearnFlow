"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
const Nav = () => {
    
    const {data:session,status}:any = useSession();
    return (
        <div className='navbar'>
            <div>
                <Link href="/" className='logo'>
                    Logo
                </Link>
            </div>
            <div className='nav-link'>
                <Link href="/">
                    <span>Home</span>
                </Link>
                <Link href="#us">
                    <span>About Us</span>
                </Link>
                {status === "authenticated" ? (
                    <>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton>
                                <div className="dropdown">
                                    <Link href={`/${session?.user?.role=="student"&&"student"||"teacher"}`}>
                                        <span className='truncate'>{session?.user?.email}</span>  
                                    </Link>
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                                    
                                </div>
                            </MenuButton>
                            
                            <MenuItems
                                transition  
                                className="dropdown-menuitems"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <Link href={`/${session?.user?.role=="student"&&"student"||"teacher"}`} className="dropdown-menuitem">
                                            Profile
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href="/api/auth/signout" className="dropdown-menuitem" >
                                            Logout
                                        </Link>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton>
                                <div className="dropdown btn-white">
                                    <div>
                                        <span>Sign In</span>  
                                    </div>
                                </div>
                            </MenuButton>
                            
                            <MenuItems
                                transition  
                                className="dropdown-menuitems"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <Link href="/student/signin" className="dropdown-menuitem">
                                            Student
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href="/teacher/signin" className="dropdown-menuitem" >
                                            Teacher
                                        </Link>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>

                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton>
                                <div className="dropdown btn-purple">
                                    <div>
                                        <span>Sign Up</span>  
                                    </div>
                                </div>
                            </MenuButton>
                            
                            <MenuItems
                                transition  
                                className="dropdown-menuitems"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <Link href="/student/signup" className="dropdown-menuitem">
                                            Student
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href="/teacher/signup" className="dropdown-menuitem" >
                                            Teacher
                                        </Link>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                            
                        </Menu>
                    </>
                )}
                </div>
        </div>
  )
}

export default Nav