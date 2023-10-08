import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import PlanetTable from './components/PlanetTable';

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

const PlanetDetail = () => {
    const { id } = useParams();

    return (
        <div className="container">
            <div className="table-container">
                <h1 className="title">Planet {id}</h1>
            </div>
        </div>
    );
};
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planets/:id" element={<PlanetDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
