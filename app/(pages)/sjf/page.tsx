"use client";

import { useState } from "react";
import GanttChart from "@/components/shared/gantt-chart";
import { Button } from "@/components/ui/button";
import { ScheduledProcess } from "@/lib/types";
import { useProcessContext } from "@/lib/context";
import { toast } from "sonner";
import { CalculatorIcon, PlusCircleIcon } from "lucide-react";
import ProcessTable from "@/components/shared/process-table";
import Calculations from "@/components/shared/calculations";

export default function SJF() {
    const { processes, addToProcesses } = useProcessContext();
    const [schedule, setSchedule] = useState<ScheduledProcess[]>([]);

    const calculateShortestJobFirst = () => {
        const result: ScheduledProcess[] = [];
        let currentTime = 0;

        if (processes.length === 0) {
            toast.error("Please add some processes first");
            return;
        }

        const remainingProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

        while (remainingProcesses.length > 0) {
            const availableProcesses = remainingProcesses.filter(process => process.arrivalTime <= currentTime);

            if (availableProcesses.length > 0) {
                availableProcesses.sort((a, b) => a.cpuBurst - b.cpuBurst);

                const nextProcess = availableProcesses[0];
                const start = Math.max(currentTime, nextProcess.arrivalTime);
                const end = start + nextProcess.cpuBurst;

                result.push({ ...nextProcess, start, end });

                currentTime = end;

                const index = remainingProcesses.indexOf(nextProcess);
                remainingProcesses.splice(index, 1);
            } else {
                currentTime = remainingProcesses[0].arrivalTime;
            }
        }

        setSchedule(result);
    };

    return (
        <div className="mt-20">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">Shortest Job First Scheduling</h1>
            <ProcessTable algorithm="SJF" />
            <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <Button className="text-md font-semibold h-12" variant="default" onClick={calculateShortestJobFirst}>
                        <CalculatorIcon className="w-6 h-6 flex-shrink-0" />
                        Calculate SJF
                    </Button>
                    <Button className="text-md font-semibold h-12 bg-green-700 hover:bg-green-700/80" variant="default" onClick={addToProcesses}>
                        <PlusCircleIcon className="w-6 h-6 flex-shrink-0" />
                        Add New
                    </Button>
                </div>
                {schedule.length > 0 ? (
                    <>
                        <GanttChart schedule={schedule} />
                        <Calculations processes={schedule} algorithm="SJF" />
                    </>
                ) : (
                    <div className="mt-8 text-lg font-semibold text-center">
                        Click the <span className="text-black">Calculate Priority</span> button to get the schedule
                    </div>
                )}
            </div>
        </div>
    );
}
