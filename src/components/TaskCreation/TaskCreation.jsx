import "./TaskCreation.css"
import {Container, Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Option from "../Controls/Select/Option";
import Select from "../Controls/Select/Select";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import DragDropFiles from "./DragDropFiles";
import Comments from "./Comments/Comments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function TaskCreation({ addTask, closeModal, newProject=true }) {
    const [status, setStatus] = useState();
    const [task, setTask] = useState({
        name: "",
        description: "",
        projectId: 3,
        creationDate: new Date(),
        dueDate: null,
        priority: "",
        assigneeId: "",
        status: "",

    });
    const comments = [{
        commentId: 1,
        creationDate: new Date(),
        text: "All is well",
        creatorName: "Den",
    }, {
        commentId: 1,
        creationDate: new Date(),
        text: "All is bad",
        creatorName: "Den",
    }]

    const [creationDate, setCreationDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());

    useEffect(() => {
        setTask({ ...task, creationDate, dueDate, status });
        console.log(task)
    }, [dueDate, creationDate, status]);

    const handleInputChange = ((fieldName, value) => {
        setTask(prevTask => ({
            ...prevTask,
            [fieldName]: value
        }))
    })
    const onChangeSelect = (value, label) => {
        setStatus(value);
    }

    const saveTask = (e) => {
        e.preventDefault();
        addTask(task);
        console.log("Task ", task)
        closeModal();
    }

    const users = ['Emily Smith'];

    function ListItem({title}) {
        return <li>{title}</li>
    }

    return (
        <>
            <div>
                <Form className="task-creation-form" onSubmit={saveTask}>
                    <Form.Group>
                        <Form.Label className="label">Task name</Form.Label>
                        <div>
                            <Input placeholder="Task name"
                                   value={task.name}
                                   onChange={(e) => handleInputChange("name", e.target.value)}
                            ></Input>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Task description</Form.Label>
                        <div>
                            <Textarea className={"task-description"}
                                      placeholder="Task description" rows="4"
                                      value={task.description}
                                      onChange={(e) => handleInputChange("description", e.target.value)}
                            ></Textarea>
                        </div>
                    </Form.Group>
                    <Form.Group className="task-group">
                        <Select labelBefore="State:" onChange={onChangeSelect}>
                            <Option value ="blocked">Blocked</Option>
                            <Option value ="opened" selected>Opened</Option>
                            <Option value ="to_do">To do</Option>
                            <Option value ="in_progress">In progress</Option>
                            <Option value ="in_testing">In testing</Option>
                            <Option value ="done">Done</Option>
                        </Select>
                        <DragDropFiles />
                        <div className="list-users">
                            <label className="label">Responsible Users</label>
                            <ol className="list-items">
                                {users.map((item) => (
                                    <ListItem title={item}/>
                                ))}
                            </ol>
                        </div>
                        <div className="task-time">
                            <Form.Group>
                                <Form.Label className="label">Requires time</Form.Label>
                                <div>
                                    <DatePicker selected={ creationDate } className="input" placeholderText="Start" onChange={(date) => setCreationDate(date)}/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="label">Remaining time</Form.Label>
                                <div>
                                    <DatePicker selected={ dueDate } className="input" placeholderText="Start" onChange={(date) => setDueDate(date)}/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="label">Priority</Form.Label>
                                <div>
                                    <Input placeholder="Priority"
                                           value={task.priority}
                                           onChange={(e) => handleInputChange("priority", e.target.value)}
                                    ></Input>
                                </div>
                            </Form.Group>
                        </div>
                    </Form.Group>
                    {!newProject && <Comments comments={comments} />}
                    <div className="btn">
                        <Button text="Save" type="submit"/>
                    </div>
                </Form>
            </div>
        </>
    )
}