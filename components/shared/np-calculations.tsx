import { ScheduledProcess } from "@/lib/types";
import React from "react";

interface NonPreemptiveCalculationsProps {
    processes: ScheduledProcess[];
    algorithm: string;
}

const NonPreemptiveCalculations: React.FC<NonPreemptiveCalculationsProps> = ({ processes, algorithm }) => {
    const waitingTimes = processes.map((process) => process.start - process.arrivalTime);
    const turnaroundTimes = processes.map((process) => process.end - process.arrivalTime);

    const averageWaitingTime =
        waitingTimes.reduce((sum, waitingTime) => sum + waitingTime, 0) / processes.length;

    const averageTurnAroundTime =
        turnaroundTimes.reduce((sum, turnaroundTime) => sum + turnaroundTime, 0) / processes.length;

    return (
        <div className="mt-8 w-full mx-auto mb-20">
            <h2 className="text-xl font-semibold">Formula ({algorithm} Scheduling)</h2>
            <div className="mt-4">
                {processes.map((process, index) => (
                    <div key={index} className="text-lg">
                        <div className="flex items-center gap-10">
                            <div>
                                <strong>W<sub>T{process.id}</sub></strong> = {process.start} - {process.arrivalTime} = {waitingTimes[index]} ms
                            </div>
                            <div>
                                <strong>TA<sub>T{process.id}</sub></strong> = {process.end} - {process.arrivalTime} = {turnaroundTimes[index]} ms
                            </div>
                        </div>
                        <div>
                            {algorithm === "Priority" && process.priority !== undefined && (
                                <span>Priority: {process.priority}</span>
                            )}
                            {algorithm === "SJF" && (
                                <span>Burst Time: {process.cpuBurst} ms</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-lg">
                <strong>The average waiting time is</strong>{" "}
                <span className="font-mono">
                    ({waitingTimes.join(" + ")}) / {processes.length} = {averageWaitingTime.toFixed(1)} ms
                </span>
                <br />
                <strong>The average turnaround time is</strong>{" "}
                <span className="font-mono">
                    ({turnaroundTimes.join(" + ")}) / {processes.length} = {averageTurnAroundTime.toFixed(1)} ms
                </span>
            </div>
        </div>
    );
};


export default NonPreemptiveCalculations;
