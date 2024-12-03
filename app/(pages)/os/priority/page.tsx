"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import GanttChart from "@/components/shared/os/gantt-chart";
import { Button } from "@/components/ui/button";
import { ScheduledProcess } from "@/lib/types";
import { useProcessContext } from "@/context/process";
import { toast } from "sonner";
import { CalculatorIcon, PlusCircleIcon } from "lucide-react";
import ProcessTable from "@/components/shared/os/process-table";
import NonPreem from "@/components/shared/os/np-calculations";
import PreemptiveGanttChart from "@/components/shared/os/pre-gantt-chart";
import PreemptiveCalculations from "@/components/shared/os/p-calculations";

export default function Priority() {
    const { processes, addToProcesses } = useProcessContext();
    const [schedule, setSchedule] = useState<ScheduledProcess[]>([]);
    const [isPreemptive, setIsPreemptive] = useState<boolean>(false);

    const calculatePriority = () => {
        const result: ScheduledProcess[] = [];
        let currentTime = 0;

        if (processes.length === 0) {
            toast.error("Please add some processes first");
            return;
        }

        const remainingProcesses = [...processes].map((process) => ({ ...process, remainingTime: process.cpuBurst }));
        remainingProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);

        if (isPreemptive) {
            while (remainingProcesses.some((process) => process.remainingTime > 0)) {
                const availableProcesses = remainingProcesses
                    .filter((process) => process.arrivalTime <= currentTime && process.remainingTime > 0)
                    .sort((a, b) => a.priority - b.priority);

                if (availableProcesses.length > 0) {
                    const nextProcess = availableProcesses[0];

                    const start = currentTime;
                    const end = start + 1;

                    if(result.length > 0 && result[result.length - 1].id === nextProcess.id) {
                        result[result.length - 1].end = end;
                    } else {
                        result.push({ ...nextProcess, start, end });
                    }

                    nextProcess.remainingTime -= 1;

                    currentTime = end;
                } else {
                    currentTime = remainingProcesses.find((p) => p.remainingTime > 0)?.arrivalTime || currentTime;
                }
            }
        } else {
            while (remainingProcesses.some((process) => process.remainingTime > 0)) {
                const availableProcesses = remainingProcesses
                    .filter((process) => process.arrivalTime <= currentTime && process.remainingTime > 0)
                    .sort((a, b) => a.priority - b.priority);

                if (availableProcesses.length > 0) {
                    const nextProcess = availableProcesses[0];

                    const start = currentTime;
                    const end = start + nextProcess.remainingTime;

                    result.push({ ...nextProcess, start, end });
                    currentTime = end;

                    nextProcess.remainingTime = 0;
                } else {
                    currentTime = remainingProcesses.find((p) => p.remainingTime > 0)?.arrivalTime || currentTime;
                }
            }
        }

        setSchedule(result);
    };

    return (
        <div className="mt-10">
            <div className="w-full flex justify-between mb-4 items-end">
                <h1 className="text-xl md:text-4xl font-bold w-full">Priority Scheduling</h1>
                <div className="flex items-center space-x-2">
                    <Switch id="preemptive" onClick={() => setIsPreemptive(!isPreemptive)} />
                    <Label htmlFor="preemptive" className="flex items-center gap-x-1.5">
                        Preemptive
                        <span className="hidden md:block">Mode</span>
                    </Label>
                </div>
            </div>
            <ProcessTable algorithm="Priority" />
            <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <Button className="text-md font-semibold h-12" variant="default" onClick={calculatePriority}>
                        <CalculatorIcon className="w-6 h-6 flex-shrink-0" />
                        Calculate Priority
                    </Button>
                    <Button className="text-md font-semibold h-12 bg-green-700 hover:bg-green-700/80" variant="default" onClick={addToProcesses}>
                        <PlusCircleIcon className="w-6 h-6 flex-shrink-0" />
                        Add New
                    </Button>
                </div>
                {schedule.length > 0 ? isPreemptive ? (
                    (
                        <>
                            <PreemptiveGanttChart schedule={schedule} totalDuration={schedule[schedule.length - 1].end} algorithm='Priority' />
                            <PreemptiveCalculations processes={schedule} algorithm="Priority" />
                        </>
                    )
                ) : (
                    (
                        <>
                            <GanttChart schedule={schedule} />
                            <NonPreem processes={schedule} algorithm="Priority" />
                        </>
                    )
                ) : (
                    <div className="mt-8 text-lg font-semibold text-center">
                        Click the <span className="text-black">Calculate Priority</span> button to get the schedule
                    </div>
                )}
            </div>
        </div >
    );
}
