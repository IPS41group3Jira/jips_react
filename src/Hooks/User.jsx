import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth () { 

    const [User, setUser] = useState(null);
    
    const signIn = (email, password) => {
        return Axios.post('/user/login', { email, password }).then(resp => {
            localStorage.setItem('accessToken', resp.data);
            
            getUser();
        });
    };

    const getUser = (id = '') => {
        Axios.get(`/user/${id}`).then(user => {
            setUser(user.data);
        });
    }

    const signUp = (email, password, first_namme, last_name) => {
        return Axios.post('/user/register', { email, password, first_namme, last_name }).then(() => {
            logIn(email, password); 
        });
    }

    return { signIn, signUp, User };
}