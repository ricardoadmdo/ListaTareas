import { AuthProvider } from './auth/authContext.jsx';
import { AppRouter } from './routers/AppRouter.jsx';

import './App.css';

function App() {
	return (
		<AuthProvider>
			<AppRouter />
		</AuthProvider>
	);
}

export default App;
