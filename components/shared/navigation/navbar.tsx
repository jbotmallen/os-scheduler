"use client";

import React, { useEffect, useState } from 'react'
import { ArrowDown10Icon, ClockArrowUpIcon, GlobeIcon, RefreshCcwDotIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import AlgorithmSelect from './algorith-select';
import { IOAlgorithms, OSAlgorithms, PageReplacementAlgorithms } from '@/lib/constants';
import { LinkGroups } from '@/lib/types';
import { useSelected } from '@/context/selected';

const Navbar = () => {
    const { selected, setSelected, loading } = useSelected();
    const pathname = usePathname();
    const [algorithms, setAlgorithms] = useState<LinkGroups[]>([]);

    useEffect(() => {
        switch (selected) {
            case "OS":
                setAlgorithms(OSAlgorithms);
                break;
            case "PR":
                setAlgorithms(PageReplacementAlgorithms);
                break;
            case "IO":
                setAlgorithms(IOAlgorithms);
                break;
            default:
                break;
        }
    }, [selected]);

    return (
        <Sheet>
            <SheetTrigger disabled={loading} className='fixed bottom-5 right-10 bg-black dark:bg-gray-400 p-2 rounded-full z-50 disabled:opacity-50 disabled:animate-pulse'>
                <GlobeIcon className='w-10 h-10 text-white dark:text-black' />
            </SheetTrigger>
            <SheetContent className='flex flex-col justify-between'>
                <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                        Choose the scheduling algorithm you want to simulate from the list below
                    </SheetDescription>
                    {algorithms.length > 0 ? (
                        <ul className='w-full flex flex-col items-start mt-3 gap-2'>
                            {algorithms.map((algorithm) => (
                                <li key={algorithm.name} className='w-full transition-all duration-300 group p-2 bg-green-600 hover:bg-green-600/80 rounded-md hover:rounded-xl'>
                                    <Link href={algorithm.link} className={`text-white group-hover:font-semibold transition-all duration-300 flex items-center justify-center gap-x-1.5 ${pathname === '/' && "underline font-medium"}`}>
                                        <algorithm.icon className='w-4 h-4 flex-shrink-0' />
                                        {algorithm.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='w-full inline-flex flex-col items-center justify-center p-5 gap-2'>
                            <RefreshCcwDotIcon className='w-10 h-10 text-gray-400' />
                            <span className='text-gray-700 text-center'>No algorithms found!</span>
                            <span className='text-gray-400 text-center text-sm'> Choose a category.</span>
                        </div>
                    )}
                </SheetHeader>
                <SheetFooter className='flex-col md:flex-col items-start gap-2'>
                    <h1 className='font-semibold'>Select an algorithm category</h1>
                    <AlgorithmSelect selected={selected} setSelected={setSelected} loading={loading} />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Navbar