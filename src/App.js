import './App.css';
import Main from './pages/Main/Main';

import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';

import { Routes, Route } from 'react-router-dom';
import Users from "./pages/Users/Users";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration /> } />
				<Route path="/users" element={<Users />} />
			</Routes>
		</div>
	);
}

export default App;
