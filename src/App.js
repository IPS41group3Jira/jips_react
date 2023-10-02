import './App.css';
import Main from './pages/Main/Main';

import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Main /> } />
			</Routes>
		</div>
	);
}

export default App;
