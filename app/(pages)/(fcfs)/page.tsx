"use client";

import { useState } from "react";
import GanttChart from "@/components/shared/gantt-chart";
import { Button } from "@/components/ui/button";
import { ScheduledProcess } from "@/lib/types";
import { useProcessContext } from "@/lib/context";
import { toast } from "sonner";
import { CalculatorIcon, PlusCircleIcon } from "lucide-react";
import ProcessTable from "@/components/shared/process-table";
import Calculations from "@/components/shared/np-calculations";

export default function FCFS() {
  const { processes, addToProcesses } = useProcessContext();
  const [schedule, setSchedule] = useState<ScheduledProcess[]>([]);

  const calculateFCFS = () => {
    const result: ScheduledProcess[] = [];
    let currentTime = 0;

    if (processes.length === 0) {
      toast.error("Please add some processes first");
      return;
    }

    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    processes.forEach((process) => {
      const start = Math.max(currentTime, process.arrivalTime);
      const end = start + process.cpuBurst;
      result.push({ ...process, start, end });
      currentTime = end;
    });

    setSchedule(result);
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">First Come First Served Scheduling</h1>
      <ProcessTable />
      <div className="flex flex-col items-start">
        <div className="w-full flex items-center justify-between">
          <Button className="text-md font-semibold h-12" variant="default" onClick={calculateFCFS}>
            <CalculatorIcon className="w-6 h-6 flex-shrink-0" />
            Calculate FCFS
          </Button>
          <Button className="text-md font-semibold h-12 bg-green-700 hover:bg-green-700/80" variant="default" onClick={addToProcesses}>
            <PlusCircleIcon className="w-6 h-6 flex-shrink-0" />
            Add New
          </Button>
        </div>
        {schedule.length > 0 ? (
          <>
            <GanttChart schedule={schedule} />
            <Calculations processes={schedule} algorithm="FCFS"/>
          </>
        ) : (
          <div className="mt-8 text-lg font-semibold text-center">
            Click the <span className="text-black">Calculate FCFS</span> button to get the schedule
          </div>
        )}
      </div>
    </div>
  );
}
