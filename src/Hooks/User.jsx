import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth () { 
    const navigate = useNavigate();

    const [User, setUser] = useState(null);
    const [Projects, setProjects] = useState(null);
    
    const signIn = (email, password) => {
        return Axios.post('/user/login', { email, password }).then(resp => {
            localStorage.setItem('accessToken', resp.data);
            
            getUser();
        }).catch(console.log);
    };

    const getUser = (id = '') => {
        return Axios.get(`/user/${id}`).then(user => {
            setUser(user.data);
        }).catch(() => {
            navigate('/login');
        });
    }
    const getListProjects = () => {
        return Axios.get('/user/projects')
    }

    const signUp = (email, password, firstName, lastName) => {
        return Axios.post('/user/register', { email, password, firstName, lastName }).then(() => {
            signIn(email, password);
        }).catch(console.log);
    }

    return { signIn, signUp, User, getUser, getListProjects};
}