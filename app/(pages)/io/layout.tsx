"use client";

import Loading from '@/components/ui/loading';
import { useIO } from '@/context/io'
import React, { PropsWithChildren } from 'react'

const IOLayout = ({ children }: PropsWithChildren) => {
    const { loading } = useIO();

    return (
        loading ? (
            <Loading />
        ) : (
            <div className='relative p-3 md:p-5'>
                {children}
            </div>
        )
    )
}

export default IOLayout