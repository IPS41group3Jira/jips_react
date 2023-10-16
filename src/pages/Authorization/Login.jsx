import './Authorization.css'
import {Container, Form} from "react-bootstrap";
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";
import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <Container className=" d-flex justify-content-center">
                <div className="authorization">
                    <label>Log in</label>
                    <Form className="authorization-form" name="login-form">
                        <Form.Group>
                            <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className="authorization-input"/>
                        </Form.Group>
                        <Form.Group className="password-group">
                                <input
                                    type={showPassword ? 'text' : "password"}
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="authorization-input"/>
                                {showPassword ? (
                                    <FaEyeSlash onClick={togglePasswordVisibility} className="eye-icon"/>
                                ) : (
                                    <FaEye onClick={togglePasswordVisibility} className="eye-icon"/>
                                )}
                            <span>Forgot password?</span>
                            <Form.Check inline label="Remember me" type="checkbox" className="authorization-check"/>
                        </Form.Group>
                        <label>First time here? <Link to="/registration" className="authorization-link">Sign
                            up</Link></label>
                        <Button text="Submit"/>
                    </Form>
                </div>
            </Container>
        </>
    );
};