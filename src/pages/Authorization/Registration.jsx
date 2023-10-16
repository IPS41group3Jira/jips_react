import './Authorization.css'
import {Container, Form} from "react-bootstrap";
import Button from "../../components/Button/Button";
import {Link} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useState} from "react";

export default function Registration() {
    const [username, setUsername] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <Container>
                <div  className="authorization">
                    <label>Create an account</label>
                    <Form className="authorization-form" name="register-form">
                        <Form.Group >
                            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="authorization-input"/>
                        </Form.Group>

                        <Form.Group >
                            <input type="text" value={first_name} onChange={(e)=>setFirst_name(e.target.value)} placeholder="First name" className="authorization-input"/>
                        </Form.Group>

                        <Form.Group >
                            <input type="text" value={last_name} onChange={(e)=>setLast_name(e.target.value)} placeholder="Last name" className="authorization-input"/>
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
                        </Form.Group>
                        <label>Already have an account? <Link to="/login" className="authorization-link">Sign in</Link></label>
                        <Button text="Submit" />
                    </Form>
                </div>
            </Container>
        </>
    );
};