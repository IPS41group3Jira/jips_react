import './Authorization.css'
import React, { useEffect, useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Container, Form } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";

export default function Login() {
    const navigate = useNavigate();

    const { signIn, User } = useContext(UserContext);
    const { register, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if(User) {
            navigate('/');
        }
    }, [User])

    const onSubmit = (data, e) => {
        const { email, password } = data;
        signIn(email, password);
    };

    const onError = (errors, e) => {
        for(let [field, error] of Object.entries(errors)) {
            alert(`${field} is ${error.type}`);
            break;
        }
    };
    
    return (
        <>
            <Container className=" d-flex justify-content-center">
                <div className="authorization">
                    <label>Log in</label>
                    <Form className="authorization-form" name="login-form" onSubmit={handleSubmit(onSubmit, onError)}>
                        <Form.Group>
                            <input type="text" placeholder="Username" { ...register('email', { required : true }) } className="authorization-input"/>
                        </Form.Group>
                        <Form.Group className="password-group">
                                <input type={showPassword ? 'text' : "password"} placeholder="Password" { ...register('password', { required : true }) } className="authorization-input"/>
                                {showPassword ? (
                                    <FaEyeSlash onClick={togglePasswordVisibility} className="eye-icon"/>
                                ) : (
                                    <FaEye onClick={togglePasswordVisibility} className="eye-icon"/>
                                )}
                            <span>Forgot password?</span>
                            <Form.Check inline label="Remember me" type="checkbox" className="authorization-check"/>
                        </Form.Group>
                        <label>First time here?
                            <Link to="/registration" className="authorization-link">Signup</Link>
                        </label>
                        <Button text="Submit" />
                    </Form>
                </div>
            </Container>
        </>
    );
};