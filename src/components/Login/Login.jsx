import './Login.css'
import {Container, Form} from "react-bootstrap";
import Input from "../Input/Input";
import Button from "../Button/Button";
export default function Login() {
    return(
        <Container>
            <div className="authorization">
                <h3>Authorization form</h3>
                <Form className="form">
                    <Form.Group >
                        <Form.Label>Login</Form.Label>
                        <div><Input /></div>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <div><Input /></div>
                    </Form.Group>
                    <Button text="Submit" />
                </Form>
            </div>
        </Container>
    )
}