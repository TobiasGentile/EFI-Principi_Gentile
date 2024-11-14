import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const CreateEquipo = ({ onCreate }) => {
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

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
        const response = await fetch('http://localhost:5000/equipos/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,       },
        body: JSON.stringify(values),
        });

        if (!response.ok) {
        const errorData = await response.json();
        console.error('Error al crear equipo:', errorData);
        return;
        }

        const newEquipo = await response.json();
        if (onCreate) onCreate(newEquipo);
        resetForm();
    } catch (error) {
        console.error('Error de red:', error);
    } finally {
        setSubmitting(false);
    }
    };

    return (
    <div>
        <h2>Crear Equipo</h2>
        <Formik
        initialValues={{
            nombre: '',
            modelo_id: '',
            categoria_id: '',
            costo: '',
            stock_id: '',
            marca_id: '',
            activo: 1,
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
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
                {isSubmitting ? 'Creando...' : 'Crear Equipo'}
            </button>
            </Form>
        )}
        </Formik>
    </div>
    );
};