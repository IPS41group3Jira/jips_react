import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth () { 

    const [User, setUser] = useState(null);
    
    const logIn = (email, password) => {
        return Axios.post('/user/login', { email, password }).then(resp => {
            localStorage.setItem('accessToken', resp.data);
            
            Axios.get('/user/').then(user => {
                console.log(user);
                setUser(user.data);
            });
        });
    };

    return { logIn, User };
}