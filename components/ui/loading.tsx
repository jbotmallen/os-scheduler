import { LoaderIcon } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-2 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <LoaderIcon className='w-10 h-10 animate-spin' />
            <span>Loading...</span>
        </div>
    )
}

export default Loading