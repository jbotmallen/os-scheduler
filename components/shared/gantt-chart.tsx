import React from "react";
import { ScheduledProcess } from "@/lib/types";
import { getPercentage, getRandomDarkColor } from "@/lib/utils";

interface GanttChartProps {
    schedule: ScheduledProcess[];
}

const GanttChart: React.FC<GanttChartProps> = ({ schedule }) => {
    const totalDuration = schedule.reduce((sum, process) => sum + process.cpuBurst, 0);

    let currentTime = 0;

    const adjustedSchedule = schedule.map((process) => {
        const start = Math.max(currentTime, process.start);
        const end = start + process.cpuBurst;
        currentTime = end;
        return { ...process, start, end };
    });

    return (
        <div className="mt-8 w-full mx-auto">
            <h2 className="text-xl font-semibold -mb-5">Gantt Chart</h2>
            <div className="relative flex items-center gap-0">
                {adjustedSchedule.map((process, index) => (
                    <React.Fragment key={process.id}>
                        {index > 0 && (
                            <div
                                className="border-black border-2 border-dashed mt-10"
                                style={{
                                    width: `${getPercentage(process.start - adjustedSchedule[index - 1].end, totalDuration)}%`,
                                    backgroundColor: 'transparent',
                                }}
                            />
                        )}
                        <div
                            className="border-black border-2 border-dashed mt-10 relative text-white flex items-center justify-center font-bold p-3 rounded-md shadow-md shadow-gray-400"
                            style={{
                                width: `${getPercentage(process.cpuBurst, totalDuration)}%`,
                                backgroundColor: `${getRandomDarkColor()}`,
                            }}
                        >
                            {process.id}
                            <span className="absolute text-sm -left-1.5 -bottom-6 text-black">
                                {process.start.toString().padStart(2, "0")}
                            </span>
                            {index > 0 && index + 1 < schedule.length && adjustedSchedule[index+1].arrivalTime - process.end > 1 && (
                                <span className="absolute text-sm -right-1 -bottom-6 text-black">
                                    {process.end.toString().padStart(2, "0")}
                                </span>
                            )}
                            {index === adjustedSchedule.length - 1 && (
                                <span className="absolute text-sm -right-1 -bottom-6 text-black">{process.end.toString().padStart(2, "0")}</span>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default GanttChart;
