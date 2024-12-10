import { Fragment } from "react";
import { ScheduledProcess } from "@/lib/types";
import { getPercentage, getRandomDarkColor } from "@/lib/utils";

interface GanttChartProps {
    algorithm: string;
    schedule: ScheduledProcess[];
    totalDuration: number;
}

const PreemptiveGanttChart: React.FC<GanttChartProps> = ({ algorithm, schedule, totalDuration }) => {
    console.log(schedule);
    return (
        <div className="mt-8 w-full mx-auto">
            <h2 className="text-xl font-semibold -mb-5">Gantt Chart (Preemptive Scheduling)</h2>
            <div className="relative flex items-center gap-0">
                {schedule[0].start > 0 && (
                    <div
                        className="border-black border-2 border-dashed mt-10 text-gray-500 flex items-center justify-center font-bold p-3 rounded-md shadow-md shadow-gray-400"
                        style={{
                            width: `${getPercentage(schedule[0].start, totalDuration)}%`,
                            backgroundColor: 'lightgray',
                        }}
                    >
                        Idle
                        <span className="absolute text-sm -left-1.5 -bottom-6 text-black">00</span>
                    </div>
                )}
                {schedule.map((slice, index) => (
                    <Fragment key={index}>
                        {index > 0 && slice.start > schedule[index - 1].end && (
                            <div
                                className="border-black border-2 border-dashed mt-10 text-gray-500 flex items-center justify-center font-bold p-3 rounded-md shadow-md shadow-gray-400"
                                style={{
                                    width: `${getPercentage(slice.start - schedule[index - 1].end, totalDuration)}%`,
                                    backgroundColor: 'lightgray',
                                }}
                            >
                                Idle
                                <span className="absolute text-sm -left-1.5 -bottom-6 text-black">{schedule[index - 1].end}</span>
                            </div>
                        )}
                        <div
                            className="border-black border-2 border-dashed mt-10 relative text-white flex items-center justify-center font-bold p-3 rounded-md shadow-md shadow-gray-400"
                            style={{
                                width: `${getPercentage(slice.end - slice.start, totalDuration)}%`,
                                backgroundColor: `${getRandomDarkColor()}`,
                            }}
                        >
                            {slice.id}
                            <span className="absolute text-sm -left-1.5 -bottom-6 text-black">
                                {slice.start.toString().padStart(2, "0")}
                            </span>
                            {index + 1 < schedule.length && schedule[index + 1].start - slice.end > 1 && (
                                <span className="absolute text-sm -right-1 -bottom-6 text-black">
                                    {slice.end}
                                </span>
                            )}
                            {algorithm === "Priority" && slice.priority !== undefined && (
                                <span className="absolute text-xs top-1 right-1 text-gray-300">
                                    P{slice.priority}
                                </span>
                            )}
                            {index + 1 === schedule.length && (
                                <span className="absolute text-sm -right-1 -bottom-6 text-black">
                                    {slice.end.toString().padStart(2, "0")}
                                </span>
                            )}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default PreemptiveGanttChart;
