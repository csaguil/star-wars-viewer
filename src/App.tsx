import React, { useEffect, useState } from 'react';
import api from './utils/api';
import type { Planet } from './types/Planet';
import './App.css';

const App = () => {
    const [planets, setPlanets] = useState<Array<Planet>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIdx, setSelectedIdx] = useState(-1);

    useEffect(() => {
        async function getPlanets() {
            const data = await api.planets();
            if ('results' in data) {
                setPlanets(data.results);
            }
            setIsLoading(false);
        }
        getPlanets();
    }, []);
    return (
        <div className="container">
            <div className="table-container">
                <h1 className="title">Star Wars Planet Explorer</h1>
                {isLoading
                    ? 'Loading...'
                    : planets.length > 0 && (
                          <table className="planet-table">
                              <thead className="planet-table-header">
                                  <tr>
                                      <th className="planet-table-cell">
                                          Planet Name
                                      </th>
                                      <th className="planet-table-cell">
                                          Climate
                                      </th>
                                      <th className="planet-table-cell">
                                          Diameter
                                      </th>
                                      <th className="planet-table-cell">
                                          Population
                                      </th>
                                      <th className="planet-table-cell">
                                          Terrain
                                      </th>
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
                                      >
                                          <td className="planet-table-cell">
                                              {planet.name}
                                          </td>
                                          <td className="planet-table-cell">
                                              {planet.climate}
                                          </td>
                                          <td className="planet-table-cell">
                                              {planet.diameter}
                                          </td>
                                          <td className="planet-table-cell">
                                              {planet.population}
                                          </td>
                                          <td className="planet-table-cell">
                                              {planet.terrain}
                                          </td>
                                          <td className="planet-table-cell">
                                              {planet.rotation_period}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}
            </div>
        </div>
    );
};

export default App;
