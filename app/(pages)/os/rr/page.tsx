"use client"

import ProcessTable from '@/components/shared/os/process-table';
import { Button } from '@/components/ui/button';
import { useProcessContext } from '@/context/process';
import { Process, ScheduledProcess } from '@/lib/types';
import { CalculatorIcon, PlusCircleIcon } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import PreemptiveCalculations from '@/components/shared/os/p-calculations';
import PreemptiveGanttChart from '@/components/shared/os/pre-gantt-chart';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const RoundRobin = () => {
    const { processes, addToProcesses } = useProcessContext();
    const [quantum, setQuantum] = useState<number>(3);
    const [schedule, setSchedule] = useState<ScheduledProcess[]>();

    const calculateRoundRobin = () => {
        const result: ScheduledProcess[] = [];
        let currentTime = 0;

        if (processes.length === 0) {
            toast.error("Please add some processes first");
            return;
        }

        // Deep copy of processes to avoid mutation
        const remainingProcesses: Process[] = JSON.parse(JSON.stringify(processes)).sort(
            (a: Process, b: Process) => a.arrivalTime - b.arrivalTime
        );

        // Ready queue for Round Robin scheduling
        const readyQueue: Process[] = [];

        while (remainingProcesses.length > 0 || readyQueue.length > 0) {
            // Move all processes that have arrived by currentTime into the ready queue
            while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
                readyQueue.push(remainingProcesses.shift() as Process);
            }

            if (readyQueue.length > 0) {
                // Dequeue the next process from the ready queue
                const currentProcess = readyQueue.shift() as Process;

                const start = Math.max(currentTime, currentProcess.arrivalTime);
                const cpuBurst = currentProcess.cpuBurst > quantum ? quantum : currentProcess.cpuBurst;
                const end = start + cpuBurst;

                result.push({ ...currentProcess, start, end });

                currentTime = end;
                currentProcess.cpuBurst -= cpuBurst;

                // Move newly arrived processes to the ready queue before re-enqueuing the current process
                while (remainingProcesses.length > 0 && remainingProcesses[0].arrivalTime <= currentTime) {
                    readyQueue.push(remainingProcesses.shift() as Process);
                }

                // If the current process still has burst time, re-enqueue it at the end of the ready queue
                if (currentProcess.cpuBurst > 0) {
                    readyQueue.push(currentProcess);
                }
            } else {
                // If no processes are ready, move the time to the next process arrival
                currentTime = remainingProcesses[0].arrivalTime;
            }
        }

        setSchedule(result);
    };

    return (
        <div className="mt-10">
            <div className="w-full flex justify-between mb-4 items-end">
                <h1 className="text-xl md:text-4xl font-bold">Round Robin</h1>
                <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="quantum" className='font-semibold'>
                        Quantum Time
                    </Label>
                    <Input
                        id="quantum"
                        type="number"
                        placeholder='3'
                        onChange={(e) => setQuantum(parseInt(e.target.value))}
                        className="w-24 bg-white"
                    />
                </div>
            </div>
            <ProcessTable algorithm="RoundRobin" />
            <div className="flex flex-col items-start">
                <div className="w-full flex items-center justify-between">
                    <Button className="text-md font-semibold h-12" variant="default" onClick={calculateRoundRobin}>
                        <CalculatorIcon className="w-6 h-6 flex-shrink-0" />
                        Calculate Round Robin
                    </Button>
                    <Button className="text-md font-semibold h-12 bg-green-700 hover:bg-green-700/80" variant="default" onClick={addToProcesses}>
                        <PlusCircleIcon className="w-6 h-6 flex-shrink-0" />
                        Add New
                    </Button>
                </div>
                {schedule && schedule.length > 0 ? (
                    <>
                        <PreemptiveGanttChart schedule={schedule} totalDuration={schedule[schedule.length - 1].end} algorithm='RR' />
                        <PreemptiveCalculations processes={schedule} algorithm="SJF" />
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

export default RoundRobin