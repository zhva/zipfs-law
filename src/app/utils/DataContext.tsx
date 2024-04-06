"use client";

import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';

interface DataItem {
    genre: string;
    word: string;
    frequency: number;
}

interface DataContextType {
    data: DataItem[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('./data/lyrics-word-frequencies.json');
            const jsonData = await response.json() as DataItem[];

            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };


    return (
        <DataContext.Provider value={{ data }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }

    return context.data;
};
