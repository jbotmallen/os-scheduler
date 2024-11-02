import { ScheduledProcess } from "@/lib/types";
import React from "react";

interface CalculationsProps {
    processes: ScheduledProcess[];
    algorithm: string;
}

const Calculations: React.FC<CalculationsProps> = ({ processes, algorithm }) => {
    const waitingTimes = processes.map((process) => process.start - process.arrivalTime);

    const averageWaitingTime =
        waitingTimes.reduce((sum, waitingTime) => sum + waitingTime, 0) / processes.length;

    return (
        <div className="mt-8 w-full mx-auto mb-20">
            <h2 className="text-xl font-semibold">Formula ({algorithm} Scheduling)</h2>
            <div className="mt-4">
                {processes.map((process, index) => (
                    <div key={process.id} className="text-lg">
                        <div>
                            W<sub>T{process.id}</sub> = {process.start} - {process.arrivalTime} = {waitingTimes[index]} ms
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
            </div>
        </div>
    );
};


export default Calculations;
