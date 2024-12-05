"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Nav = () => {
  const { data: session, status }: any = useSession();

  return (
    <>
      {/* Navigacija */}
      <nav className="bg-white py-4 fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
                     <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </Link>


          {/* Navigacioni linkovi */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-lg text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="#us"
              className="text-lg text-gray-700 hover:text-blue-600 transition"
            >
              About Us
            </Link>

            {/* Dropdown za autentifikovane korisnike */}
            {status === "authenticated" ? (
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
                  <Link
                    href={`/${
                      session?.user?.role === "student" ? "student" : "teacher"
                    }`}
                  >
                    <span className="truncate">{session?.user?.email}</span>
                  </Link>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-400"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
                  <MenuItem>
                    <Link
                      href={`/${
                        session?.user?.role === "student" ? "student" : "teacher"
                      }`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/api/auth/signout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <>
                {/* Dropdown za Sign In */}
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition">
                    Sign In
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
                    <MenuItem>
                      <Link
                        href="/student/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        Student
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="/teacher/signin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                      >
                        Teacher
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>

                {/* Dropdown za Sign Up */}
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition">
                    Sign Up
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
                    <MenuItem>
                      <Link
                        href="/student/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        Student
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        href="/teacher/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                      >
                        Teacher
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Glavni sadržaj sa paddingom */}
      <main className="pt-20">
        {/* Ovde dolazi sadržaj stranice */}
      </main>
    </>
  );
};

export default Nav;
