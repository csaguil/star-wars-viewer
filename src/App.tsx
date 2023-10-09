import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PlanetTable from './components/PlanetTable';
import PlanetDetail from './components/PlanetDetail';
import { PlanetProvider } from './contexts/PlanetContext';

const Home = () => {
    return (
        <div className="container">
            <div className="table-container">
                <h1 className="title">Star Wars Planet Explorer</h1>
                <PlanetTable />
            </div>
        </div>
    );
};

const App = () => {
    return (
        <PlanetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/planets/:id" element={<PlanetDetail />} />
                </Routes>
            </Router>
        </PlanetProvider>
    );
};

export default App;
