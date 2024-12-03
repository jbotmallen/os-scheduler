import { BackgroundLines } from '@/components/ui/background-lines'
import { ArrowBigDownDashIcon, ArrowBigLeftDashIcon, ArrowBigRightDashIcon, ArrowBigUpIcon, ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Home = () => {
    return (
        <BackgroundLines className="min-h-dvh p-24 flex items-center justify-center w-full flex-col px-4">
            <Image
                src="/globe.svg"
                alt="OS Algorithms"
                width={150}
                height={150}
            />
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-widest">
                OS Algorithms
            </h2>
            <p className="max-w-sm md:max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center tracking-wide">
                A collection of Operating System algorithms implemented using React and TypeScript. Begin by selecting an algorithm from the navbar.
            </p>
            <ArrowBigRightDashIcon className="text-neutral-700 dark:text-neutral-400 w-20 h-20 mt-10 animate-wiggle-left absolute bottom-2 right-24" />
            <ArrowBigDownDashIcon className="text-neutral-700 dark:text-neutral-400 w-20 h-20 mt-10 animate-bounce absolute bottom-16 right-7" />
        </BackgroundLines>
    )
}

export default Home