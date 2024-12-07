"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "@/components/ui/loading";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const LFU: React.FC = () => {
  const [referenceString, setReferenceString] = useState<string>("");
  const [initialReferenceString, setInitialReferenceString] =
    useState<string>("");
  const [frameSize, setFrameSize] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    hits: number;
    faults: number;
    sequence: {
      frameState: (string | null)[];
      frequencies: Record<string, number>;
      isFault: boolean;
    }[];
  } | null>(null);
  const handleCalculate = () => {
    setLoading(true);

    if (frameSize <= 0) {
      alert("Please enter a valid frame size greater than 0.");
      setLoading(false);
      return;
    }

    const normalizedString = referenceString.trim().replace(/\s+/g, " ");
    setReferenceString(normalizedString);

    const refs = normalizedString.split(" ").filter(Boolean);
    const frames: (string | null)[] = Array.from(
      { length: frameSize },
      () => null
    );
    const frequencies: Record<string, number> = {};
    const usageOrder: string[] = []; // Tracks the order of usage for tie-breaking
    let hits = 0;
    let faults = 0;

    const sequence: {
      frameState: (string | null)[];
      frequencies: Record<string, number>;
      isFault: boolean;
    }[] = [];

    refs.forEach((page) => {
      if (frames.includes(page)) {
        hits++;
        frequencies[page]++;
        const index = usageOrder.indexOf(page);
        if (index !== -1) usageOrder.splice(index, 1);
        usageOrder.push(page);
      } else {
        faults++;
        if (frames.includes(null)) {
          const indexToReplace = frames.indexOf(null);
          frames[indexToReplace] = page;
        } else {
          let lfuPage = "";
          let minFreq = Infinity;

          frames.forEach((frame) => {
            if (frame && frequencies[frame] < minFreq) {
              lfuPage = frame;
              minFreq = frequencies[frame];
            } else if (
              frame &&
              frequencies[frame] === minFreq &&
              usageOrder.indexOf(frame) < usageOrder.indexOf(lfuPage)
            ) {
              lfuPage = frame;
            }
          });

          const indexToReplace = frames.indexOf(lfuPage);
          frames[indexToReplace] = page;
          const index = usageOrder.indexOf(lfuPage);
          if (index !== -1) usageOrder.splice(index, 1);
        }

        // Reset frequency for the replaced page
        frequencies[page] = 1;
        usageOrder.push(page); // Add new page to usage order
      }

      // Push the current state to the sequence
      sequence.push({
        frameState: [...frames],
        frequencies: { ...frequencies },
        isFault: !frames.includes(page), // Calculate fault correctly
      });
    });

    setResult({ hits, faults, sequence });
    setInitialReferenceString(referenceString);
    setLoading(false);
  };

  useEffect(() => {
    handleCalculate();
  }, [frameSize]);

  return (
    <div className="my-10">
      <h1 className="text-2xl md:text-4xl font-bold my-8">
        Least Frequently Used
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
        <button
          className="mt-5 px-4 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
          onClick={handleCalculate}
        >
          Calculate
        </button>
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
                <Table className="border-2 border-black text-black text-2xl">
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

                <Table>
                  <TableBody>
                    {Array.from({ length: frameSize }, (_, frameIdx) => (
                      <TableRow key={frameIdx}>
                        {result.sequence.map((step, idx) => (
                          <TableCell
                            key={idx}
                            className={`text-center h-20 w-16 border-2 border-black text-2xl ${
                              step.isFault
                                ? "bg-red-300 text-black"
                                : "bg-green-300 text-black"
                            }`}
                          >
                            {step.frameState[frameIdx] || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                    {/* Add Hit/Fault Row */}
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
                          {step.isFault ? "Fault" : "Hit"}
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
                  <span className="font-bold text-green-700">Hits:</span>{" "}
                  {result.hits}
                </p>
                <p>
                  <span className="font-bold text-red-700">Faults: </span>{" "}
                  {result.faults}
                </p>
                <p>
                  <span className="font-bold text-blue-700">Hit rate: </span>{" "}
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

export default LFU;
