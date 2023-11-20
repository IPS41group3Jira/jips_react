import './Profile.css'
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Button from "../Button/Button";

export default function Profile() {

    return (
        <>
            <div>
                <Form className="profile-form">
                    <label className="profile-title">Profile</label>
                    <Form.Group className='profile-group'>
                        <Form.Label>First Name</Form.Label>
                        <div><Input placeholder={"First Name"} className="profile-input"/></div>
                    </Form.Group>
                    <Form.Group className='profile-group'>
                        <Form.Label>Last Name</Form.Label>
                        <div ><Input placeholder={"Last Name"} className="profile-input"/></div>
                    </Form.Group>
                    <Form.Group className='profile-group'>
                        <Form.Label>Email</Form.Label>
                        <div><span>Email</span></div>
                    </Form.Group>
                    <div className="profile-btn">
                        <Button text={"Save"} />
                    </div>
                </Form>
            </div>
        </>
    )
}