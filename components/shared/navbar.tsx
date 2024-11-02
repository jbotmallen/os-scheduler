"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ArrowDown10Icon, ChevronDownCircleIcon, ChevronUpCircleIcon, ClockArrowUpIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <nav className={`${isOpen ? "top-3" : "-top-12"} z-10 max-w-xs md:max-w-lg w-full h-12 fixed left-1/2 -translate-x-1/2 mx-auto flex items-center bg-gray-100 rounded-md border border-black shadow-md shadow-gray-400 transition-all duration-300`}>
            <Button type='button' onClick={() => setIsOpen(!isOpen)} className='h-10 w-10 absolute -bottom-10 right-3 rounded-b-md rounded-t-none -z-10'>
                {isOpen ? <ChevronDownCircleIcon className='w-6 h-6' /> : <ChevronUpCircleIcon className='w-6 h-6' />}
            </Button>
            <ul className='w-full flex items-center justify-center p-3'>
                <li className='flex-[0.5] hover:flex-1 transition-all duration-300 group'>
                    <Link href='/' className={`text-black group-hover:font-semibold flex items-center justify-center gap-x-1.5 ${pathname === '/' && "underline"}`}>
                        <UsersIcon className='w-4 h-4 flex-shrink-0' />
                        FCFS
                    </Link>
                </li>
                <li className='flex-[0.5] hover:flex-1 transition-all duration-300 p-2 group'>
                    <Link href='/priority' className={`text-black group-hover:font-semibold flex items-center justify-center gap-x-1.5 ${pathname === '/priority' && "underline"}`}>
                        <ArrowDown10Icon className='w-4 h-4 flex-shrink-0' />
                        Priority
                    </Link>
                </li>
                <li className='flex-[0.5] hover:flex-1 transition-all duration-300 p-2 group'>
                    <Link href='/sjf' className={`text-black group-hover:font-semibold flex items-center justify-center gap-x-1.5 ${pathname === '/sjf' && "underline"}`}>
                        <ClockArrowUpIcon className='w-4 h-4 flex-shrink-0' />
                        SJF
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar