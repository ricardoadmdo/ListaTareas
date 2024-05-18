import PropTypes from 'prop-types';

const TablaCRUD = ({ arrayList, titleCrear, columnas, values, setValues, openModal, deleteItem, title, validar, operation }) => {
	return (
		<div className='container-fluid'>
			<div className='row mt-3'>
				<div className='col-md-4 offset-md-4'>
					<div className='d-grid mx-auto'>
						<button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modal'>
							<i className='fa-solid fa-circle-plus'></i> {titleCrear}
						</button>
					</div>
				</div>
			</div>

			<div className='row mt-3 animate__animated animate__fadeIn'>
				<div className='card-body'>
					<div className='table-responsive'>
						<table className='table table-bordered'>
							<thead>
								<tr>
									{columnas.map((columna, index) => (
										<th key={index}>{columna}</th>
									))}
								</tr>
							</thead>
							<tbody className='table-group-divider'>
								{arrayList.map((val) => (
									<tr key={val.uid}>
										<td>{val.uid}</td>
										<td>{val.nombre}</td>
										<td>{val.correo}</td>
										<td>{val.rol}</td>
										<td>
											<button
												type='button'
												onClick={() => {
													openModal(2, val.uid, val.nombre, val.correo, val.rol);
												}}
												className='btn btn-warning'
												data-bs-toggle='modal'
												data-bs-target='#modal'
											>
												<i className='fa fa-edit'></i>
												Editar
											</button>
											<span style={{ marginRight: '0px' }}></span>
											<button
												type='button'
												onClick={() => {
													deleteItem(val);
												}}
												className='btn btn-danger'
											>
												<i className='fa fa-trash'></i>
												Eliminar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className='modal fade animate__animated animate__fadeIn' id='modal' aria-hidden='true' aria-labelledby='exampleModalToggleLabel'>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<label className='modal-title h5'>{title}</label>
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
										value={values.nombre}
										onChange={(event) => setValues.setNombre(event.target.value)}
									></input>
								</div>
								<div className='input-group mb-3'>
									<span className='input-group-text'>Correo Electrónico:</span>
									<input
										type='email'
										id='email'
										className='form-control'
										placeholder='Ingrese un correo electrónico'
										value={values.email}
										onChange={(event) => setValues.setEmail(event.target.value)}
									></input>
								</div>

								{operation === 1 && (
									<div className='input-group mb-3'>
										<span className='input-group-text'>Contraseña:</span>
										<input
											type='password'
											id='password'
											className='form-control'
											placeholder='Ingrese una contraseña'
											value={values.password}
											onChange={(event) => setValues.setPassword(event.target.value)}
										></input>
									</div>
								)}
								<div className='input-group mb-3'>
									<span className='input-group-text'>Rol:</span>
									<select
										defaultValue='USER_ROLE'
										className='form-select'
										aria-label='Default select example'
										onChange={(event) => setValues.setRol(event.target.value)}
									>
										<option>USER_ROLE</option>
										<option>ADMIN_ROLE</option>
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

TablaCRUD.propTypes = {
	arrayList: PropTypes.array.isRequired,
	titleCrear: PropTypes.string.isRequired,
	columnas: PropTypes.array.isRequired,
	values: PropTypes.array.isRequired,
	setValues: PropTypes.array.isRequired,
	openModal: PropTypes.func.isRequired,
	deleteItem: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	validar: PropTypes.func.isRequired,
	operation: PropTypes.number.isRequired,
};

export default TablaCRUD;
