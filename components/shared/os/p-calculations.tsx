import { ScheduledProcess } from "@/lib/types";
import React from "react";

interface PreemptiveCalculationsProps {
    processes: ScheduledProcess[];
    algorithm: string;
}

const PreemptiveCalculations: React.FC<PreemptiveCalculationsProps> = ({ processes, algorithm }) => {
    const groupedProcesses = processes.reduce<{ [id: string]: ScheduledProcess[] }>((acc, process) => {
        if (!acc[process.id]) acc[process.id] = [];
        acc[process.id].push(process);
        return acc;
    }, {});

    const waitingTimes = Object.values(groupedProcesses).map((segments) => {
        segments.sort((a, b) => a.start - b.start);  // Sort by start time

        const arrivalTime = segments[0].arrivalTime;
        let waitingTime = 0;
        let lastEnd = arrivalTime;

        segments.forEach(segment => {
            waitingTime += segment.start - lastEnd;  // Time between segments
            lastEnd = segment.end;
        });
        return waitingTime;
    });

    const turnaroundTimes = Object.values(groupedProcesses).map((segments) => {
        const arrivalTime = segments[0].arrivalTime;
        const completionTime = Math.max(...segments.map(segment => segment.end));
        return completionTime - arrivalTime;
    });

    const averageWaitingTime = waitingTimes.reduce((sum, time) => sum + time, 0) / processes.length;
    const averageTurnaroundTime = turnaroundTimes.reduce((sum, time) => sum + time, 0) / processes.length;
    const uniqueProcesses = [...new Set(processes.map(p => p.id))];

    return (
        <div className="mt-8 w-full mx-auto mb-20">
            <h2 className="text-xl font-semibold">Formula ({algorithm} Scheduling)</h2>
            <div className="mt-4">
                {Object.entries(groupedProcesses).map(([id, segments], index) => (
                    <div key={id} className="text-lg">
                        <div className="flex items-center gap-10">
                            <div>
                                <strong>W<sub>T{id}</sub></strong> = Total Waiting Time = {waitingTimes[index]} ms
                            </div>
                            <div>
                                <strong>TA<sub>T{id}</sub></strong> = Turnaround Time = {turnaroundTimes[index]} ms
                            </div>
                        </div>
                        <div>
                            {algorithm === "Priority" && segments[0].priority !== undefined && (
                                <span>Priority: {segments[0].priority}</span>
                            )}
                            {algorithm === "SJF" && (
                                <span>Total Burst Time: {segments.reduce((sum, s) => sum + s.cpuBurst, 0)} ms</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-lg">
                <strong>The average waiting time is</strong>{" "}
                <span className="font-mono">
                    ({waitingTimes.join(" + ")}) / {uniqueProcesses.length} = {averageWaitingTime.toFixed(1)} ms
                </span>
                <br />
                <strong>The average turnaround time is</strong>{" "}
                <span className="font-mono">
                    ({turnaroundTimes.join(" + ")}) / {uniqueProcesses.length} = {averageTurnaroundTime.toFixed(1)} ms
                </span>
            </div>
        </div>
    );
};


export default PreemptiveCalculations;
