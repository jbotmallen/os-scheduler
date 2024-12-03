import React from 'react'

type HeaderProps = {
    title: string;
    subHeader?: string;
}

const Header = ({ title, subHeader }: HeaderProps) => {
    return (
        <div className="w-full flex gap-5 mb-4 items-end justify-center">
            <h1 className="text-xl md:text-4xl font-bold">{title}</h1>
            <h2 className='hidden md:block text-gray-700 text-lg'>({subHeader})</h2>
        </div>
    )
}

export default Header