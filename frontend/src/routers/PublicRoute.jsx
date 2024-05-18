import { useContext } from 'react';
import { AuthContext } from '../auth/authContext.jsx';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
	const { user } = useContext(AuthContext);

	return user.logged ? <Navigate to='/tareas' /> : children;
};
