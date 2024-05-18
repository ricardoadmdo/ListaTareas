import { Navbar } from '../components/ui/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import { CRUDUsuario } from '../components/usuario/CRUDUsuario.jsx';
import { Tareas } from '../components/tareas/Tareas.jsx';
import { CRUDTareas } from '../components/tareas/CRUDTareas.jsx';
import { AdminRoute } from './AdminRoute.jsx';
import Footer from '../components/footer/Footer.jsx';
export const DashboardRoutes = () => {
	return (
		<>
			<Navbar />

			<Routes>
				<Route
					path='usuarios'
					element={
						<AdminRoute>
							<CRUDUsuario />{' '}
						</AdminRoute>
					}
				/>

				<Route path='/tareas' element={<Tareas />} />
				<Route path='tarea' element={<CRUDTareas />} />
			</Routes>
			<Footer />
		</>
	);
};
