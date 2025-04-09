import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Select = ({ cargo, onChange }) => (
  <select class="form-select" aria-label="Default select example" value={cargo} onChange={onChange}>
    <option selected>Seleccione un cargo</option>
    <option value="Recepcionista">Recepcionista</option>
    <option value="Personal de aseo">Personal de aseo</option>
    <option value="Supervisor">Supervisor</option>
    <option value="Guarda de Seguridad">Guarda de Seguridad</option>
    <option value="Tecnico">Tecnico</option>
    <option value="Cocinero">Cocinero</option>
    <option value="Camarero de piso">Camarero de piso</option>
    <option value="Botones">Botones</option>
    <option value="Otro">Otro</option>

  </select>
);

export default Select;