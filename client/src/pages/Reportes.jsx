import React from 'react';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './diseño/Allcss.css'

const Reportes = ()=> {
    const [titulo,setTitulo] = useState("");
    const [descripcion,setDescripcion] = useState("");
    const [fk_reserva,setFk_reserva] = useState();
    
    const addRR = ()=>{
        Axios.post("http://localhost:3001/createReport",{

        titulo:titulo,
        descripcion:descripcion,
        fk_reserva:fk_reserva,
        }).then(()=>{ 
        limpiarCamposRR();
        Swal.fire({
            title: '<strong>Reporte exitoso</strong>',
            html: '<i>El reporte fue registrado con exito !!! </i>',
            icon: 'success',
            timer: 1500
        })
        }).catch(function(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro registar el cliente",
            footer: JSON.parse(JSON.stringify(error)).message
        });
        });; 
    }
    const limpiarCamposRR = ()=>{
        setTitulo('');
        setDescripcion('');
        setFk_reserva('');    

    }
    return (
        <body>
            <div className="card1">
 
                <div className="subcard1 ">
                <h2 className='mb-5'>Reporte de daños o problemas</h2>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Titulo del reporte: </span>
                    <input type="text" value={titulo} 
                    onChange={(event)=>{
                    setTitulo(event.target.value);}}
                    className="form-control" placeholder="Escriba un titulo" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3 h-50">
                    <span className="input-group-text " id="basic-addon1">Descripcion: </span>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"value={descripcion}
                    onChange={(event)=>{
                    setDescripcion(event.target.value);}} placeholder="Escriba detalladamente el problema"></textarea>

                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">ID Reserva </span>
                    <input type="number" value={fk_reserva}
                    onChange={(event)=>{
                    setFk_reserva(event.target.value);}}
                    className="form-control"  placeholder="Escriba el ID Reserva si es necesario" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>  

                <div className="card2">          
                    <button type='button' className ='btn btn-success btn-lg 'onClick={addRR}>Registrar</button>
                </div> 
            </div> 
        </div>    
        </body>
    )
}

export default Reportes;