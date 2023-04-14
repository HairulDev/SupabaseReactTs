import React from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import GameDetail from '../../components/molecules/GameDetail';
import Auth from '../../pages/auth';
import Dashboard from '../../pages/dashboard';


const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/game/:id" element={<GameDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
