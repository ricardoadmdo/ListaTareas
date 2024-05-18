import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext.jsx';

export const CRUDTareas = () => {
	const [id, setId] = useState('');
	const [estado, setEstado] = useState(false);
	const [nombre, setNombre] = useState('');
	const [description, setDescription] = useState('');
	const [operation, setOperation] = useState(1);
	const [tareasList, setTareas] = useState([]);
	const [title, setTitle] = useState('');
	const { user } = useContext(AuthContext);
	const userEmail = user.correo;

	const limpiarCampos = () => {
		setNombre('');
		setDescription('');
		setId('');
	};
	const addTarea = () => {
		Axios.post('http://localhost:8080/api/tareas', {
			nombre: nombre,
			description: description,
			estado: estado,
			userEmail: userEmail,
		})
			.then(() => {
				getTareas();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>La tarea <strong>' + nombre + '</strong> fue registrada con éxito</i>',
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
		Axios.put('http://localhost:8080/api/tareas', {
			id: id,
			nombre: nombre,
			description: description,
			estado: estado,
		})
			.then(() => {
				getTareas();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitoso!!!</strong>',
					html: '<i>La tarea <strong>' + nombre + '</strong> fue actualizada con éxito</i>',
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
		if (nombre.trim() === '' || description.trim() === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operation === 1) {
				addTarea();
			}

			if (operation === 2) {
				updateTarea();
			}

			document.getElementById('btnCerrar').click();
			getTareas();
		}
	};

	const openModal = (op, id, nombre, description, estado) => {
		setOperation(op);
		if (op === 1) {
			setId('');
			setNombre('');
			setDescription('');
			setEstado('');
			setTitle('Registrar Tarea');
		} else if (op === 2) {
			setTitle('Editar Tarea');
			setId(id);
			setNombre(nombre);
			setDescription(description);
			setEstado(estado);
		}
		window.setTimeout(function () {
			document.getElementById('nombre').focus();
		}, 500);
	};

	const handleEstado = (event) => {
		setEstado(event.target.value === 'Completada');
	};

	return (
		<div className='container-fluid'>
			<div className='row mt-3 animate__animated animate__fadeIn'>
				<div className='col-md-4 offset-md-4'>
					<div className='d-grid mx-auto'>
						<button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalTareas'>
							<i className='fa-solid fa-circle-plus'></i> Añadir nueva Tarea
						</button>
					</div>
				</div>
				<div className='row mt-3 '>
					<div className='card-body'>
						<div className='table-responsive'>
							<table className='table table-bordered'>
								<thead>
									<tr>
										<th>ID</th>
										<th>Nombre</th>
										<th>Descripción</th>
										<th>Estado</th>
										<th>Acciones</th>
									</tr>
								</thead>
								<tbody className='table-group-divider'>
									{tareasList.map((val) => {
										return (
											<tr key={val.uid}>
												<td>{val.uid}</td>
												<td>{val.nombre}</td>
												<td>{val.description}</td>
												<td>{val.estado ? 'Completada' : 'Pendiente'} </td>

												<td>
													<button
														type='button'
														onClick={() => {
															openModal(2, val.uid, val.nombre, val.description, val.estado);
														}}
														className='btn btn-warning'
														data-bs-toggle='modal'
														data-bs-target='#modalTareas'
													>
														<i className='fas fa-edit'></i>
														Editar
													</button>
													<button
														type='button'
														onClick={() => {
															deleteTarea(val);
														}}
														className='btn btn-danger'
													>
														<i className='fas fa-trash'></i>
														Eliminar
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Modal --> */}
			<div id='modalTareas' className='modal fade animate__animated animate__fadeIn' aria-hidden='true'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<label className='h5'>{title}</label>
							<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'>
								{' '}
							</button>
						</div>
						<div className='modal-body'>
							<input type='hidden' id='id'></input>

							<form id='Form' onSubmit={validar}>
								<div className='input-group mb-3'>
									<span className='input-group-text'>Nombre:</span>
									<input
										type='text'
										id='nombre'
										className='form-control'
										placeholder='Ingrese un nombre'
										value={nombre}
										onChange={(event) => setNombre(event.target.value)}
									></input>
								</div>

								<div className='input-group mb-3'>
									<span className='input-group-text'>Descripción:</span>
									<input
										type='text'
										id='description'
										className='form-control'
										placeholder='Ingrese una description'
										value={description}
										onChange={(event) => setDescription(event.target.value)}
									></input>
								</div>

								<div className='input-group mb-3'>
									<span className='input-group-text'>Estado:</span>
									<select defaultValue={false} className='form-control' onChange={handleEstado}>
										<option>Pendiente</option>
										<option>Completada</option>
									</select>
								</div>
							</form>
							<div className='d-grid col-6 mx-auto'>
								<button type='submit' form='Form' className='btn btn-success'>
									<i className='fa fa-floppy-disk'></i> Guardar
								</button>
							</div>

							<div className='modal-footer'>
								<button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
									<i className='fa fa-times'></i> Cerrar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
