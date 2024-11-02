"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useProcessContext } from "@/lib/context";
import { Button } from "../ui/button";
import { BanIcon, PencilLineIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export default function ProcessTable({ algorithm = "FCFS" }: { algorithm?: string }) {
    const { processes, removeFromProcesses, updateProcess } = useProcessContext();
    const [editingId, setEditingId] = useState<string | null>(null);

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
                            {editingId === process.id ? (
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
                            ) : (
                                <span className="px-3">{process.arrivalTime}</span>
                            )}
                        </TableCell>
                        <TableCell>
                            {editingId === process.id ? (
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
                            ) : (
                                <span className="px-3">{process.cpuBurst}</span>
                            )}
                        </TableCell>
                        {algorithm === "Priority" && (
                            <TableCell>
                                {editingId === process.id ? (
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
                                ) : (
                                    <span className="px-3">{process.priority}</span>
                                )}
                            </TableCell>
                        )}
                        <TableCell className="flex items-center flex-wrap gap-1">
                            {editingId === process.id ? (
                                <Button
                                    onClick={() => setEditingId(null)}
                                    size="icon"
                                >
                                    <BanIcon className="flex-shrink-0" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setEditingId(process.id)}
                                    className="bg-blue-500 hover:bg-blue-500/80"
                                    size="icon"
                                >
                                    <PencilLineIcon className="flex-shrink-0" />
                                </Button>
                            )}
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