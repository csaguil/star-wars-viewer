import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import type { Planet } from '../../types/Planet';
import './PlanetDetail.css';
import api from '../../utils/api';

const PlanetDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [planet, setPlanet] = useState<Planet | null>(
        location.state?.planet ?? null
    );

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

    const handleBack = () => {
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
                        {JSON.stringify(planet)}
                    </>
                )}
            </div>
        </div>
    );
};

export default PlanetDetail;
