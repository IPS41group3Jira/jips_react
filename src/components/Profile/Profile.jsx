import './Profile.css'
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Button from "../Button/Button";
import {useContext, useState} from "react";
import {UserContext} from "../../App";
import useAuth from "../../Hooks/User";

export default function Profile({closeModal}) {
    const {User} = useContext(UserContext)
    const {updateUser} = useAuth();
    const [user, setUser] = useState( () => {
        if (User) {
            return {
                firstName : User.firstName,
                lastName: User.lastName,
            }
        }else {
            return {
                firstName : "",
                lastName: "",
            }
        }
    })

    const saveUser = () => {
        if (User){
            updateUser(user.firstName, user.lastName, User.id).then(() => {
                closeModal();
            })
        }
    }
    const handleInputChange = ((fieldName, value) => {
        setUser(prevUser => ({
            ...prevUser,
            [fieldName]: value
        }))
    })

    return (
        <>
            <div>
                <Form className="profile-form" onSubmit={saveUser}>
                    <label className="profile-title">Profile</label>
                    <Form.Group className='profile-group'>
                        <Form.Label>First Name</Form.Label>
                        <div><Input placeholder={"First Name"} className="profile-input"
                                    value={user.firstName}
                                    onChange={(e) => handleInputChange("firstName", e.target.value)}/></div>
                    </Form.Group>
                    <Form.Group className='profile-group'>
                        <Form.Label>Last Name</Form.Label>
                        <div ><Input placeholder={"Last Name"} className="profile-input"
                                     value={user.lastName}
                                     onChange={(e) => handleInputChange("lastName", e.target.value)}/></div>
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