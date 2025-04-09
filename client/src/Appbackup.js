/*
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'



function App() {

  const [id,setId] = useState();
  const [nombre,setNombre] = useState("");
  const [correo,setCorreo] = useState("");
  const [identificacion,setIdentificacion] = useState();
  const [packhabitacion,setPackhabitacion] = useState("");
  const [nhabitacion,setNhabitacion] = useState();

  const [editar,setEditar] = useState(false);

  const [clientesList,setClientes]= useState([]);

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{

      identificacion:identificacion,
      nombre:nombre,
      correo:correo,
      packhabitacion:packhabitacion,
      nhabitacion:nhabitacion,
    }).then(()=>{
      getClientes();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Registro exitoso</strong>',
        html: '<i>El cliente <strong>'+nombre+'</strong> fue registrado con exito !!! </i>',
        icon: 'success',
        timer: 1500
      })
    });
  }

  const update = ()=>{
    Axios.put("http://localhost:3001/update",{

      id:id,
      identificacion:identificacion,
      nombre:nombre,
      correo:correo,
      packhabitacion:packhabitacion,
      nhabitacion:nhabitacion,
    }).then(()=>{
      getClientes();
      limpiarCampos();
      Swal.fire({
        title: '<strong>Actualizacion exitosa</strong>',
        html: '<i>El cliente <strong>'+nombre+'</strong> fue actualizado con exito !!! </i>',
        icon: 'success',
        timer: 1500
      })
    });
  }

  const deleteC = (val)=>{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
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
        });
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "El cliente ha sido eliminado",
          icon: "success"
        });
      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "El cliente no ha sido eliminado:)",
          icon: "error"
        });
      }
    });

  }

  const limpiarCampos = ()=>{
    setIdentificacion("");
    setNombre("");
    setCorreo("");
    setPackhabitacion("");
    setNhabitacion("");
    setEditar(false);
    

  }

  const editarCliente =(val)=>{
    setEditar(true);

    setIdentificacion(val.identificacion);
    setNombre(val.nombre);
    setCorreo(val.correo);
    setPackhabitacion(val.packhabitacion);
    setNhabitacion(val.nhabitacion);
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
    <div className="container-fluid">
        
        <div className="card text-center">
          <div className="card-header w-100 p-4 bg-primary bg-gradient text-white">
            Gestion de Clientes Hotel
          </div>
          <div className="card-body m-4 ">

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
              <span className="input-group-text" id="basic-addon1">Paquete de habitacion: </span>
              <input type="text" value={packhabitacion} 
              onChange={(event)=>{
                setPackhabitacion(event.target.value);}}
              className="form-control" placeholder="Escriba el paquete deseado" aria-label="Username" aria-describedby="basic-addon1"/>
            </div> 

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Numero de habitacion: </span>
              <input type="number"
              onChange={(event)=>{
                setNhabitacion(event.target.value);}}
              className="form-control" value={nhabitacion} placeholder="Escriba el numero de habitacion" aria-label="Username" aria-describedby="basic-addon1"/>
            </div> 

          </div> 
          
          <div className="d-grid gap-5 d-md-flex justify-content-md-center ">
            {
              editar == true?

              <div className="d-grid gap-2 d-md-flex justify-content-md-center " >
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
              <th scope="col">Paquete de habitacion</th>
              <th scope="col">Numero de habitacion</th>
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
                      <td>{val.packhabitacion}</td>
                      <td>{val.nhabitacion}</td>
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
    </div>
  );
}



export default App;

*/