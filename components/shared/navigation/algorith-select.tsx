"use client";

import { Check, ChevronsUpDown, ComputerIcon, KeyboardIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { algoCategories } from "@/lib/constants";

type AlgorithmSelectProps = {
    selected: string;
    setSelected: (selected: string) => void;
    loading?: boolean;
};

const AlgorithmSelect = ({ selected, setSelected, loading }: AlgorithmSelectProps) => {
    const [open, setOpen] = useState(false);

    const selectedFramework = algoCategories.find(
        (framework) => framework.value === selected
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="ml-0">
                <Button
                    disabled={loading}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    size="lg"
                    className="w-full justify-between border-2 border-gray-300 p-3 ml-0 text-black dark:text-white"
                >
                    {selectedFramework ? (
                        <div className="flex items-center gap-2 ml-0">
                            <selectedFramework.icon className="w-5 h-5" />
                            <span className="font-semibold">{selectedFramework.label}</span>
                        </div>
                    ) : (
                        "Select category..."
                    )}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] p-0">
                <Command className="w-full">
                    <CommandInput placeholder="Search category..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                            {algoCategories.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    className="group cursor-pointer transition-all duration-300 p-3"
                                    onSelect={(currentValue) => {
                                        setSelected(currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    <framework.icon className="w-5 h-5 flex-shrink-0" />
                                    <span className={`${framework.value === selected ? "font-bold opacity-100" : "opacity-80"} group-hover:font-semibold transition-all duration-300`}>
                                        {framework.label}
                                    </span>
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selected === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default AlgorithmSelect;