import './Profile.css'
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Button from "../Button/Button";
import {useContext} from "react";
import {UserContext} from "../../App";

export default function Profile() {
    const {User} = useContext(UserContext)

    return (
        <>
            <div>
                <Form className="profile-form">
                    <label className="profile-title">Profile</label>
                    <Form.Group className='profile-group'>
                        <Form.Label>First Name</Form.Label>
                        <div><Input placeholder={"First Name"} className="profile-input" value={User.firstName}/></div>
                    </Form.Group>
                    <Form.Group className='profile-group'>
                        <Form.Label>Last Name</Form.Label>
                        <div ><Input placeholder={"Last Name"} className="profile-input" value={User.lastName}/></div>
                    </Form.Group>
                    <Form.Group className='profile-group'>
                        <Form.Label>Email</Form.Label>
                        <div><span>{User.email}</span></div>
                    </Form.Group>
                    <div className="profile-btn">
                        <Button text={"Save"} />
                    </div>
                </Form>
            </div>
        </>
    )
}