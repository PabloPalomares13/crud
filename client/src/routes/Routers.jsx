import React from 'react';
import Reportes from '../pages/Reportes';
import Clientes from '../pages/Clientes';
import Habitaciones from '../pages/Habitaciones';
import Reservas from '../pages/Reservas';
import Empleados from '../pages/Empleados';
import Home from '../pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Home />} />
                
                <Route path="/clientes" element= {<Clientes />} />
                <Route path="/Reportes" element= {<Reportes />} />
                <Route path="/habitaciones" element= {<Habitaciones />} />
                <Route path="/Reservas" element= {<Reservas />} />
                <Route path="/Empleados" element= {<Empleados />} />
                <Route path="/Home" element= {<Home />} ></Route>

            </Routes>

        </BrowserRouter> 
    )
}

export default Routers;