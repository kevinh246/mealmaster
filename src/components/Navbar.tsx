"use client"

import { LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export default function Navbar({ profileUrl } : { profileUrl: string }) {
  return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
            {/* <a className="btn btn-ghost hover:bg-transparent no-animation text-xl px-0 font-medium font-sans">
                Mealmaster
            </a> */}
        </div>
        <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src={profileUrl} />
                </div>
            </div>
                <ul
                    tabIndex={0}
                    className="menu-sm dropdown-content bg-base-100 rounded-lg z-[1] mt-1 w-52 p-1 border shadow-sm">
                    <li>
                        <Link href="/dashboard/user-profile" className="py-2 flex rounded-md hover:bg-blue-50">
                            <User2 size={18} className="me-2"/>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <SignOutButton>
                            <a className="py-2 flex rounded-md hover:text-red-600  hover:bg-blue-50">
                                <LogOut size={18} className="me-2"/>
                                Logout
                            </a>
                        </SignOutButton>
                    </li>
                </ul>
            </div>
        </div>
        </div>
  )
}
