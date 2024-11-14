import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const EditEquipoForm = ({ equipo, onUpdate }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    // Validación con Yup
    const ValidationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre del equipo es obligatorio'),
    modelo_id: Yup.number().required('Modelo ID es obligatorio'),
    categoria_id: Yup.number().required('Categoría ID es obligatorio'),
    costo: Yup.number().required('Costo es obligatorio'),
    stock_id: Yup.number().required('Stock ID es obligatorio'),
    marca_id: Yup.number().required('Marca ID es obligatorio'),
    activo: Yup.number().oneOf([0, 1], 'Activo debe ser 0 o 1').required('Activo es obligatorio'),
    });

  // Valores iniciales usando el objeto equipo
    const initialValues = {
    nombre: equipo.nombre || '',
    modelo_id: equipo.modelo_id || '',
    categoria_id: equipo.categoria_id || '',
    costo: equipo.costo || '',
    stock_id: equipo.stock_id || '',
    marca_id: equipo.marca_id || '',
    activo: equipo.activo || 1,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
    try {
        const response = await fetch('http://localhost:5000/equipos/actualizar', {
        method: 'PUT',
        headers: {
            'Authorization': ` ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: equipo.id, ...values }),
        });

        if (response.ok) {
        const updatedEquipo = await response.json();
        if (onUpdate) onUpdate(updatedEquipo);
        } else {
        const errorData = await response.json();
        console.error('Error al actualizar el equipo:', errorData);
        }
    } catch (error) {
        console.error('Error de red:', error);
    } finally {
        setSubmitting(false);
    }
    };

    return (
    <div>
        <h2>Editar Equipo</h2>
        <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true} // Permite que los valores iniciales se actualicen cuando cambia 'equipo'
        >
        {({ errors, touched, isSubmitting }) => (
            <Form>
            <div>
                <label>Nombre del Equipo:</label>
                <Field name="nombre" type="text" />
                {errors.nombre && touched.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
            </div>

            <div>
                <label>Modelo ID:</label>
                <Field name="modelo_id" type="number" />
                {errors.modelo_id && touched.modelo_id && <div style={{ color: 'red' }}>{errors.modelo_id}</div>}
            </div>

            <div>
                <label>Categoría ID:</label>
                <Field name="categoria_id" type="number" />
                {errors.categoria_id && touched.categoria_id && <div style={{ color: 'red' }}>{errors.categoria_id}</div>}
            </div>

            <div>
                <label>Costo:</label>
                <Field name="costo" type="number" />
                {errors.costo && touched.costo && <div style={{ color: 'red' }}>{errors.costo}</div>}
            </div>

            <div>
                <label>Stock ID:</label>
                <Field name="stock_id" type="number" />
                {errors.stock_id && touched.stock_id && <div style={{ color: 'red' }}>{errors.stock_id}</div>}
            </div>

            <div>
                <label>Marca ID:</label>
                <Field name="marca_id" type="number" />
                {errors.marca_id && touched.marca_id && <div style={{ color: 'red' }}>{errors.marca_id}</div>}
            </div>

            <div>
                <label>Activo:</label>
                <Field name="activo" type="number" />
                {errors.activo && touched.activo && <div style={{ color: 'red' }}>{errors.activo}</div>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Actualizando...' : 'Actualizar Equipo'}
            </button>
            </Form>
        )}
        </Formik>
    </div>
    );
};

export default EditEquipoForm;