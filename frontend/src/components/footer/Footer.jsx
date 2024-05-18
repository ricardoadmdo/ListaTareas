const Footer = () => {
	return (
		<footer className='bg-dark text-center text-white py-3' style={{ position: 'fixed', left: '0', bottom: '0', width: '100%' }}>
			<div className='container'>
				<span>Desarrollado por Ricardo Alejandro D´Escoubet Montes de Oca </span>
				<a className='text-decoration-none text-reset' href='https://github.com/ricardoadmdo' target='_blank' rel='noopener noreferrer'>
					- Visitar GitHub de Ricardo
				</a>
				<span> {new Date().getFullYear()}</span>
			</div>
		</footer>
	);
};

export default Footer;
