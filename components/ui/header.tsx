import React from "react";
import { LucideIcon } from "lucide-react";

type HeaderProps = {
    title: string;
    subHeader?: string;
    icon?: LucideIcon;
};

const Header = ({ title, subHeader, icon }: HeaderProps) => {
    return (
        <div className="w-full flex gap-5 mb-4 items-center justify-center">
            {icon && React.createElement(icon, { className: "w-8 h-8 flex-shrink-0" })}
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            {subHeader && (
                <h2 className="hidden md:block text-gray-700 text-lg">
                    ({subHeader})
                </h2>
            )}
        </div>
    );
};

export default Header;
