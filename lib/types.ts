import { LucideIcon } from "lucide-react";

export interface Process {
    id: string;
    arrivalTime: number;
    cpuBurst: number;
    priority: number;
}

export interface ScheduledProcess extends Process {
    start: number;
    end: number;
}

export interface InputOutputDisk {
    sequence: number[];
    head: number;
}

export interface LinkGroups {
    name: string;
    link: string;
    icon: LucideIcon;
}
