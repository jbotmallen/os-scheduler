"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { Process } from "./types";
import { toast } from "sonner";

interface ProcessContextType {
    processes: Process[];
    setProcesses: (processes: Process[]) => void;
    addToProcesses: () => void;
    removeFromProcesses: (id: string) => void;
    updateProcess: (id: string, updatedProcess: Process) => void;
}

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export const ProcessProvider = ({ children }: { children: ReactNode }) => {
    const [processes, setProcesses] = useState<Process[]>([]);

    useEffect(() => {
        const storedProcesses = localStorage.getItem("processes");
        if (storedProcesses) {
            setProcesses(JSON.parse(storedProcesses));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("processes", JSON.stringify(processes));
    }, [processes]);

    const addToProcesses = () => {
        const process: Process = {
            id: String.fromCharCode(processes[processes.length - 1]?.id.charCodeAt(0) + 1 || 65),
            arrivalTime: processes.length > 0 ? (processes[processes.length - 1].arrivalTime + 1) : 0,
            cpuBurst: 1,
            priority: 1,
        };
        setProcesses((prevProcesses) => [...prevProcesses, process]);
    };

    const removeFromProcesses = (id: string) => {
        setProcesses((prevProcesses) => prevProcesses.filter((process) => process.id !== id));
    };

    const updateProcess = (id: string, updatedProcess: Process) => {
        if(updatedProcess.arrivalTime < 0 || updatedProcess.cpuBurst < 1) {
            toast.error("Arrival Time and CPU Burst must be greater than 0");
            return;
        }
        setProcesses((prevProcesses) =>
            prevProcesses.map((process) => (process.id === id ? updatedProcess : process))
        );
    };

    return (
        <ProcessContext.Provider value={{ processes, setProcesses, addToProcesses, removeFromProcesses, updateProcess }}>
            {children}
        </ProcessContext.Provider>
    );
};

export const useProcessContext = () => {
    const context = useContext(ProcessContext);
    if (!context) {
        throw new Error("useProcessContext must be used within a ProcessProvider");
    }
    return context;
};
