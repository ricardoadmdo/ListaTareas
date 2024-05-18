import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image1 from '../../images/fondo/image1.jpg';
import Swal from 'sweetalert2';
import Axios from 'axios';

export const RegisterScreen = () => {
	const [nombre, setNombre] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword1, setShowPassword1] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const showConfirm = () => {
		Swal.fire({
			title: 'Usuario Registrado con éxito',
			text: 'Por favor Inicie Sesión',
			icon: 'success',
		});
	};
	const handleRegister = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			Axios.post('http://localhost:8080/api/auth/register', {
				nombre: nombre,
				password: password,
				correo: email,
				rol: 'USER_ROLE',
			})
				.then(() => {
					setNombre('');
					setPassword('');
					setEmail('');
					showConfirm();
					navigate('/');
				})
				.catch((error) => {
					if (error.response && error.response.data && error.response.data.msg) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: error.response.data.msg,
						});
					} else {
						Swal.fire({
							icon: 'warning',
							title: 'Contraseña no valida',
							text: 'La contraseña debe tener al menos 8 caracteres.',
						});
					}
				});
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Las contraseñas no coinciden',
			});
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	const togglePasswordVisibility1 = () => {
		setShowPassword1(!showPassword1);
	};

	return (
		<div className='container d-flex justify-content-center align-items-center vh-100'>
			<div className='background' style={{ backgroundImage: `url(${image1})` }}></div>
			<div className='card shadow-lg animate__animated animate__fadeIn' style={{ width: '22rem' }}>
				<div className='card-body'>
					<h3 className='card-title text-center'>Necesitas una cuenta para continuar!</h3>
					<h2 className='h4 mb-4 text-center'>Regístrate</h2>
					<form onSubmit={(e) => handleRegister(e)}>
						<div className='mb-3'>
							<label htmlFor='name' className='form-label'>
								Su nombre completo:
							</label>
							<input
								id='name'
								type='text'
								className='form-control'
								onChange={(event) => {
									setNombre(event.target.value);
								}}
								value={nombre}
								placeholder='Nombre Completo'
								required
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='email' className='form-label'>
								Correo electrónico:
							</label>
							<input
								id='email'
								type='email'
								className='form-control'
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								value={email}
								placeholder='Correo electrónico'
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
									placeholder='Al menos 6 caracteres'
									required
								/>
								<FontAwesomeIcon
									className='fa position-absolute top-50 end-0 translate-middle-y me-3'
									icon={showPassword ? faEyeSlash : faEye}
									onClick={togglePasswordVisibility}
								/>
							</div>
						</div>
						<div className='mb-3 position-relative'>
							<input
								id='confirmPassword'
								type={showPassword1 ? 'text' : 'password'}
								className='form-control'
								onChange={(event) => {
									setConfirmPassword(event.target.value);
								}}
								value={confirmPassword}
								placeholder='Introduzca su contraseña otra vez'
								required
							/>
							<FontAwesomeIcon
								className='fa position-absolute top-50 end-0 translate-middle-y me-3'
								icon={showPassword1 ? faEyeSlash : faEye}
								onClick={togglePasswordVisibility1}
							/>
						</div>
						<button className='btn btn-success w-100' type='submit'>
							Registrarse
						</button>
						<Link to='/' className='d-block text-center mt-3'>
							¿Ya tienes una cuenta? Inicia Sesión aquí
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};
