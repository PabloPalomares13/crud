import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const Facturas = ()=> {

    const [id_reservas,setId_reservas] = useState();
    const [FK_cliente,setFK_cliente] = useState();
    const [FK_empleado,setFK_empleado] = useState();
    const [FK_rooms,setFK_rooms] = useState();
    const [ReservasList,setReservas]= useState([]);
    const [editarReserva,setEditarReserva] = useState(false);
    const [clientesList,setClientes]= useState([]);
    const [empleadosList,setEmpleados]= useState([]);
    const [roomList,setRooms]= useState([]);

    const addReserva = ()=>{
        Axios.post("http://localhost:3001/addReserva",{

        FK_cliente:FK_cliente,
        FK_empleado:FK_empleado,
        FK_rooms:FK_rooms,
        }).then(()=>{ 
        //getReservas();
        limpiarReservas();
        Swal.fire({
            title: '<strong>Registro exitoso</strong>',
            html: '<i>La reserva fue registrada con exito !!! </i>',
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

    const getReservas = ()=>{
        Axios.get("http://localhost:3001/Mostrarinfo").then((response)=>{
        setReservas(response.data);
        });
    }
    const listarReservas =()=>{
        Axios.get("http://localhost:3001/Mostrarinfo").then((response)=>{
        getReservas();
      });
    }

    const limpiarReservas = ()=>{
        setFK_cliente("");
        setFK_empleado("");
        setFK_rooms("");
        setEditarReserva(false);
        

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
    const getEmpleados = ()=>{
        Axios.get("http://localhost:3001/empleados").then((response)=>{
        setEmpleados(response.data);
        });
    }

    const listarE =()=>{
      Axios.get("http://localhost:3001/empleados").then((response)=>{
      getEmpleados();
      });
  }
  const getRooms = ()=>{
    Axios.get("http://localhost:3001/Mostrarrooms").then((response)=>{
    setRooms(response.data);
    });
}
const listarR =()=>{
    Axios.get("http://localhost:3001/Mostrarrooms").then((response)=>{
    getRooms();
    });
}

function imprimirPagina(){
    window.print();
}

    return (
        <body>
            
            <div className="d-flex justify-content-around">
            <button type='button' className ='btn btn-outline-success btn-lg'onClick={listar}>Listar Clientes</button>
            <button type='button' className ='btn btn-outline-info btn-lg'onClick={listarE}>Listar Empleados</button>
            <button type='button' className ='btn btn-outline-warning btn-lg'onClick={listarR}>Listar Habitaciones</button>
            </div>

            <table className="table table-sm table-success table-striped caption-top table-responsive">
            <caption>Lista de clientes</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Identificacion</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Pais Natal</th>
              <th scope="col">Telefono celular</th>
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


                      </td>
                    </tr>
            })
            }     
          </tbody>
        </table>
        <table className="table table-sm table-info table-striped caption-top table-responsive">
        <caption>Lista de empleados</caption>
          <thead>
            <tr > 
              <th scope="col">#</th>
              <th scope="col">Nombre empleado</th>
              <th scope="col">Salario</th>
              <th scope="col">Edad</th>
              <th scope="col">Cargo</th>
            </tr>
          </thead>
          <tbody>

            {
            empleadosList.map((val,key)=>{
              return <tr key={val.id_unicoE}>
                      <th>{val.id_unicoE}</th>
                      <th>{val.nombreE}</th>
                      <td>{val.salario}</td>
                      <td>{val.edad}</td>
                      <td>{val.cargo}</td>
                      <td>

                      </td>
                    </tr>
            })
            }    
          </tbody>
        </table>
        <table className="table table-sm table-warning table-striped caption-top table-responsive">
        <caption>Lista de habitaciones</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre categoria</th>
                        <th scope="col">Precio noche</th>
                    </tr>
                </thead>
            <tbody>

                {
                    roomList.map((val,key)=>{
                        return <tr key={val.id_room}>
                                <th>{val.id_room}</th>
                                <th><img src={`http://localhost:3001/uploads/${val.image}`} alt={val.category} width="100" /></th>
                                <td>{val.category}</td>
                                <td>{val.price}</td>
                                <td>                                                       
                                </td>
                              </tr>
                      })        
                }
            </tbody>
        </table>
        <div className="subcard1 mt-5 mb-5">
                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ID unico cliente</span>
                <input type="number" value={FK_cliente} 
                onChange={(event)=>{
                    setFK_cliente (event.target.value);}}
                className="form-control" placeholder="Escriba el ID del cliente" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ID unico empleado </span>
                <input type="number" value={FK_empleado}
                onChange={(event)=>{
                    setFK_empleado(event.target.value);}}
                className="form-control" placeholder="Escriba el ID del empleado" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>

                <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">ID unico habitacion </span>
                <input type="number" value={FK_rooms}
                onChange={(event)=>{
                    setFK_rooms(event.target.value);}}
                className="form-control"  placeholder="Escriba el ID de la habitacion" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>   
            </div> 
            <div>
                <button type='button' className ='btn btn-success btn-lg 'onClick={addReserva}>Registrar</button>
                <button type='button' className ='btn btn-secondary btn-lg'onClick={listarReservas}>Listar Reservas</button>
                <button type='button' className ='btn btn-secondary btn-lg'onClick={imprimirPagina}>Imprimir reservas</button>

            </div>
            <table className="table table-sm table-striped caption-top table-responsive">
            <caption>Lista de Reservas</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID Cliente</th>
                        <th scope="col">Cedula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">ID empleado</th>
                        <th scope="col">Nombre empleado</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">ID habitacion</th>
                        <th scope="col">Tipo habitacion</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
            <tbody>

                {
                    ReservasList.map((val,key)=>{
                        return <tr key={val.id_reservas}>
                                <th>{val.id_reservas}</th>
                                <th>{val.id}</th>
                                <th>{val.identificacion}</th>
                                <td>{val.nombre}</td>
                                <td>{val.correo}</td>
                                <th>{val.id_unicoE}</th>
                                <th>{val.nombreE}</th>
                                <td>{val.cargo}</td>
                                <th>{val.id_room}</th>
                                <td>{val.category}</td>
                                <td>{val.price}</td>
                                <td>                                                       
                                </td>
                              </tr>
                      })        
                }
            </tbody>
        </table>
            
        </body>
    )
}
export default Facturas;