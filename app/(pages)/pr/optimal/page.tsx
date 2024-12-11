"use client";

import { normalizeString, processFrames } from "@/components/shared/pr/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usePR } from "@/context/pr";
import { CableIcon, CalculatorIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Optimal: React.FC = () => {
  const {
    referenceString,
    setReferenceString,
    initialReferenceString,
    setInitialReferenceString,
    frameSize,
    setFrameSize,
    result,
    setResult,
    loading,
    setLoading,
  } = usePR();

  const handleCalculate = () => {
    setLoading(true);
    if (frameSize <= 0) {
      alert("Please enter a valid frame size greater than 0.");
      setLoading(false);
      return;
    }
    const normalizedString = normalizeString(referenceString);
    setReferenceString(normalizedString);

    const refs = normalizedString.split(" ").filter(Boolean);
    const { hits, faults, sequence } = processFrames(
      refs,
      frameSize,
      "Optimal"
    );

    setResult({ hits, faults, sequence });
    setInitialReferenceString(referenceString);
    setLoading(false);
  };

  useEffect(() => {
    handleCalculate();
  }, [frameSize]);

  return (
    <div className="my-10 px-5">
      <h1 className="text-2xl md:text-4xl font-bold my-8 flex items-center justify-center gap-x-1.5">
        <CableIcon className="w-8 h-8 flex-shrink-0" />
        Optimal Page Replacement
      </h1>
      <section className="flex flex-col gap-2 mb-4">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 w-3/4">
            <Label className="text-lg font-semibold">
              Enter reference string
            </Label>
            <Input
              placeholder="i.e. 7 0 1 2 0 3 0 4"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              className="w-full max-w-xl h-16 text-xl rounded-xl bg-white"
            />
          </div>
          <div className="flex flex-col gap-1 w-1/4">
            <Label className="text-lg font-semibold">Frame size</Label>
            <Input
              placeholder="i.e. 3"
              type="number"
              value={frameSize}
              onChange={(e) => setFrameSize(Number(e.target.value))}
              className="w-full max-w-xl h-16 text-xl rounded-xl bg-white"
            />
          </div>
        </div>
        <Button
          size="lg"
          className="mt-5 p-7 text-lg text-white rounded-lg"
          onClick={handleCalculate}
        >
          <CalculatorIcon className="w-7 h-7 flex-shrink-0" />
          Calculate
        </Button>
        {loading && <Loading />}
        {initialReferenceString.split(" ").filter(Boolean).length === 0 ? (
          <p className="text-2xl mt-5 text-center text-red-700 font-semibold">
            No string inputted
          </p>
        ) : (
          <>
            {result && !loading && (
              <section className="space-y-4 mt-5">
                <p className="text-2xl font-bold">Result</p>
                <Table className="border-2 border-black text-black text-2xl bg-white">
                  <TableBody>
                    <TableRow>
                      {initialReferenceString
                        .trim()
                        .replace(/\s+/g, " ")
                        .split(" ")
                        .map((ref, idx) => (
                          <TableCell
                            key={idx}
                            className="text-center h-20 w-16 border-2 border-black gap-2"
                          >
                            {ref}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </Table>

                <Table className="bg-white">
                  <TableBody>
                    {Array.from({ length: frameSize }, (_, frameIdx) => (
                      <TableRow key={frameIdx}>
                        {result.sequence.map((step, idx) => {
                          const isHit = !step.isFault;
                          const isCurrentReferenceMatch =
                            step.frameState[frameIdx] ===
                            initialReferenceString.split(" ")[idx];

                          return (
                            <TableCell
                              key={idx}
                              className={`text-center h-20 w-16 border-2 border-black text-2xl ${
                                isHit && isCurrentReferenceMatch
                                  ? "bg-green-300 text-black"
                                  : step.isFault &&
                                    step.frameState[frameIdx] ===
                                      initialReferenceString.split(" ")[idx]
                                  ? "bg-red-300 text-black"
                                  : ""
                              }`}
                            >
                              {step.frameState[frameIdx] || "-"}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Table>
                  <TableBody>
                    <TableRow>
                      {result.sequence.map((step, idx) => (
                        <TableCell
                          key={idx}
                          className={`text-center h-20 w-16 border-2 border-black text-xl font-bold ${
                            step.isFault
                              ? "bg-red-300 text-black"
                              : "bg-green-300 text-black"
                          }`}
                        >
                          {step.isFault ? "F" : "H"}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </section>
            )}

            {result && (
              <section className="text-2xl flex w-full justify-between mt-4">
                <p>
                  <span className="font-bold text-green-700">Hits:</span>
                  {result.hits}
                </p>
                <p>
                  <span className="font-bold text-red-700">Faults: </span>
                  {result.faults}
                </p>
                <p>
                  <span className="font-bold text-blue-700">Hit rate: </span>
                  {(
                    (result.hits /
                      initialReferenceString.split(" ").filter(Boolean)
                        .length) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </section>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Optimal;
