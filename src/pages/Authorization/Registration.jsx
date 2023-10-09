import './Authorization.css'
import {Container, Form} from "react-bootstrap";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
export default function Registration() {
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