import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import TablaCRUD from '../reutilizable-tablaCrud/TablaCRUD.jsx';
import { AuthContext } from '../../auth/authContext.jsx';

export const CRUDTareas = () => {
	const [id, setId] = useState('');
	const [formState, setFormState] = useState({
		nombre: '',
		description: '',
		estado: false,
	});
	const [operationMode, setOperationMode] = useState(1);
	const [tareasList, setTareas] = useState([]);
	const [title, setTitle] = useState('');
	const { user } = useContext(AuthContext);

	const limpiarCampos = () => {
		setFormState({
			nombre: '',
			description: '',
			estado: false,
		});
	};
	const addTarea = () => {
		Axios.post('http://localhost:8080/api/tareas', formState)
			.then(() => {
				getTareas();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>La tarea <strong>' + formState.nombre + '</strong> fue registrada con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text:
						JSON.parse(JSON.stringify(error)).message === 'Network Error'
							? 'Intente mas tarde'
							: JSON.parse(JSON.stringify(error)).message,
				});
			});
	};

	const updateTarea = () => {
		Axios.put(`http://localhost:8080/api/tareas/${id}`, formState)
			.then(() => {
				getTareas();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitoso!!!</strong>',
					html: '<i>La tarea <strong>' + formState.nombre + '</strong> fue actualizada con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text:
						JSON.parse(JSON.stringify(error)).message === 'Network Error'
							? 'Intente mas tarde'
							: JSON.parse(JSON.stringify(error)).message,
				});
			});
	};

	const deleteTarea = (val) => {
		Swal.fire({
			title: 'Confirmar eliminado?',
			html: '<i>Realmente desea eliminar a <strong>' + val.nombre + '</strong>?</i>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminarlo!',
		}).then((result) => {
			if (result.isConfirmed) {
				Axios.delete(`http://localhost:8080/api/tareas/${val.uid}`)
					.then(() => {
						getTareas();
						limpiarCampos();
						Swal.fire({
							icon: 'success',
							title: 'La tarea ' + val.nombre + ' fue eliminado.',
							showConfirmButton: false,
							timer: 2000,
						});
					})
					.catch(function (error) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'No se logro eliminar la tarea!',
							footer:
								JSON.parse(JSON.stringify(error)).message === 'Network Error'
									? 'Intente mas tarde'
									: JSON.parse(JSON.stringify(error)).message,
						});
					});
			}
		});
	};

	useEffect(() => {
		getTareas();
	});

	const getTareas = () => {
		Axios.get('http://localhost:8080/api/tareas')
			.then((response) => {
				const tareasDelUsuario = response.data.tareas.filter((tarea) => tarea.userEmail === user.correo);
				setTareas(tareasDelUsuario);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const validar = (event) => {
		event.preventDefault();
		const { nombre, description } = formState;
		if (nombre.trim() === '' || description.trim() === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operationMode === 1) {
				addTarea();
			}

			if (operationMode === 2) {
				updateTarea();
			}

			document.getElementById('btnCerrar').click();
			getTareas();
		}
	};

	const openModal = (op, tarea) => {
		const estadoBooleano = op === 2 ? tarea.estado === 'Completada' : false;
		// Reinicia el estado del formulario para un nuevo usuario o carga los datos para editar
		setFormState({
			nombre: op === 2 ? tarea.nombre : '',
			description: op === 2 ? tarea.description : '',
			estado: estadoBooleano,
		});

		// Establece el modo de operación y el título del modal
		setOperationMode(op);
		setTitle(op === 1 ? 'Registrar Tarea' : 'Editar Tarea');

		// Si es modo de edición, establece el ID
		if (op === 2) {
			setId(tarea.uid);
		} else {
			setId('');
		}

		// Enfoca el primer campo del formulario después de un breve retraso
		window.setTimeout(() => {
			document.getElementById('nombre').focus();
		}, 500);
	};

	return (
		<>
			<TablaCRUD
				data={tareasList}
				onAdd={() => openModal(1)}
				columns={[
					{ header: 'ID', accessor: 'uid' },
					{ header: 'Nombre', accessor: 'nombre' },
					{ header: 'Descripción', accessor: 'description' },
					{ header: 'Estado', accessor: 'estado' },
				]}
				onEdit={(tarea) => openModal(2, tarea)}
				onDelete={deleteTarea}
				title={title}
				modalTitle='Añadir nueva Tarea'
				validate={validar}
				operationMode={operationMode}
				setOperationMode={setOperationMode}
				formFields={[
					{ name: 'nombre', label: 'Nombre', placeholder: 'Ingrese un nombre', type: 'text' },
					{ name: 'description', label: 'Password', placeholder: 'Ingrese un password', type: 'password' },
					{
						name: 'estado',
						label: 'Estado',
						type: 'select',
						options: [
							{ value: true, label: true },
							{ value: false, label: false },
						],
					},
				]}
				formState={formState}
				setFormState={setFormState}
			/>
		</>
	);
};
