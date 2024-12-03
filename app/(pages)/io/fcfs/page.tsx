"use client";

import Header from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIO } from '@/context/io';
import React, { useState } from 'react';
import PathVisualizer from '@/components/shared/io/path-visualizer';
import SeekCalculation from '@/components/shared/io/seek-calculations';
import { toast } from 'sonner';

const IOFCFS = () => {
    const { operations, setOperations, headPosition, setHeadPosition } = useIO();
    const [path, setPath] = useState<number[]>([]);
    const [seekSteps, setSeekSteps] = useState<string>('');
    const [totalMovement, setTotalMovement] = useState<number>(0);

    const calculateSeekCount = () => {
        if (!headPosition || operations.length === 0) {
            toast.error('Please enter the head position and operations');
            return;
        };

        const fullPath = [headPosition, ...operations];
        setPath(fullPath);

        let movement = 0;
        const steps: string[] = [];
        for (let i = 1; i < fullPath.length; i++) {
            const diff = Math.abs(fullPath[i - 1] - fullPath[i]);
            movement += diff;
            steps.push(`(${Math.max(fullPath[i - 1], fullPath[i])} - ${Math.min(fullPath[i - 1], fullPath[i])})`);
        }
        setTotalMovement(movement);
        setSeekSteps(steps.join(' + '));
    };

    return (
        <div className="mt-10">
            <Header title="First Come First Serve" subHeader="I/O Management" />
            <section className="space-y-5">
                <div className="flex items-center gap-x-1.5">
                    <h1 className="font-medium text-xl">Enter the sequence of operations:</h1>
                    <p className="text-muted-foreground">(separated by spaces)</p>
                </div>
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="w-full flex flex-col gap-2 items-start justify-center">
                        <Label className="text-lg font-semibold">Operations</Label>
                        <Input
                            placeholder="176 79 34 60 92 11 41 114"
                            className="w-full max-w-xl"
                            value={operations.join(' ')}
                            onChange={(e) =>
                                setOperations(
                                    e.target.value
                                        .split(' ')
                                        .filter((val) => !isNaN(Number(val)))
                                        .map(Number)
                                )
                            }
                        />
                    </div>
                    <div className="w-fit flex flex-col gap-2 items-start">
                        <Label className="text-lg font-semibold w-fit text-nowrap">Head position</Label>
                        <Input
                            type="number"
                            placeholder="50"
                            className="w-36"
                            value={headPosition.toString()}
                            onChange={(e) => setHeadPosition(Number(e.target.value))}
                        />
                    </div>
                </div>
                <button
                    type='button'
                    className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={calculateSeekCount}
                >
                    Calculate
                </button>
                {path.length > 1 && (
                    <div className="mt-5">
                        <h2 className="font-medium text-lg">Head Movement Path:</h2>
                        <PathVisualizer path={path} />
                        <h2 className="font-medium text-lg mt-5">Seek Count Calculation:</h2>
                        <SeekCalculation steps={seekSteps} total={totalMovement} />
                    </div>
                )}
            </section>
        </div>
    );
};

export default IOFCFS;
