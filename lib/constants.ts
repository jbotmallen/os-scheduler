
import { CrumpledPaperIcon } from "@radix-ui/react-icons";
import { AlarmClockIcon, ArrowDown10Icon, BinocularsIcon, CableIcon, ClockArrowUpIcon, ComputerIcon, KeyboardIcon, RefreshCcwDotIcon, ScanFaceIcon, UsersIcon } from "lucide-react";
import { LinkGroups } from "./types";

export const algoCategories = [
    {
        icon: ComputerIcon,
        value: "OS",
        label: "OS Schedulers",
    },
    {
        icon: CrumpledPaperIcon,
        value: "PR",
        label: "Page Replacement",
    },
    {
        icon: KeyboardIcon,
        value: "IO",
        label: "I/O Disk",
    },
]

export const OSAlgorithms: LinkGroups[] = [
    {
        name: 'FCFS',
        icon: UsersIcon,
        link: '/os/fcfs',
    },
    {
        name: 'Priority',
        icon: ArrowDown10Icon,
        link: '/os/priority',
    },
    {
        name: 'SJF',
        icon: ClockArrowUpIcon,
        link: '/os/sjf',
    },
    {
        name: 'Round Robin',
        icon: RefreshCcwDotIcon,
        link: '/os/rr',
    },
]

export const PageReplacementAlgorithms: LinkGroups[] = [
    {
        name: 'FIFO',
        icon: UsersIcon,
        link: '/pr/fifo',
    },
    {
        name: 'LRU',
        icon: AlarmClockIcon,
        link: '/pr/lru',
    },
    {
        name: 'Optimal',
        icon: CableIcon,
        link: '/pr/optimal',
    },
    {
        name: 'LFU',
        icon: CableIcon,
        link: '/pr/lfu',
    }
]

export const IOAlgorithms: LinkGroups[] = [
    {
        name: 'FCFS',
        icon: UsersIcon,
        link: '/io/fcfs',
    },
    {
        name: 'C-SCAN',
        icon: ScanFaceIcon,
        link: '/io/cscan',
    },
    {
        name: 'C-LOOK',
        icon: BinocularsIcon,
        link: '/io/clook',
    },
]