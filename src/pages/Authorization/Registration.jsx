import './Authorization.css'
import {Container, Form} from "react-bootstrap";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function Registration() {
    return (
        <>
            <Container>
                <div  className="authorization">
                    <label>Registration form</label>
                    <Form className="authorization-form" name="register-form">
                        <Form.Group >
                            <Form.Label>Login</Form.Label>
                            <Input />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Input />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>First name</Form.Label>
                            <Input />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Last name</Form.Label>
                            <Input />
                        </Form.Group>

                        <Button text="Submit" />
                    </Form>
                </div>
            </Container>
        </>
    );
};