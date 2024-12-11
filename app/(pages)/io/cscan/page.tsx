"use client";

import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIO } from "@/context/io";
import React, { useState } from "react";
import PathVisualizer from "@/components/shared/io/path-visualizer";
import SeekCalculation from "@/components/shared/io/seek-calculations";
import { Button } from "@/components/ui/button";
import {
  BirdIcon,
  CalculatorIcon,
  HardDriveIcon,
  ScanFaceIcon,
  TableIcon,
} from "lucide-react";

const CScan = () => {
  const {
    operations,
    setOperations,
    headPosition,
    setHeadPosition,
    diskEnd,
    setDiskEnd,
  } = useIO();
  const [path, setPath] = useState<number[]>([]);
  const [seekSteps, setSeekSteps] = useState<string>("");
  const [totalMovement, setTotalMovement] = useState<number>(0);

  const calculateCScan = () => {
    if (!headPosition || operations.length === 0 || !diskEnd) return;

    const sortedOps = [...operations].sort((a, b) => a - b);
    const diskStart = 0; // Start of the disk

    // Separate operations to the left and right of the head position
    const left = sortedOps.filter((op) => op < headPosition);
    const right = sortedOps.filter((op) => op >= headPosition);

    // C-SCAN path: move right, reach the disk end, jump to start, then continue
    const fullPath = [
      headPosition,
      ...right,
      diskEnd - 1, // Go to the end of the disk
      diskStart, // Jump to the start of the disk
      ...left, // Service remaining requests on the left
    ];
    setPath(fullPath);

    let movement = 0;
    const steps: string[] = [];
    for (let i = 1; i < fullPath.length; i++) {
      const diff = Math.abs(fullPath[i] - fullPath[i - 1]);
      movement += diff;

      steps.push(`(${fullPath[i]} - ${fullPath[i - 1]})`);
    }

    setTotalMovement(movement);
    setSeekSteps(steps.join(" + "));
  };

  return (
    <div className="mt-10 px-5">
      <Header title="C Scan Algorithm" icon={ScanFaceIcon} />
      <section className="space-y-6">
        <div className="flex items-center gap-x-1.5">
          <h1 className="font-medium text-xl mt-5">
            Enter the sequence of operations
          </h1>
        </div>
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="w-full flex flex-col gap-2 items-start justify-center">
            <div className="flex items-center gap-2">
              <Label className="text-lg font-semibold flex items-center gap-x-1.5">
                <TableIcon className="w-6 h-6 flex-shrink-0" />
                Operations
              </Label>
              <p className="text-muted-foreground">(separated by spaces)</p>
            </div>
            <Input
              placeholder="176 79 34 60 92 11 41 114"
              className="w-full max-w-xl bg-white"
              value={operations.join(" ")}
              onChange={(e) =>
                setOperations(
                  e.target.value
                    .split(" ")
                    .filter((val) => !isNaN(Number(val)))
                    .map(Number)
                )
              }
            />
          </div>
          <div className="w-full flex items-center justify-between gap-5">
            <div className="w-fit flex flex-col gap-2 items-start">
              <Label className="text-lg font-semibold w-fit text-nowrap flex items-center gap-x-1.5">
                <BirdIcon className="w-6 h-6 flex-shrink-0" />
                Head position
              </Label>
              <Input
                type="number"
                placeholder="50"
                className="w-full bg-white"
                value={headPosition.toString()}
                onChange={(e) => setHeadPosition(Number(e.target.value))}
              />
            </div>
            <div className="w-fit flex flex-col gap-2 items-start">
              <Label className="text-lg font-semibold w-fit text-nowrap flex items-center gap-x-1.5">
                <HardDriveIcon className="w-6 h-6 flex-shrink-0" />
                Disk End
              </Label>
              <Input
                type="number"
                placeholder="50"
                className="w-full bg-white"
                value={diskEnd.toString()}
                onChange={(e) => setDiskEnd(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <Button
          type="button"
          className="mt-5 text-xl py-7"
          variant="default"
          size="lg"
          onClick={calculateCScan}
        >
          <CalculatorIcon className="w-7 h-7 flex-shrink-0" />
          Calculate
        </Button>
        {path.length > 1 && (
          <div className="mt-5">
            <h2 className="font-medium text-lg">Head Movement Path:</h2>
            <PathVisualizer path={path} />
            <h2 className="font-bold text-lg mt-5">Seek Count Calculation:</h2>
            <SeekCalculation steps={seekSteps} total={totalMovement} />
          </div>
        )}
      </section>
    </div>
  );
};

export default CScan;
