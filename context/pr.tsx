"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type ResultType = {
  hits: number;
  faults: number;
  sequence: {
    frameState: (string | null)[];
    isFault: boolean;
  }[];
};

interface PRContextType {
  referenceString: string;
  setReferenceString: (value: string) => void;
  initialReferenceString: string;
  setInitialReferenceString: (value: string) => void;
  frameSize: number;
  setFrameSize: (value: number) => void;
  result: ResultType | null;
  setResult: (results: ResultType) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const PRContext = createContext<PRContextType | undefined>(undefined);

export const PRProvider = ({ children }: { children: ReactNode }) => {
  const [referenceString, setReferenceString] = useState<string>("");
  const [initialReferenceString, setInitialReferenceString] =
    useState<string>("");
  const [frameSize, setFrameSize] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<{
    hits: number;
    faults: number;
    sequence: { frameState: (string | null)[]; isFault: boolean }[];
  } | null>(null);

  useEffect(() => {
    const storedRefString = localStorage.getItem("referenceString");
    const storedInitialRefString = localStorage.getItem(
      "initialReferenceString"
    );
    const storedFrameSize = localStorage.getItem("frameSize");
    const storedResult = localStorage.getItem("result");

    if (
      storedRefString &&
      storedInitialRefString &&
      storedFrameSize &&
      storedResult
    ) {
      setReferenceString(JSON.parse(storedRefString));
      setInitialReferenceString(JSON.parse(storedInitialRefString));
      setFrameSize(JSON.parse(storedFrameSize));
      setResult(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("referenceString", JSON.stringify(referenceString));
    localStorage.setItem(
      "initialReferenceString",
      JSON.stringify(initialReferenceString)
    );
    localStorage.setItem("frameSize", JSON.stringify(frameSize));
    localStorage.setItem("result", JSON.stringify(result));
    setLoading(false);
  }, [referenceString, initialReferenceString, frameSize, result]);

  return (
    <PRContext.Provider
      value={{
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
      }}
    >
      {children}
    </PRContext.Provider>
  );
};

export const usePR = () => {
  const context = useContext(PRContext);
  if (!context) {
    throw new Error("useIO must be used within a PRProvider");
  }
  return context;
};
