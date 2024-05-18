import { useContext } from 'react';
import { AuthContext } from '../auth/authContext.jsx';
import { Navigate, useLocation } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	return user.logged && user.rol === 'ADMIN_ROLE' ? children : <Navigate to='/' state={{ from: location }} replace />;
};
