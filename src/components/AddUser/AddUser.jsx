import './AddUser.css';
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import TaskInfo from "../TaskInfo/TaskInfo";
import {useEffect, useState} from "react";
import Button from "../Button/Button";
import {FiSearch} from "react-icons/fi";

export const AddUser = ({tasks, userTask, setUserList, setUserTask}) => {
    const [newUser, setNewUser] = useState({
        id: "",
        role: "",
        tasks : [],
    })
    const [indexList, setIndexList] = useState([])
    const [email, setEmail] = useState();
    const [freeTask, setFreTask] = useState( tasks.filter(task => task.assigneeId === "" || task.assigneeId === null))

    const [users, setProject] = useState([
        {id: 1, email: "poli@gmail.com"},
        {id: 2, email: "bilk@gmail.com"},
    ]);

    const handlerTaskSelection = (index) => {
        const isIndexSelected = indexList.includes(index);
        if (isIndexSelected) {
            setIndexList((prevList) => prevList.filter((selectedIndex) => selectedIndex !== index));
        }else {
            setIndexList((prevList) => [...prevList, index])
        }
        console.log(indexList)
    }
    const saveUser = (e) => {
        e.preventDefault();
        const selectedUser = users.find(user => user.email === email)
        if (selectedUser) {
            newUser.id = selectedUser.id
        }
        for (let i = 0; i >= indexList.length; i++) {
            setNewUser(prevUser => ({
                ...prevUser,
                tasks: [...prevUser.tasks, freeTask[indexList[i]]]
            }))
        }
        console.log(newUser)
        console.log("index ", indexList)
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
                            <FiSearch className="icon-search"/>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select className="select__role" aria-label="Role" onChange={onChangeSelectRole}>
                            <option value="1">Participant</option>
                            <option value="2">Manager</option>
                            <option value="3">Owner</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <label>Assign tasks</label>
                        <div className="tasks-box">
                            {freeTask.map((item, index) => (
                                <div className="box_item">
                                    <Form.Check type="checkbox" className="item_checkbox"
                                                id={index}
                                                onChange={(e) => handlerTaskSelection(index)}
                                                // checked={indexList.includes(index)}
                                    ></Form.Check>
                                    <TaskInfo
                                        title={item.name}
                                        commentsCount={index}
                                        createdTime="11 hours"/>
                                </div>

                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="add_user_form__btn">
                        <Button text="Save" type="submit" />
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}