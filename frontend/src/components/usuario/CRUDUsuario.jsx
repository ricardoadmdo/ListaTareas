import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import TablaCRUD from '../reutilizables/TablaCRUD';
import { AuthContext } from '../../auth/authContext.jsx';

export const CRUDUsuario = () => {
	const [nombre, setNombre] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [rol, setRol] = useState('USER_ROLE');
	const [id, setId] = useState('');
	const [operation, setOperation] = useState(1);
	const [usuariosList, setUsuarios] = useState([]);
	const [title, setTitle] = useState('');
	const { user } = useContext(AuthContext);

	const limpiarCampos = () => {
		setNombre('');
		setPassword('');
		setEmail('');
		setRol('');
		setId('');
	};

	const add = () => {
		Axios.post('http://localhost:8080/api/usuarios', {
			nombre: nombre,
			password: password,
			correo: email,
			rol: rol,
		})
			.then(() => {
				getUsuarios();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Registro exitoso!!!</strong>',
					html: '<i>El usuario <strong>' + nombre + '</strong> fue registrado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch((error) => {
				if (error.response) {
					Swal.fire({
						icon: 'error',
						title: 'Error al agregar un usuario',
						text: error.response.data.error,
					});
				}
			});
	};

	const update = () => {
		Axios.put('http://localhost:8080/api/usuarios', {
			id: id,
			nombre: nombre,
			email: email,
			rol: rol,
		})
			.then(() => {
				getUsuarios();
				limpiarCampos();
				Swal.fire({
					title: '<strong>Actualización exitosa!!!</strong>',
					html: '<i>El usuario <strong>' + nombre + '</strong> fue actualizado con éxito</i>',
					icon: 'success',
					timer: 3000,
				});
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.msg,
				});
			});
	};

	const deleteUser = (val) => {
		Swal.fire({
			title: 'Confirmar eliminado?',
			html: '<i>Realmente desea eliminar a <strong>' + val.nombre + '</strong>?</i>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminarlo!',
		})
			.then((result) => {
				if (result.isConfirmed) {
					Axios.delete(`http://localhost:8080/api/usuarios/${val.uid}`, {
						headers: {
							'x-token': `${user.token}`,
						},
					}).then(() => {
						getUsuarios();
						limpiarCampos();
						Swal.fire({
							icon: 'success',
							title: val.nombre + ' fue eliminado.',
							showConfirmButton: false,
							timer: 2000,
						});
					});
				}
			})
			.catch(function (error) {
				console.log(error);
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.msg,
				});
			});
	};

	useEffect(() => {
		getUsuarios();
	}, []);

	const getUsuarios = () => {
		Axios.get('http://localhost:8080/api/usuarios')
			.then((response) => {
				setUsuarios(response.data.usuarios);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const validar = (event) => {
		event.preventDefault();

		if (nombre.trim() === '' || email.trim() === '') {
			Swal.fire({
				icon: 'error',
				title: 'Campos Vacíos',
				text: 'Todos los campos son obligatorios',
			});
		} else {
			if (operation === 1) {
				if (password.length >= 6) {
					add();
				} else {
					Swal.fire({
						icon: 'error',
						title: 'Contraseña no válida',
						text: 'La contraseña tiene que tener 6 o más caracteres',
					});
				}
			}

			if (operation === 2) {
				update();
			}

			document.getElementById('btnCerrar').click();
			getUsuarios();
		}
	};

	const openModal = (op, id, nombre, email, rol) => {
		setId('');
		setNombre('');
		setEmail('');
		setOperation(op);
		if (op === 1) {
			setTitle('Registrar Usuario');
		} else if (op === 2) {
			setId(id);
			setTitle('Editar Usuario');
			setNombre(nombre);
			setEmail(email);
			setRol(rol);
		}
		window.setTimeout(function () {
			document.getElementById('nombre').focus();
		}, 500);
	};

	return (
		<>
			<TablaCRUD
				arrayList={usuariosList}
				titleCrear='Añadir nuevo Usuario'
				columnas={['ID', 'Nombre', 'Correo Electrónico', 'Rol', 'Acciones']}
				values={[nombre, password, email, rol]}
				setValues={[setNombre, setEmail, setPassword, setRol]}
				openModal={openModal}
				deleteItem={deleteUser}
				title={title}
				validar={validar}
				operation={operation}
			/>
		</>
	);
};
