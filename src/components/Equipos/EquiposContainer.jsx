import React, { useState, useEffect } from 'react';
import EquiposView from './EquiposView';
import EditEquipoForm from './EditEquipoForm';

const EquiposContainer = () => {
    const [equipos, setEquipos] = useState([]);
    const [error, setError] = useState(null);
    const [selectedEquipo, setSelectedEquipo] = useState(null); // Nuevo estado para el equipo seleccionado

    const fetchEquipos = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const response = await fetch('http://localhost:5000/equipos', {
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.Mensaje || 'Error al obtener equipos');
            }
            const data = await response.json();
            setEquipos(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchEquipos();
    }, []);

    const handleDelete = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        try {
            const response = await fetch(`http://localhost:5000/equipos/eliminar`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.Mensaje || 'Error al eliminar el equipo');
            }
            setEquipos(equipos.filter((equipo) => equipo.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (equipo) => {
        setSelectedEquipo(equipo); // Asigna el equipo seleccionado
    };

    const handleUpdate = (updatedEquipo) => {
        // Actualiza la lista después de la edición
        setEquipos(prevEquipos =>
            prevEquipos.map(equipo => equipo.id === updatedEquipo.id ? updatedEquipo : equipo)
        );
        setSelectedEquipo(null); // Cierra el formulario de edición
    };

    return (
        <div>
            <h2>Gestión de Equipos</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {selectedEquipo ? (
                <EditEquipoForm equipo={selectedEquipo} onUpdate={handleUpdate} />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modelo</th>
                            <th>Categoría</th>
                            <th>Costo</th>
                            <th>Stock</th>
                            <th>Marca</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.map((equipo) => (
                            <tr key={equipo.id}>
                                <td>{equipo.nombre}</td>
                                <td>{equipo.modelo}</td>
                                <td>{equipo.categoria}</td>
                                <td>{equipo.costo}</td>
                                <td>{equipo.stock}</td>
                                <td>{equipo.marca}</td>
                                <td>
                                    <button onClick={() => handleEdit(equipo)}>Editar</button>
                                    <button onClick={() => handleDelete(equipo.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EquiposContainer;