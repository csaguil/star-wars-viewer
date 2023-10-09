import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Planet } from '../types/Planet';

interface PlanetContextProps {
    planets: Planet[];
    updatePlanets: (newPlanets: Planet[]) => void;
    nextPageUrl: string | null;
    setNextPageUrl: (url: string) => void;
}

const PlanetContext = createContext<PlanetContextProps | undefined>(undefined);

export const PlanetProvider: React.FC<{ children: ReactNode }> = ({
    children
}) => {
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [nextPageUrl, setNextPageUrl] =
        useState<PlanetContextProps['nextPageUrl']>(null);

    const updatePlanets = (newPlanets: Planet[]) => {
        setPlanets(newPlanets);
    };

    return (
        <PlanetContext.Provider
            value={{ planets, updatePlanets, nextPageUrl, setNextPageUrl }}
        >
            {children}
        </PlanetContext.Provider>
    );
};

export const usePlanetContext = (): PlanetContextProps => {
    const context = useContext(PlanetContext);

    if (!context) {
        throw new Error(
            'usePlanetContext must be used within a PlanetProvider'
        );
    }

    return context;
};
