import { IOProvider } from '@/context/io'
import { ProcessProvider } from '@/context/process'
import React, { PropsWithChildren } from 'react'

const PagesLayout = ({ children }: PropsWithChildren) => {
    return (
        <main className='min-h-dvh max-w-5xl mx-auto'>
            <ProcessProvider>
                <IOProvider>
                    {children}
                </IOProvider>
            </ProcessProvider>
        </main>
    )
}

export default PagesLayout