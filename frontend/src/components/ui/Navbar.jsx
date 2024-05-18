import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext.jsx';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { types } from '../../types/types.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faBoxOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
export const Navbar = () => {
	const { user, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: types.logout });
		navigate('/', { replace: true });
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container-fluid'>
				<NavLink className='navbar-brand' to='/'>
					Mi Aplicación
				</NavLink>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/tareas'>
								<FontAwesomeIcon icon={faShoppingCart} /> Tareas
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/tarea'>
								<FontAwesomeIcon icon={faBoxOpen} /> Gestionar Tareas
							</NavLink>
						</li>
						{user.rol === 'ADMIN_ROLE' && (
							<li className='nav-item'>
								<NavLink className='nav-link' to='/usuarios'>
									<FontAwesomeIcon icon={faUser} /> Gestionar Usuarios
								</NavLink>
							</li>
						)}
					</ul>
					<span className='navbar-text'>Bienvenido {user.nombre}</span>
					<button className='btn btn-outline-danger ms-2' onClick={handleLogout}>
						Cerrar Sesión <FontAwesomeIcon icon={faSignOutAlt} />
					</button>
				</div>
			</div>
		</nav>
	);
};
