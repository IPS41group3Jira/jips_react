import './Authorization.css'

import React, { useEffect, useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Container, Form } from "react-bootstrap";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";

export default function Registration() {
    const navigate = useNavigate();

    const { signUp, User } = useContext(UserContext);
    const { register, handleSubmit } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    useEffect(() => {
        if (User) {
            console.log(User);
            navigate('/');
        }
    }, [User])

    const onSubmit = (data, e) => {
        const { email, password, firstName, lastName } = data;
        signUp(email, password, firstName, lastName);
    };

    const onError = (errors, e) => {
        for(let [field, error] of Object.entries(errors)) {
            alert(`${field} is ${error.type}`);
            break;
        }
    };

    return (
        <>
            <Container className="d-flex justify-content-center">
                <div  className="authorization">
                    <label>Create an account</label>
                    <Form className="authorization-form" name="register-form" onSubmit={handleSubmit(onSubmit, onError)}>
                        <Form.Group >
                            <input type="text" placeholder="Username" className="authorization-input" { ...register('email', { required : true }) }/>
                        </Form.Group>

                        <Form.Group >
                            <input type="text" placeholder="First name" className="authorization-input" { ...register('lastName', { required : true }) }/>
                        </Form.Group>

                        <Form.Group >
                            <input type="text" placeholder="Last name" className="authorization-input" { ...register('firstName', { required : true }) }/>
                        </Form.Group>

                        <Form.Group className="password-group">
                            <input type={showPassword ? 'text' : "password"} placeholder="Password" className="authorization-input" { ...register('password', { required : true }) } />
                            {showPassword ? (
                                <FaEyeSlash onClick={togglePasswordVisibility} className="eye-icon"/>
                            ) : (
                                <FaEye onClick={togglePasswordVisibility} className="eye-icon"/>
                            )}
                        </Form.Group>
                        <label>Already have an account?
                            <Link to="/login" className="authorization-link">Sign in</Link>
                        </label>
                        <Button text="Submit" />
                    </Form>
                </div>
            </Container>
        </>
    );
};