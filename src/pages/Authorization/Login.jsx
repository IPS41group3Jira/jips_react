import './Authorization.css'
import { Container, Form } from "react-bootstrap";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
export default function Login() {
    return (
        <>
            <Container>
                <div className="authorization">
                    <label>Authorization form</label>
                    <Form className="authorization-form" name="login-form">
                        <Form.Group >
                            <Form.Label>Login</Form.Label>
                            <Input />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Input />
                        </Form.Group>
                        <Button text="Submit" />
                    </Form>
                </div>
            </Container>
        </>
    );
};