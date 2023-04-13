import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'; // Menggunakan Routes sebagai wrapper
import Auth from '../../pages/auth';
import Dashboard from '../../pages/dashboard';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
