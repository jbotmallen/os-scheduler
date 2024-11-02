import Navbar from '@/components/shared/navbar'
import React, { PropsWithChildren } from 'react'

const PagesLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className='min-h-dvh max-w-5xl mx-auto p-3 md:p-5 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative'>
            <Navbar />
            {children}
        </main>
    )
}

export default PagesLayout