"use client";

import Loading from '@/components/ui/loading';
import { useProcessContext } from '@/context/process';
import React, { PropsWithChildren } from 'react'

const OSLayout = ({ children }: PropsWithChildren) => {
    const { loading } = useProcessContext();
    return (
        loading ? (
            <Loading />
        ) : (
            <div className='relative w-full h-full p-3 md:p-5'>
                {children}
            </div>
        )
    )
}

export default OSLayout