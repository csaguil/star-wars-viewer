import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import type { Planet } from '../types/Planet';
import {displayNumber} from "../utils/numberUtils";

const PlanetTable = () => {
    const [planets, setPlanets] = useState<Array<Planet>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMorePlanets, setIsLoadingMorePlanets] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPlanets() {
            const data = await api.planets();
            if ('results' in data) {
                setPlanets(data.results);
            }
            if ('next' in data) {
                setNextPageUrl(data.next);
            }
            setIsLoading(false);
        }
        getPlanets();
    }, []);

    async function loadMorePlanets() {
        setIsLoadingMorePlanets(true);
        if (nextPageUrl) {
            const res = await fetch(nextPageUrl);
            const data = await res.json();
            if ('results' in data) {
                const newPlanets = [...planets, ...data.results];
                setPlanets(newPlanets);
            }
            if ('next' in data) {
                setNextPageUrl(data.next);
            }
        }
        setIsLoadingMorePlanets(false);
    }

    return (
        <div>
            {isLoading ? (
                'Loading...'
            ) : (
                <>
                    <table className="planet-table">
                        <thead className="planet-table-header">
                            <tr>
                                <th className="planet-table-cell">
                                    Planet Name
                                </th>
                                <th className="planet-table-cell">Climate</th>
                                <th className="planet-table-cell">Diameter</th>
                                <th className="planet-table-cell">
                                    Population
                                </th>
                                <th className="planet-table-cell">Terrain</th>
                                <th className="planet-table-cell">
                                    Rotation Period
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {planets.map((planet, index) => (
                                <tr
                                    key={index}
                                    className="planet-table-row"
                                    onClick={() => {
                                        navigate(`/planets/${index}`, {
                                            state: { planet: planets[index] }
                                        });
                                    }}
                                >
                                    <td className="planet-table-cell">
                                        {planet.name}
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.climate}
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.diameter)} KM
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.population)} people
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.terrain}
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.rotation_period)} standard hours
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {nextPageUrl && (
                        <button
                            className="load-more-button"
                            onClick={loadMorePlanets}
                        >
                            {isLoadingMorePlanets ? 'Loading...' : 'Load more planets'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default PlanetTable;
