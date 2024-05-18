import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from '../../auth/authContext.jsx';

export const Tareas = () => {
	const [tareasList, setTareas] = useState([]);
	const { user } = useContext(AuthContext);

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

	return (
		<div className='animate__animated animate__fadeIn'>
			<div className='row row-cols-1 row-cols-md-3 g-4'>
				{tareasList.map((val) => (
					<div key={val.uid} className='col'>
						<div className='card h-100 shadow-sm'>
							<div className='card-header'>
								<h5 className='my-0 fw-normal'>{val.nombre}</h5>
							</div>
							<div className='card-body'>
								<p className='card-text'>{val.description}</p>
								<p className='card-text'>
									<span className={`badge ${val.estado ? 'bg-success' : 'bg-danger'}`}>
										{val.estado ? 'Completada' : 'Pendiente'}
									</span>
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
