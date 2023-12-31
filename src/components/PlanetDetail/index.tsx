import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import type { Planet } from '../../types/Planet';
import './PlanetDetail.css';
import api from '../../utils/api';
import { displayDate } from '../../utils/dateUtils';
import { displayNumber } from '../../utils/numberUtils';

const PlanetDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [planet, setPlanet] = useState<Planet | null>(
        location.state?.planet ?? null
    );
    const [residentNames, setResidentNames] = useState<Array<string>>([]);

    useEffect(() => {
        async function getPlanet(planetId: number) {
            const planet = await api.planets(planetId);
            setPlanet(planet);
        }
        const idAsNumber = Number(id);
        if (!planet && !Number.isNaN(idAsNumber)) {
            getPlanet(idAsNumber);
        }
    }, []);

    useEffect(() => {
        async function getResidentNames() {
            const urls = planet?.residents ?? [];
            const promises = urls.map((url) => {
                return fetch(url)
                    .then((res) => res.json())
                    .then((data) => data);
            });
            const responses = await Promise.all(promises);
            const names: Array<string> = responses.map((res) => res.name);
            setResidentNames(names);
        }
        if (planet && 'residents' in planet) {
            getResidentNames();
        }
    }, [planet]);

    const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="container">
            <div className="table-container">
                {planet && (
                    <>
                        <a
                            className="back-button"
                            onClick={handleBack}
                            href="/"
                        >
                            {'<-'} Back
                        </a>

                        <h1 className="title">{planet.name}</h1>
                        <table className="planet-table">
                            <tbody>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Name</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.name}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Rotation Period</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.rotation_period)}{' '}
                                        standard hours
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Orbital Period</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.orbital_period)}{' '}
                                        standard days
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Diameter</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.diameter)} KM
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Climate</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.climate}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Gravity</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.gravity}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Terrain</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.terrain}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Surface Water</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.surface_water)} %
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Population</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayNumber(planet.population)}{' '}
                                        people
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Residents</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {residentNames.join(', ')}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Films</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {planet.films?.join(', ')}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Created</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayDate(planet.created)}
                                    </td>
                                </tr>
                                <tr className="planet-table-row">
                                    <td className="planet-table-cell">
                                        <strong>Edited</strong>
                                    </td>
                                    <td className="planet-table-cell">
                                        {displayDate(planet.edited)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default PlanetDetail;
