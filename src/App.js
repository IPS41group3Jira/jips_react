import { useState, useEffect, createContext } from 'react';

import './App.css';
import Main from './pages/Main/Main';

import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';

import { Routes, Route } from 'react-router-dom';
import Users from "./pages/Users/Users";
import useAuth from './Hooks/User';
import Projects from "./pages/Projects/Projects";

export const UserContext = createContext(null);

function App() {

	const { signIn, signUp, User } = useAuth();

	return (
		<UserContext.Provider value={{ signIn, signUp, User }}>
			<div className="App">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/projects" element={<Projects />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;
