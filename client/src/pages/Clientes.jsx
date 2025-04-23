import React from 'react';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './diseño/Allcss.css'

const Clientes = ()=> {
    const [id,setId] = useState();
    const [nombre,setNombre] = useState("");
    const [correo,setCorreo] = useState("");
    const [identificacion,setIdentificacion] = useState();
    const [pais,setPais] = useState("");
    const [telefono,setTelefono] = useState();

    const [editar,setEditar] = useState(false);

    const [clientesList,setClientes]= useState([]);

    const add = ()=>{
        Axios.post("http://localhost:3001/create",{

        identificacion:identificacion,
        nombre:nombre,
        correo:correo,
        pais:pais,
        telefono:telefono,
        }).then(()=>{ 
        getClientes();
        limpiarCampos();
        Swal.fire({
            title: '<strong>Registro exitoso</strong>',
            html: '<i>El cliente <strong>'+nombre+'</strong> fue registrado con exito !!! </i>',
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

    const update = ()=>{
        Axios.put("http://localhost:3001/update",{

        id:id,
        identificacion:identificacion,
        nombre:nombre,
        correo:correo,
        pais:pais,
        telefono:telefono,
        }).then(()=>{
        getClientes();
        limpiarCampos();
        Swal.fire({
            title: '<strong>Actualizacion exitosa</strong>',
            html: '<i>El cliente <strong>'+nombre+'</strong> fue actualizado con exito !!! </i>',
            icon: 'success',
            timer: 1500
        })
        }).catch(function(error){
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro eliminar el cliente",
            footer: JSON.parse(JSON.stringify(error)).message       
        });
        });;
    }

    const deleteC = (val)=>{

        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success gap-5 ",
            cancelButton: "btn btn-danger gap-5 "
        },
        buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
        title: "Eliminar Usuario",
        html: '<i>Realmente desea eliminar a <strong>'+val.nombre+'</strong> ? </i>',
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminarlo!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/delete/${val.id}`,).then(()=>{
            getClientes();
            limpiarCampos();
            swalWithBootstrapButtons.fire({
            title: "Eliminado!",
            text: "El cliente ha sido eliminado",
            icon: "success",
            showConfirmButton: false,
            timer:  1500
            });
            }).catch(function(error){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logro eliminar el cliente",
                footer: JSON.parse(JSON.stringify(error)).message
            });
            });

        }
        else {
            swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El cliente no ha sido eliminado:)",
            icon: "error",
            showConfirmButton: false,
            timer:1500
            });
        }
        });
    }

    const limpiarCampos = ()=>{
        setIdentificacion("");
        setNombre("");
        setCorreo("");
        setPais("");
        setTelefono("");
        setEditar(false);
        

    }

    const editarCliente =(val)=>{
        setEditar(true);

        setIdentificacion(val.identificacion);
        setNombre(val.nombre);
        setCorreo(val.correo);
        setPais(val.pais);
        setTelefono(val.telefono);
        setId(val.id);
    }

    const getClientes = ()=>{
        Axios.get("http://localhost:3001/clientes").then((response)=>{
        setClientes(response.data);
        });
    }


    const listar =()=>{
        Axios.get("http://localhost:3001/clientes").then((response)=>{
        getClientes();
        });
    }
    
    return (
      <body>

        <div className="card1">
        
          
          <div className="subcard1 ">
          <h2 className='mb-4 d-flex justify-content-center'>Agregar Clientes</h2>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre: </span>
              <input type="text" value={nombre} 
              onChange={(event)=>{
                setNombre(event.target.value);}}
              className="form-control" placeholder="Escriba su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Correo: </span>
              <input type="email" value={correo}
              onChange={(event)=>{
                setCorreo(event.target.value);}}
              className="form-control" placeholder="Escriba su correo" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Identificacion: </span>
              <input type="number" value={identificacion}
              onChange={(event)=>{
                setIdentificacion(event.target.value);}}
              className="form-control"  placeholder="Digite su identificacion" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>   
            
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Pais: </span>
              <input type="text" value={pais} 
              onChange={(event)=>{
                setPais(event.target.value);}}
              className="form-control" placeholder="Escriba su pais natal" aria-label="Username" aria-describedby="basic-addon1"/>
            </div> 

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Telefono </span>
              <input type="number"
              onChange={(event)=>{
                setTelefono(event.target.value);}}
              className="form-control" value={telefono} placeholder="Escriba su # de telefono" aria-label="Username" aria-describedby="basic-addon1"/>
            </div> 

          </div> 
          
          <div className="card2">
            {
              editar == true?

              <div className="card3" >
              <button type='button' className ='btn btn-info btn-lg 'onClick={update}>Actualizar</button> 
              <button type='button' className ='btn btn-warning btn-lg 'onClick={limpiarCampos}>Cancelar</button>
              </div>
              :
              <button type='button' className ='btn btn-success btn-lg 'onClick={add}>Registrar</button>

            }
          
          <button type='button' className ='btn btn-dark btn-lg'onClick={listar}>Listar</button>
          </div>

        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Identificacion</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Pais Natal</th>
              <th scope="col">Telefono celular</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>

            {
            clientesList.map((val,key)=>{
              return <tr key={val.identificacion}>
                      <th>{val.id}</th>
                      <th>{val.identificacion}</th>
                      <td>{val.nombre}</td>
                      <td>{val.correo}</td>
                      <td>{val.pais}</td>
                      <td>{val.telefono}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 
                        onClick={()=>{
                          editarCliente(val);
                        }}
                        className="btn btn-info">Editar</button>
                        <button type="button" onClick={()=>{
                          deleteC(val);
                        }} className="btn btn-danger">Eliminar</button>
                      </div>

                      </td>
                    </tr>
            })
            }
            
          </tbody>
        </table>
      </body>
  );
}


export default Clientes;

  
    