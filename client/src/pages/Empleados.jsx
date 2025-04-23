import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Select from './opciones/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const Empleados = () => {

    const [id_unicoE,setId_unicoE] = useState();
    const [nombreE, setNombreE] = useState('');
    const [salario, setSalario] = useState('');
    const [edad, setEdad] = useState('');
    const [cargo, setCargo] = useState('');

    const [empleadosList,setEmpleados]= useState([]);
   // const [datoList,setdato]= useState([]);
    const [editarE,setEditarE] = useState(false);

    const addE = ()=>{
      Axios.post("http://localhost:3001/crearEmp",{

          nombreE:nombreE,
          salario:salario,
          edad:edad,
          cargo:cargo,
          }).then(()=>{ 
          getEmpleados();
          limpiarCamposE();
          Swal.fire({
              title: '<strong>Registro exitoso</strong>',
              html: '<i>El empleado <strong>'+nombreE+'</strong> fue registrado con exito !!! </i>',
              icon: 'success',
              timer: 1500
          })
          }).catch(function(error){
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro registrar el cliente",
              footer: JSON.parse(JSON.stringify(error)).message
          });
          });; 
      }
      const updateE = ()=>{
        Axios.put("http://localhost:3001/updateE",{

          id_unicoE:id_unicoE,
          nombreE:nombreE,
          salario:salario,
          edad:edad,
          cargo:cargo,
          }).then(()=>{ 
          getEmpleados();
          limpiarCamposE();
        Swal.fire({
            title: '<strong>Actualizacion exitosa</strong>',
            html: '<i>El empleado <strong>'+nombreE+'</strong> fue actualizado con exito !!! </i>',
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
    const deleteE = (val)=>{

      const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: "btn btn-success gap-5 ",
          cancelButton: "btn btn-danger gap-5 "
      },
      buttonsStyling: true
      });
      swalWithBootstrapButtons.fire({
      title: "Eliminar Usuario",
      html: '<i>Realmente desea eliminar a <strong>'+val.nombreE+'</strong> ? </i>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "No, Cancelar!",
      reverseButtons: true
      }).then((result) => {
      if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/deleteE/${val.id_unicoE}`,).then(()=>{
          getEmpleados();
          limpiarCamposE();
          swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "El empleado ha sido eliminado",
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
          text: "El empleado no ha sido eliminado:)",
          icon: "error",
          showConfirmButton: false,
          timer:1500
          });
      }
      });
  }
    const editarEmpleado =(val)=>{
      setEditarE(true);

      setNombreE(val.nombreE);
      setSalario(val.salario);
      setEdad(val.edad);
      setCargo(val.cargo);
      setId_unicoE(val.id_unicoE);
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
  const limpiarCamposE = ()=>{
    getEmpleados();
          getEmpleados();
          setNombreE('');
          setSalario('');
          setEdad('');
          setCargo('');
    setEditarE(false);
    
}
    return (
      <body>
        <div className="card1">
        
          
        <div className="subcard01 ">
        <h2 className='mb-4 d-flex justify-content-center'>Agregar Empleado</h2>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre del empleado: </span>
            <input type="text" value={nombreE} 
            onChange={(event)=>{
              setNombreE(event.target.value);}}
            className="form-control" placeholder="Escriba el nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Salario: </span>
            <input type="number" value={salario}
            onChange={(event)=>{
              setSalario(event.target.value);}}
            className="form-control" placeholder="Digite el salario" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad </span>
            <input type="number" value={edad}
            onChange={(event)=>{
              setEdad(event.target.value);}}
            className="form-control"  placeholder="Escriba la edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>  
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo </span>
            <Select cargo={cargo} onChange={(e) => setCargo(e.target.value)} />
          </div> 
        </div> 
      </div>
      <div className="card2">
            {
              editarE == true?

              <div className="card3" >
              <button type='button' className ='btn btn-info btn-lg 'onClick={updateE}>Actualizar</button> 
              <button type='button' className ='btn btn-warning btn-lg 'onClick={limpiarCamposE}>Cancelar</button>
              </div>
              :
              <div>
              <button type='button' className ='btn btn-success btn-lg 'onClick={addE}>Registrar</button>
              <button type='button' className ='btn btn-dark btn-lg'onClick={listarE}>Listar</button>
              </div>
            }
          
          
          </div>
      <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre empleado</th>
              <th scope="col">Salario</th>
              <th scope="col">Edad</th>
              <th scope="col">Cargo</th>
              <th scope="col">Acciones</th>
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
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" 
                        onClick={()=>{
                          editarEmpleado(val);
                        }}
                        className="btn btn-info">Editar</button>
                        <button type="button" onClick={()=>{
                          deleteE(val);
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


export default Empleados;