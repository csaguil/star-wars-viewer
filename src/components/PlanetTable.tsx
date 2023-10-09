import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { displayNumber } from '../utils/numberUtils';
import { usePlanetContext } from '../contexts/PlanetContext';

const PlanetTable = () => {
    const { planets, updatePlanets, nextPageUrl, setNextPageUrl } =
        usePlanetContext();
    const [isLoading, setIsLoading] = useState(planets.length === 0);
    const [isLoadingMorePlanets, setIsLoadingMorePlanets] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function getPlanets() {
            const data = await api.planets();
            if ('results' in data) {
                updatePlanets(data.results);
            }
            if ('next' in data) {
                setNextPageUrl(data.next);
            }
            setIsLoading(false);
        }
        if (planets.length === 0) {
            getPlanets();
        }
    }, []);

    async function loadMorePlanets() {
        setIsLoadingMorePlanets(true);
        if (nextPageUrl) {
            const res = await fetch(nextPageUrl);
            const data = await res.json();
            if ('results' in data) {
                const newPlanets = [...planets, ...data.results];
                updatePlanets(newPlanets);
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
                                        {displayNumber(planet.population)}{' '}
                                        people
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.terrain}
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.rotation_period)}{' '}
                                        standard hours
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
                            {isLoadingMorePlanets
                                ? 'Loading...'
                                : 'Load more planets'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default PlanetTable;
