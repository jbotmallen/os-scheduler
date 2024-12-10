"use client";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface SelectedContextType {
    selected: string;
    setSelected: (selected: string) => void;
    loading: boolean;
}

const SelectedContext = createContext<SelectedContextType | undefined>(undefined);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
    const [selected, setSelected] = useState<string>('OS');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const storedSelected = localStorage.getItem("selected");
        if (storedSelected) {
            setSelected(storedSelected);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("selected", selected);
        setLoading(false);
    }, [selected]);

    return (
        <SelectedContext.Provider value={{ selected, setSelected, loading }}>
            {children}
        </SelectedContext.Provider>
    );
};

export const useSelected = () => {
    const context = useContext(SelectedContext);
    if (!context) {
        throw new Error("useSelected must be used within a SelectedProvider");
    }
    return context;
};