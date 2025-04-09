import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


const Habitaciones = ()=> {
    const [id_room,setId_room] = useState();
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [roomList,setRooms]= useState([]);
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [editarR,setEditarR] = useState(false);

    const addR= async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('myFileInput');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('category', category);
        formData.append('price', price);
        formData.append('image', file);

        Axios.post("http://localhost:3001/rooms", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
        }
        
        }).then(() => { 
            setCategory('');
            setPrice('');
            setImage('');
     //       getRooms();
            limpiarCamposR();
            Swal.fire({
                title: '<strong>Registro exitoso</strong>',
                html: '<i>La categoria <strong>'+category+'</strong> fue registrada con exito !!! </i>',
                icon: 'success',
                timer: 1500
        })
        fileInput.value = "";
    }).catch(function(error){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro registrar la categoria",
            footer: JSON.parse(JSON.stringify(error)).message
        });
    }); 
    };
    
    
    const updateRoom = () => {
        const fileInput = document.getElementById('myFileInput');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('id_room', id_room);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('image', file);
    
        Axios.put(`http://localhost:3001/Editroom`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => { 
            getRooms();
            limpiarCamposR();
            Swal.fire({
                title: '<strong>Actualización exitosa</strong>',
                html: '<i>La habitación <strong>'+category+'</strong> fue actualizada con éxito !!! </i>',
                icon: 'success',
                timer: 1500
            });
            fileInput.value = "";
        }).catch(function(error){
            console.log(error);
        }); 
    };

    const deleteR = (val)=>{

        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success gap-5 ",
            cancelButton: "btn btn-danger gap-5 "
        },
        buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
        title: "Eliminar Categoria",
        html: '<i>Realmente desea eliminar la categoria <strong>'+val.category+'</strong> ? </i>',
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminarlo!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            Axios.delete(`http://localhost:3001/deleteR/${val.id_room}`,).then(()=>{
            getRooms();
            limpiarCamposR();
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
    const limpiarCamposR = ()=>{
            getRooms();
            setCategory('');
            setPrice('');
            setImage(null);
            setEditarR(false);
        
    }
    const cancelR = () => {
        setCategory('');
        setPrice('');
        setImage(null);
    };
    const editarRoom =(val)=>{
        setEditarR(true);

        setCategory(val.category);
        setPrice(val.price);
        setImage(val.image)
        setId_room(val.id_room);
    }
    

    return (
        <body>
            <div className="card1">
        
                 
                <div className="subcard1 ">
                <h2 className='mb-4 d-flex justify-content-center'>Agregar Habitaciones</h2>
                    <form action="">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Categoria: </span>
                        <input type="text" value={category} 
                        onChange={e => setCategory(e.target.value)} 
                        className="form-control" placeholder="Escriba la categoria" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Precio: </span>
                        <input type="number" value={price} 
                        onChange={e => setPrice(e.target.value)} 
                        className="form-control"  placeholder="Digite el precio" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>   
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Imagen: </span>
                        <input input id='myFileInput' type="file" 
                        onChange={e => setImage(e.target.files[0])}
                        className="form-control" placeholder="Suba una imagen de referencia" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div> 
                    </form>
                </div> 
                
                <div className="card2">
                    {
                    editarR === true?

                    <div className="card3" >
                        <button type='button' className ='btn btn-info btn-lg 'onClick={updateRoom}>Actualizar</button> 
                        <button type='button' className ='btn btn-warning btn-lg 'onClick={limpiarCamposR}>Cancelar</button>
                    </div>
                    :
                    <div>
                        <button type='button' className ='btn btn-success btn-lg 'onClick={addR}>Registrar</button>
                        <button button type='button' className ='btn btn-dark btn-lg'onClick={listarR}>Listar</button>
                    </div>

                    }             
                </div>

            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Nombre categoria</th>
                        <th scope="col">Precio noche</th>
                        <th scope="col">Accion</th>
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
                                <div className="btn-group" role="group" aria-label="Basic example">
                                  <button type="button" 
                                  onClick={()=>{
                                    editarRoom(val);
                                  }}
                                  className="btn btn-info">Editar</button>
                                  <button type="button" onClick={()=>{
                                    deleteR(val);
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

export default Habitaciones;