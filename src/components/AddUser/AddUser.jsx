import './AddUser.css';
import {Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import TaskInfo from "../TaskInfo/TaskInfo";
import {useState} from "react";
import Button from "../Button/Button";

export const AddUser = () => {
    const [tasks, setTask] = useState([
        {id: 1, title: "New task", count: 3},
        {id: 2, title: "New task", count: 3},
        {id: 3, title: "New task", count: 3},
        {id: 3, title: "New task", count: 3},
    ]);
    return (
        <>
            <div>
                <Form className="add_user_form">
                    <h3 className="form_title">Add new user</h3>
                    <Form.Group>
                        <Form.Label>User email</Form.Label>
                        <div>
                            <Input placeHolder="User email" className="add_user_input" />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select className="select__role" aria-label="Role">
                            <option value='1' >Role1</option>
                            <option value='2'>Role2</option>
                            <option value='3'>Role3</option>
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
                        <Button text="Save" />
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}