import React from 'react';
import Reportes from '../pages/Reportes';
import Home from '../pages/Home';
import Habitaciones from '../pages/Habitaciones';
import Reservas from '../pages/Reservas';
import Empleados from '../pages/Empleados';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Home />} />
                <Route path="/home" element= {<Home />} />
                <Route path="/Reportes" element= {<Reportes />} />
                <Route path="/habitaciones" element= {<Habitaciones />} />
                <Route path="/Reservas" element= {<Reservas />} />
                <Route path="/Empleados" element= {<Empleados />} />
            </Routes>
        </BrowserRouter> 
    )
}

export default Routers;