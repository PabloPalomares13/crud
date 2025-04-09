import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
const imagen2 = 'logo-montañas.jpg'
const Header = () => {
    return(
      
        <header className="header" >
          <link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet"></link>
        <div className="h11" >
                <img src={imagen2} alt="Logo de montañas" className="logoH" />
                <h1 className="title" >Uni Resort</h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a href="/Home" >Clientes</a>
            </li> 
            <li>
              <a href="/Empleados" >Empleados</a>
            </li>
            <li>
              <a href="/Habitaciones">Habitaciones</a>
            </li>
            <li>
              <a href="/Reservas" >Reservas</a>
            </li>
            <li>
              <a href="/Reportes" >Reportes</a>
            </li>     
          </ul>
        </nav>
      </header>
    )

}
export default Header;