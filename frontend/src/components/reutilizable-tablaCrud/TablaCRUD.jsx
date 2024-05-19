import PropTypes from 'prop-types';

const TablaCRUD = ({
	data,
	onAdd,
	columns,
	onEdit,
	onDelete,
	title,
	modalTitle,
	validate,
	operationMode,
	setOperationMode,
	formFields,
	formState,
	setFormState,
}) => {
	// Funciones para manejar eventos generales
	const handleAdd = () => {
		// Reinicia el estado del formulario para un nuevo usuario
		setFormState({
			nombre: '',
			password: '',
			correo: '',
			rol: '',
		});
		// Abre el modal en modo de creación
		setOperationMode(1); // Modo 'crear'
		onAdd();
	};

	const handleEdit = (item) => {
		// Actualiza el estado del formulario con los datos del usuario que se va a editar
		setFormState({
			nombre: item.nombre,
			password: '', // La contraseña no se carga por razones de seguridad
			correo: item.correo,
			rol: item.rol,
		});
		// Abre el modal en modo de edición
		setOperationMode(2); // Modo 'editar'
		onEdit(item);
	};

	const handleDelete = (item) => onDelete(item);

	const handleChange = (name, value) => {
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className='container-fluid'>
			<div className='row mt-3'>
				<div className='col-md-4 offset-md-4'>
					<div className='d-grid mx-auto'>
						<button onClick={handleAdd} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modal'>
							<i className='fa-solid fa-circle-plus'></i> {modalTitle}
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
									{columns.map((column, index) => (
										<th key={index}>{column.header}</th>
									))}
								</tr>
							</thead>
							<tbody className='table-group-divider'>
								{data.map((item) => (
									<tr key={item.uid}>
										{columns.map((column) => (
											<td key={column.accessor}>
												{' '}
												{column.accessor === 'estado'
													? item[column.accessor]
														? 'Completada'
														: 'Pendiente'
													: item[column.accessor]}
											</td>
										))}
										<td>
											<button
												type='button'
												onClick={() => handleEdit(item)}
												className='btn btn-warning'
												data-bs-toggle='modal'
												data-bs-target='#modal'
											>
												<i className='fa fa-edit'></i>
												Editar
											</button>
											<span style={{ marginRight: '0px' }}></span>
											<button type='button' onClick={() => handleDelete(item)} className='btn btn-danger'>
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
			{/* Modal para añadir/editar elementos */}
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
							<form id='Form' onSubmit={(event) => validate(event, formState)}>
								{formFields.map((field) => {
									// Si el campo es 'password' y estamos en modo 'editar', no se renderiza
									if (field.name === 'password' && operationMode === 2) {
										return null;
									}

									// Si el campo es de tipo 'select', renderiza un elemento select
									if (field.type === 'select') {
										// Aquí se maneja el caso especial para el campo 'estado'
										if (field.name === 'estado') {
											return (
												<div className='input-group mb-3' key={field.name}>
													<span className='input-group-text'>{field.label}:</span>
													<select
														defaultValue={formState[field.name] ? 'Completada' : 'Pendiente'}
														className='form-control'
														onChange={(event) => handleChange(field.name, event.target.value === 'Completada')}
													>
														<option value='Completada'>Completada</option>
														<option value='Pendiente'>Pendiente</option>
													</select>
												</div>
											);
										}
										// Renderiza un select normal para otros campos
										return (
											<div className='input-group mb-3' key={field.name}>
												<span className='input-group-text'>{field.label}:</span>
												<select
													defaultValue={formState[field.name]}
													className='form-control'
													onChange={(event) => handleChange(field.name, event.target.value)}
												>
													{field.options.map((option) => (
														<option key={option.value} value={option.value}>
															{option.label}
														</option>
													))}
												</select>
											</div>
										);
									}

									// Para otros tipos de campos, renderiza un input
									return (
										<div className='input-group mb-3' key={field.name}>
											<span className='input-group-text'>{field.label}:</span>
											<input
												type={field.type}
												id={field.name}
												className='form-control'
												placeholder={field.placeholder}
												value={formState[field.name]}
												onChange={(event) => handleChange(field.name, event.target.value)}
											/>
										</div>
									);
								})}

								<div className='d-grid col-6 mx-auto'>
									<button type='submit' className='btn btn-success'>
										<i className='fa fa-floppy-disk'></i> Guardar
									</button>
								</div>
							</form>

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
	data: PropTypes.array.isRequired,
	onAdd: PropTypes.func.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			header: PropTypes.string.isRequired,
			accessor: PropTypes.string.isRequired,
		})
	).isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	modalTitle: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	validate: PropTypes.func.isRequired,
	operationMode: PropTypes.number.isRequired,
	setOperationMode: PropTypes.func.isRequired,
	formFields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			placeholder: PropTypes.string,
			type: PropTypes.string,
		})
	).isRequired,
	formState: PropTypes.shape({
		estado: PropTypes.bool,
	}),
	setFormState: PropTypes.func.isRequired,
};

export default TablaCRUD;
