import './AddUser.css';
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import TaskInfo from "../TaskInfo/TaskInfo";
import {useContext, useState} from "react";
import Button from "../Button/Button";
import { FiSearch } from "react-icons/fi";
import { UserContext } from '../../App';
import rolesMap from "../../Hooks/Role";


export const AddUser = ({ tasks, addUser, setTasks, closeModal }) => {
    const { getUserByEmail } = useContext(UserContext);
    const [User, setUser] = useState(null);
    const [Role, setRole] = useState(1);

    const handlerTaskSelection = (task) => {
        task.assigneeId = task.assigneeId ? null : User.id;
        console.log(task)
    }
    const saveUser = (e) => {
        e.preventDefault();

        addUser(User);
        setTasks(tasks);

        console.log(User);
        console.log(tasks);

        closeModal();
    }
    const onChangeSelectRole = (e) => {
        const role = e.target.value;
        setUser({ ...User, role });
    }

    const handleUserEmailInput = (e) => {
        const email = e.target.value;
        if (email)
            getUserByEmail(email).then((res) => setUser({ ...res.data, role: 1 }));
        else
            setUser(null);
    };

    return (
        <>
            <div>
                <Form className="add_user_form" onSubmit={saveUser}>
                    <h3 className="form_title">Add new user</h3>
                    <Form.Group>
                        <Form.Label>User email</Form.Label>
                        <div className="add_user_form-input-group">
                            <Input placeholder="User email" className="add_user_input" value="" onBlur={handleUserEmailInput} />
                            <FiSearch className="icon-search"/>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select className="select__role" aria-label="Role" onChange={onChangeSelectRole}>
                            {Object.entries(rolesMap).map(([id, name]) => (
                                <option value={id} {...( Role == id ? 'selected' : '')}>{ name }</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <label>Assign tasks</label>
                        <div className="tasks-box">
                            {tasks.filter((task) => !task.assigneeId).map((task, index) => (
                                <div className="box_item" key = {index} >
                                    <Form.Check type="checkbox" className="item_checkbox" onChange={(e) => handlerTaskSelection(task)}
                                                // checked={indexList.includes(index)}
                                    ></Form.Check>
                                    <TaskInfo
                                        title={task.name}
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