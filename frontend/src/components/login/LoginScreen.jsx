import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image1 from '../../images/fondo/image1.jpg';
import Swal from 'sweetalert2';
import Axios from 'axios';

export const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { dispatch } = useContext(AuthContext);

	const showErrorAlert = () => {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Usuario o contraseña incorrectos',
		});
	};

	const showConfirm = (nombre) => {
		Swal.fire({
			title: 'Bienvenido  <strong>' + nombre + '</strong>',
			text: 'Sesión iniciada correctamente',
			icon: 'success',
		});
	};

	const handleLogin = async (e, email, password) => {
		e.preventDefault();
		try {
			const response = await Axios.post('http://localhost:8080/api/auth/login', {
				correo: email,
				password: password,
			});
			const data = response.data;
			if (data.usuario.estado) {
				const action = {
					type: types.login,
					payload: {
						nombre: data.usuario.nombre,
						rol: data.usuario.rol,
						correo: data.usuario.correo,
						uid: data.usuario.uid,
						token: data.token,
					},
				};
				dispatch(action);

				const lastPath = localStorage.getItem('lastPath') || '/';
				navigate(lastPath, {
					replace: true,
				});
				showConfirm(data.usuario.nombre);
			} else {
				showErrorAlert();
			}
		} catch (error) {
			console.error('Error al iniciar sesión:', error);
			showErrorAlert();
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='container d-flex justify-content-center align-items-center vh-100'>
			<div className='background' style={{ backgroundImage: `url(${image1})` }}></div>
			<div className='card shadow-lg animate__animated animate__fadeIn' style={{ width: '22rem' }}>
				<div className='card-body'>
					<h3 className='card-title text-center'>¡Bienvenido Amigo!</h3>
					<h2 className='h4 mb-4 text-center'>Inicia Sesión</h2>
					<form onSubmit={(e) => handleLogin(e, email, password)}>
						<div className='mb-3'>
							<label htmlFor='email' className='form-label'>
								Su dirección de correo electrónico:
							</label>
							<input
								id='email'
								type='email'
								className='form-control'
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								value={email}
								placeholder='xxx@xxxx.com'
								required
							/>
						</div>
						<div className='mb-3 position-relative'>
							<label htmlFor='password' className='form-label'>
								Contraseña:
							</label>
							<div className='mb-3 position-relative'>
								<input
									id='password'
									type={showPassword ? 'text' : 'password'}
									className='form-control'
									onChange={(event) => {
										setPassword(event.target.value);
									}}
									value={password}
									placeholder='Contraseña'
									required
								/>
								<FontAwesomeIcon
									className='fa position-absolute top-50 end-0 translate-middle-y me-3'
									icon={showPassword ? faEyeSlash : faEye}
									onClick={togglePasswordVisibility}
									style={{ transform: 'translate(-90%, -40%)' }}
								/>
							</div>
						</div>
						<button className='btn btn-success w-100' type='submit'>
							Iniciar Sesión
						</button>
						<Link to='/register' className='d-block text-center mt-3'>
							¿No tienes una cuenta? Regístrate aquí
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};
