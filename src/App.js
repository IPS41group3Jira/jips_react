import { useState, useEffect, createContext } from 'react';

import './App.css';
import Main from './pages/Main/Main';

import Login from './pages/Authorization/Login';
import Registration from './pages/Authorization/Registration';

import { Navigate, Routes, Route } from 'react-router-dom';
import Users from "./pages/Users/Users";
import useAuth from './Hooks/User';
import Projects from "./pages/Projects/Projects";

export const UserContext = createContext(null);

function App() {

	const { getUser, signIn, signUp, User, getUserByEmail, logOut, getUsersByFullName} = useAuth();

	useEffect(() => {
        if(!User) {
            getUser();
        }
    }, [User])

	return (
		<UserContext.Provider value={{ getUser, signIn, signUp, User, getUserByEmail, logOut, getUsersByFullName }}>
			<div className="App">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="/"         element={<Main />} />
					<Route path="/users"    element={<Users />} />
					<Route path="/projects" element={<Projects />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;
