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
