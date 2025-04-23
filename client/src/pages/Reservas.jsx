import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import './diseño/Reservas.css'; // New CSS file for custom styling

const Reservas = () => {
    const [FK_cliente, setFK_cliente] = useState("");
    const [FK_empleado, setFK_empleado] = useState("");
    const [FK_rooms, setFK_rooms] = useState("");
    const [ReservasList, setReservas] = useState([]);
    const [editarReserva, setEditarReserva] = useState(false);
    const [clientesList, setClientes] = useState([]);
    const [empleadosList, setEmpleados] = useState([]);
    const [roomList, setRooms] = useState([]);
    const [activeTab, setActiveTab] = useState('clientes');

    useEffect(() => {
        // Load all data initially
        getClientes();
        getEmpleados();
        getRooms();
    }, []);

    const addReserva = () => {
        Axios.post("http://localhost:3001/addReserva", {
            FK_cliente: FK_cliente,
            FK_empleado: FK_empleado,
            FK_rooms: FK_rooms,
        }).then(() => { 
            limpiarReservas();
            Swal.fire({
                title: '<strong>Registro exitoso</strong>',
                html: '<i>La reserva fue registrada con éxito!</i>',
                icon: 'success',
                timer: 1500
            });
            getReservas(); // Load reservations after adding
        }).catch(function(error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se logró registrar la reserva",
                footer: JSON.parse(JSON.stringify(error)).message
            });
        });
    }

    const getReservas = () => {
        Axios.get("http://localhost:3001/Mostrarinfo").then((response) => {
            setReservas(response.data);
        });
    }

    const limpiarReservas = () => {
        setFK_cliente("");
        setFK_empleado("");
        setFK_rooms("");
        setEditarReserva(false);
    }

    const getClientes = () => {
        Axios.get("http://localhost:3001/clientes").then((response) => {
            setClientes(response.data);
        });
    }

    const getEmpleados = () => {
        Axios.get("http://localhost:3001/empleados").then((response) => {
            setEmpleados(response.data);
        });
    }

    const getRooms = () => {
        Axios.get("http://localhost:3001/Mostrarrooms").then((response) => {
            setRooms(response.data);
        });
    }

    const imprimirPagina = () => {
        window.print();
    }

    return (
        <div className="reservas-container">
            <div className="glass-header">
                <h2>Sistema de Reservas</h2>
            </div>
            
            {/* Tab navigation */}
            <div className="tab-navigation">
                <button 
                    className={`tab-button ${activeTab === 'clientes' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('clientes')}
                >
                    Clientes
                </button>
                <button 
                    className={`tab-button ${activeTab === 'empleados' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('empleados')}
                >
                    Empleados
                </button>
                <button 
                    className={`tab-button ${activeTab === 'habitaciones' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('habitaciones')}
                >
                    Habitaciones
                </button>
                <button 
                    className={`tab-button ${activeTab === 'reservas' ? 'active' : ''}`} 
                    onClick={() => {
                        setActiveTab('reservas');
                        getReservas();
                    }}
                >
                    Reservas
                </button>
            </div>
            
            {/* Content panels */}
            <div className="tab-content">
                {/* Clientes panel */}
                <div className={`panel ${activeTab === 'clientes' ? 'active' : ''}`}>
                    <div className="panel-header">
                        <h2>Listado de Clientes</h2>
                        <button className="refresh-button" onClick={getClientes}>
                            <i className="fas fa-sync"></i> Actualizar
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="custom-table client-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Identificación</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>País Natal</th>
                                    <th>Teléfono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientesList.map((val) => (
                                    <tr key={val.identificacion} onClick={() => setFK_cliente(val.id)}>
                                        <td>{val.id}</td>
                                        <td>{val.identificacion}</td>
                                        <td>{val.nombre}</td>
                                        <td>{val.correo}</td>
                                        <td>{val.pais}</td>
                                        <td>{val.telefono}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Empleados panel */}
                <div className={`panel ${activeTab === 'empleados' ? 'active' : ''}`}>
                    <div className="panel-header">
                        <h2>Listado de Empleados</h2>
                        <button className="refresh-button" onClick={getEmpleados}>
                            <i className="fas fa-sync"></i> Actualizar
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="custom-table employee-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre empleado</th>
                                    <th>Salario</th>
                                    <th>Edad</th>
                                    <th>Cargo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleadosList.map((val) => (
                                    <tr key={val.id_unicoE} onClick={() => setFK_empleado(val.id_unicoE)}>
                                        <td>{val.id_unicoE}</td>
                                        <td>{val.nombreE}</td>
                                        <td>{val.salario}</td>
                                        <td>{val.edad}</td>
                                        <td>{val.cargo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                {/* Habitaciones panel */}
                <div className={`panel ${activeTab === 'habitaciones' ? 'active' : ''}`}>
                    <div className="panel-header">
                        <h2>Listado de Habitaciones</h2>
                        <button className="refresh-button" onClick={getRooms}>
                            <i className="fas fa-sync"></i> Actualizar
                        </button>
                    </div>
                    <div className="room-grid">
                        {roomList.map((room) => (
                            <div 
                                key={room.id_room} 
                                className={`room-card ${FK_rooms === room.id_room ? 'selected' : ''}`}
                                onClick={() => setFK_rooms(room.id_room)}
                            >
                                <div className="room-image">
                                    <img src={`http://localhost:3001/uploads/${room.image}`} alt={room.category} />
                                </div>
                                <div className="room-info">
                                    <h3>{room.category}</h3>
                                    <p className="price">${room.price} / noche</p>
                                    <p className="room-id">ID: {room.id_room}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Reservas panel */}
                <div className={`panel ${activeTab === 'reservas' ? 'active' : ''}`}>
                    <div className="panel-header">
                        <h2>Gestión de Reservas</h2>
                    </div>
                    
                    <div className="reservation-form-container">
                        <div className="glass-card">
                            <h3>Nueva Reserva</h3>
                            <div className="form-group">
                                <label>ID Cliente:</label>
                                <input 
                                    type="number" 
                                    value={FK_cliente} 
                                    onChange={(e) => setFK_cliente(e.target.value)}
                                    placeholder="ID del cliente"
                                    className="form-control-glass"
                                />
                                <span className="selected-item">
                                    {clientesList.find(c => c.id == FK_cliente)?.nombre || ''}
                                </span>
                            </div>
                            
                            <div className="form-group">
                                <label>ID Empleado:</label>
                                <input 
                                    type="number" 
                                    value={FK_empleado} 
                                    onChange={(e) => setFK_empleado(e.target.value)}
                                    placeholder="ID del empleado"
                                    className="form-control-glass"
                                />
                                <span className="selected-item">
                                    {empleadosList.find(e => e.id_unicoE == FK_empleado)?.nombreE || ''}
                                </span>
                            </div>
                            
                            <div className="form-group">
                                <label>ID Habitación:</label>
                                <input 
                                    type="number" 
                                    value={FK_rooms} 
                                    onChange={(e) => setFK_rooms(e.target.value)}
                                    placeholder="ID de la habitación"
                                    className="form-control-glass"
                                />
                                <span className="selected-item">
                                    {roomList.find(r => r.id_room == FK_rooms)?.category || ''}
                                </span>
                            </div>
                            
                            <div className="button-row">
                                <button className="btn-glass" onClick={addReserva}>
                                    <i className="fas fa-save"></i> Registrar
                                </button>
                                <button className="btn-glass secondary" onClick={limpiarReservas}>
                                    <i className="fas fa-eraser"></i> Limpiar
                                </button>
                                <button className="btn-glass" onClick={imprimirPagina}>
                                    <i className="fas fa-print"></i> Imprimir
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="reservations-list">
                        <h3>Listado de Reservas</h3>
                        <div className="table-container">
                            <table className="custom-table reservation-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Cliente</th>
                                        <th>Identificación</th>
                                        <th>Correo</th>
                                        <th>Empleado</th>
                                        <th>Cargo</th>
                                        <th>Habitación</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ReservasList.map((val) => (
                                        <tr key={val.id_reservas}>
                                            <td>{val.id_reservas}</td>
                                            <td>{val.nombre}</td>
                                            <td>{val.identificacion}</td>
                                            <td>{val.correo}</td>
                                            <td>{val.nombreE}</td>
                                            <td>{val.cargo}</td>
                                            <td>{val.category}</td>
                                            <td>${val.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reservas;