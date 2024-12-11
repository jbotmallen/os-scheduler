"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface IOContextType {
  operations: number[];
  setOperations: (operations: number[]) => void;
  headPosition: number;
  setHeadPosition: (headPosition: number) => void;
  diskEnd: number;
  setDiskEnd: (diskEnd: number) => void;
  loading: boolean;
}

const IOContext = createContext<IOContextType | undefined>(undefined);

export const IOProvider = ({ children }: { children: ReactNode }) => {
  const [operations, setOperations] = useState<number[]>([]);
  const [headPosition, setHeadPosition] = useState<number>(0);
  const [diskEnd, setDiskEnd] = useState<number>(200);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedOperations = localStorage.getItem("operations");
    const storedHeadPosition = localStorage.getItem("headPosition");
    if (storedOperations && storedHeadPosition) {
      setOperations(JSON.parse(storedOperations));
      setHeadPosition(JSON.parse(storedHeadPosition));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("operations", JSON.stringify(operations));
    localStorage.setItem("headPosition", JSON.stringify(headPosition));
    localStorage.setItem("diskEnd", JSON.stringify(diskEnd));
    setLoading(false);
  }, [operations, headPosition]);

  return (
    <IOContext.Provider
      value={{
        operations,
        setOperations,
        headPosition,
        setHeadPosition,
        diskEnd,
        setDiskEnd,
        loading,
      }}
    >
      {children}
    </IOContext.Provider>
  );
};

export const useIO = () => {
  const context = useContext(IOContext);
  if (!context) {
    throw new Error("useIO must be used within a IOProvider");
  }
  return context;
};
