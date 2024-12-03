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
            <div className='relative w-full h-full'>
                {children}
            </div>
        )
    )
}

export default OSLayout