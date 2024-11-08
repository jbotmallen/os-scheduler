"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { ArrowDown10Icon, ChevronDownCircleIcon, ChevronUpCircleIcon, ClockArrowUpIcon, GlobeIcon, RefreshCcwDotIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger className='fixed bottom-5 right-10 bg-black p-2 rounded-full'>
                <GlobeIcon className='w-10 h-10 text-white' />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                        Choose the scheduling algorithm you want to simulate from the list below
                    </SheetDescription>
                </SheetHeader>
                <ul className='w-full flex flex-col items-start mt-3 gap-2'>
                    <li className='w-full transition-all duration-300 group p-2 bg-green-600 hover:bg-green-600/80 rounded-md hover:rounded-xl'>
                        <Link href='/' className={`text-white group-hover:font-semibold transition-all duration-300 flex items-center justify-center gap-x-1.5 ${pathname === '/' && "underline font-medium"}`}>
                            <UsersIcon className='w-4 h-4 flex-shrink-0' />
                            FCFS
                        </Link>
                    </li>
                    <li className='w-full transition-all duration-300 group p-2 bg-green-600 hover:bg-green-600/80 rounded-md hover:rounded-xl'>
                        <Link href='/priority' className={`text-white group-hover:font-semibold group-hover:text-white transition-all duration-300 flex items-center justify-center gap-x-1.5 ${pathname === '/priority' && "underline font-medium"}`}>
                            <ArrowDown10Icon className='w-4 h-4 flex-shrink-0' />
                            Priority
                        </Link>
                    </li>
                    <li className='w-full transition-all duration-300 group p-2 bg-green-600 hover:bg-green-600/80 rounded-md hover:rounded-xl'>
                        <Link href='/sjf' className={`text-white group-hover:font-semibold transition-all duration-300 flex items-center justify-center gap-x-1.5 ${pathname === '/sjf' && "underline font-medium"}`}>
                            <ClockArrowUpIcon className='w-4 h-4 flex-shrink-0' />
                            SJF
                        </Link>
                    </li>
                    <li className='w-full transition-all duration-300 group p-2 bg-green-600 hover:bg-green-600/80 rounded-md hover:rounded-xl'>
                        <Link href='/rr' className={`text-white group-hover:font-semibold transition-all duration-300 flex items-center justify-center gap-x-1.5 ${pathname === '/rr' && "underline font-medium"}`}>
                            <RefreshCcwDotIcon className='w-4 h-4 flex-shrink-0' />
                            Round Robin
                        </Link>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
    )
}

export default Navbar