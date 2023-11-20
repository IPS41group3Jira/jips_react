import './AddUser.css';
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import TaskInfo from "../TaskInfo/TaskInfo";
import {useState} from "react";
import Button from "../Button/Button";
import {FiSearch} from "react-icons/fi";

export const AddUser = () => {
    const [newUser, setNewUser] = useState({
        id: "",
        role: "",
    })
    const [email, setEmail] = useState();

    const [users, setProject] = useState([
            {id: 1, email: "poli@gmail.com"},
            {id: 2, email: "bilk@gmail.com"},
    ]);
    const [tasks, setTask] = useState([
        {id: 1, title: "New task", count: 3},
        {id: 2, title: "New task", count: 3},
        {id: 3, title: "New task", count: 3},
        {id: 3, title: "New task", count: 3},
    ]);
    const saveUser = (e) => {
        e.preventDefault();
        const selectedUser = users.find(user => user.email === email)
        if (selectedUser){
            newUser.id = selectedUser.id
        }
        console.log(newUser)
    }
    const onChangeSelectRole = (e) => {
        setNewUser(prevUser => ({
            ...prevUser,
            role: e.target.value
        }));
    }
    const handleInputChange = ((value) => {
        setEmail(value)
    })
    return (
        <>
            <div>
                <Form className="add_user_form" onSubmit={saveUser}>
                    <h3 className="form_title">Add new user</h3>
                    <Form.Group>
                        <Form.Label>User email</Form.Label>
                        <div className="add_user_form-input-group">
                            <Input placeHolder="User email" className="add_user_input"
                                   value={email}
                                   onChange={(e) => handleInputChange(e.target.value)}
                            />
                            <FiSearch className="icon-search" />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select className="select__role" aria-label="Role" onChange={onChangeSelectRole}>
                            <option value="1" >Participant</option>
                            <option value="2">Manager</option>
                            <option value="3">Owner</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <label>Assign tasks</label>
                        <div className="tasks-box">
                            {tasks.map((item) => (
                                <div className="box_item">
                                    <Form.Check type="checkbox" className="item_checkbox" id={item.id}></Form.Check>
                                    <TaskInfo
                                        title={item.title}
                                        commentsCount={item.count}
                                        createdTime="11 hours"/>
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="add_user_form__btn">
                        <Button text="Save" type="submit"/>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}