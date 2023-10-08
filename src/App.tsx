import React from 'react';
import './App.css';
import PlanetTable from './components/PlanetTable';

const App = () => {
    return (
        <div className="container">
            <div className="table-container">
                <h1 className="title">Star Wars Planet Explorer</h1>
                <PlanetTable />
            </div>
        </div>
    );
};

export default App;
