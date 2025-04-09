import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 
const imagen3 = 'logoMontain.jpg'

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
            <div className="imagenCon">
              <img src={imagen3} alt="Logo de montañas" className="logoF" />
            </div>
            <div className="Info">
              <h5>Carrera</h5>
              <ul className="listass">
                <li className='texto1'> Tecnologia en Desarrollo de Software</li>
                <li className='texto1'> Bases de datos</li>
                <li className='texto1'> Proyecto crud</li>
              </ul>
            </div>
            <div className="Info">
              <h5>Estudiantes</h5>
              <ul className="listass">
                <li className='texto1'> Pablo Palomares Medina</li>
                <li className='texto1'> Juan Fula Rey</li>
                <li className='texto1'> Juanes Basto Cruz</li>
              </ul>
            </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;