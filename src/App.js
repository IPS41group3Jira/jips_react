import { useState, useEffect, createContext } from 'react';

import './App.css';
import Main from './pages/Main/Main';

import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';

import { Routes, Route } from 'react-router-dom';
import Users from "./pages/Users/Users";
import useAuth from './Hooks/User';

export const UserContext = createContext(null);

function App() {

	const { logIn, User } = useAuth();

	return (
		<UserContext.Provider value={{ logIn, User }}>
			<div className="App">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/users" element={<Users />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;
