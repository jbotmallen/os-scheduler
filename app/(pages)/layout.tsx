import { IOProvider } from '@/context/io'
import { ProcessProvider } from '@/context/process'
import React, { PropsWithChildren } from 'react'

const PagesLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className='min-h-dvh max-w-5xl mx-auto p-3 md:p-5 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]'>
            <ProcessProvider>
                <IOProvider>
                    {children}
                </IOProvider>
            </ProcessProvider>
        </main>
    )
}

export default PagesLayout