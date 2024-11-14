import React from 'react';

const EquiposView = ({ equipo, onUpdate, onDelete }) => {
    return (
    <div className="user-list-item">
        <h3>Detalles del Equipo</h3>
        <p><strong>Nombre:</strong> {equipo.nombre}</p>
        <p><strong>Modelo ID:</strong> {equipo.modelo_id}</p>
        <p><strong>Categoría ID:</strong> {equipo.categoria_id}</p>
        <p><strong>Costo:</strong> {equipo.costo}</p>
        <p><strong>Stock ID:</strong> {equipo.stock_id}</p>
        <p><strong>Marca ID:</strong> {equipo.marca_id}</p>
        <p><strong>Activo:</strong> {equipo.activo ? 'Sí' : 'No'}</p>
        <div className="actions">
        <button onClick={() => onUpdate(equipo)}>Actualizar</button>
        <button onClick={() => onDelete(equipo.id)}>Borrar</button>
        </div>
    </div>
    );
};

export default EquiposView;