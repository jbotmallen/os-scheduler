"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useProcessContext } from "@/context/process";
import { Button } from "../../ui/button";
import { BanIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../../ui/input";

export default function ProcessTable({ algorithm = "FCFS" }: { algorithm?: string }) {
    const { processes, removeFromProcesses, updateProcess } = useProcessContext();

    return (
        <Table className="mb-5">
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead>Task ID</TableHead>
                    <TableHead>Arrival Time</TableHead>
                    <TableHead>CPU Burst</TableHead>
                    {algorithm === "Priority" && <TableHead>Priority</TableHead>}
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white shadow-md">
                {processes.length > 0 ? processes.map((process) => (
                    <TableRow key={process.id} className="h-16">
                        <TableCell className="px-3">{process.id}</TableCell>
                        <TableCell>

                            <Input
                                type="number"
                                placeholder="1"
                                min={0}
                                defaultValue={process.arrivalTime}
                                onChange={(e) => {
                                    const updatedArrivalTime = parseInt(e.target.value);
                                    if (isNaN(updatedArrivalTime)) return;
                                    updateProcess(process.id, { ...process, arrivalTime: updatedArrivalTime });
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            <Input
                                type="number"
                                placeholder="1"
                                min={1}
                                defaultValue={process.cpuBurst}
                                onChange={(e) => {
                                    const updatedCpuBurst = parseInt(e.target.value);
                                    if (isNaN(updatedCpuBurst)) return;
                                    updateProcess(process.id, { ...process, cpuBurst: updatedCpuBurst });
                                }}
                            />
                        </TableCell>
                        {algorithm === "Priority" && (
                            <TableCell>
                                <Input
                                    type="number"
                                    placeholder="1"
                                    min={1}
                                    defaultValue={process.priority}
                                    onChange={(e) => {
                                        const updatedPriority = parseInt(e.target.value);
                                        if (isNaN(updatedPriority)) return;
                                        updateProcess(process.id, { ...process, priority: updatedPriority });
                                    }}
                                />

                            </TableCell>
                        )}
                        <TableCell className="flex items-center flex-wrap gap-1">
                            <Button onClick={() => removeFromProcesses(process.id)} className="bg-red-500 hover:bg-red-500/80" size='icon'>
                                <TrashIcon className="flex-shrink-0" />
                            </Button>
                        </TableCell>
                    </TableRow>
                )) : (
                    <TableRow className="bg-white">
                        <TableCell colSpan={4} className="text-center text-xl font-medium p-10">
                            No processes added
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}