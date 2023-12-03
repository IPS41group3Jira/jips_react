import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

export default function useAuth () { 
    const navigate = useNavigate();

    const [User, setUser] = useState(null);
    const [Projects, setProjects] = useState(null);
    
    const signIn = (email, password) => {
        return Axios.post('/user/login', { email, password }).then(resp => {
            console.log(resp.data)
            localStorage.setItem('accessToken', resp.data);
            const decode = jwtDecode(resp.data);
            getUser(decode.userId);
        }).catch(console.log);
    };

    const getUser = (id = '') => {
        if (!id) {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
                return;
            }
            
            const decode = jwtDecode(token);
            id = decode?.userId;
        }

        return Axios.get(`/user/${id}`).then(user => {
            setUser(user.data);
        }).catch(() => {
            logOut();
        });
    }

    const getUserByEmail = (email) => {
        return Axios.get(`/user/email/${email}`);
    }

    const getListProjects = () => {
        return Axios.get('/user/projects')
    }
    const getListProjectsByUserId = (userId = '') => {
        return Axios.get(`/user/${userId}/projects`)
    }

    const signUp = (email, password, firstName, lastName) => {
        return Axios.post('/user/register', { email, password, firstName, lastName }).then(() => {
            signIn(email, password);
        }).catch(console.log);
    }

    const logOut = () => {
        localStorage.clear()
        console.log("storage cleared");
        setUser(null);
        navigate('/login');
    }
    const updateUser = (firstName, lastName, userId = '') => {
        return Axios.put(`user/${userId}`, {firstName, lastName})
    }

    const getUsersByFullName = (fullName = '') => {
        return Axios.get(`user/?like=${fullName}`);
    }

    return { signIn, signUp, User, getUser, getListProjects, logOut, getUserByEmail, updateUser, getUsersByFullName, getListProjectsByUserId};
}