import "./TaskCreation.css"
import {Container, Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Option from "../Controls/Select/Option";
import Select from "../Controls/Select/Select";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import DragDropFiles from "./DragDropFiles";
import Comments from "./Comments/Comments";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectReact from 'react-select';

// CSS Modules, react-datepicker-cssmodules.css// 
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Axios from "../../Axios";

export default function TaskCreation({addTask, closeModal, newProject = true, userList = null, issue = null}) {
    const [status, setStatus] = useState();
    const [assigneeId, setAssigneeId] = useState(null)
    const [task, setTask] = useState(() => {
        if (issue) return issue
        else {
            return {
                name: "",
                description: "",
                projectId: 3,
                creationDate: new Date(),
                dueDate: null,
                priority: "",
                assigneeId: "",
                status: "",
            }
        }
    });

    const [comments, setComments] = useState([])
    useEffect(() => {
        Axios.get(`/comment/issue/${task.id}`).then(comments => {
            setComments(comments.data);
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    useEffect(() => {
        console.log(comments)
    }, [comments])

    const [creationDate, setCreationDate] = useState(new Date());
    const [dueDate, setDueDate] = useState(new Date());
    const options = userList.map(user => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`
    }))

    useEffect(() => {
        if (!issue) {
            setTask({...task, creationDate, dueDate, status, assigneeId});
        }
    }, [dueDate, creationDate, status, assigneeId]);

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
                            <Option value="BLOCKED">Blocked</Option>
                            <Option value="OPENED" selected>Opened</Option>
                            <Option value="TO_DO">To do</Option>
                            <Option value="IN_PROGRESS">In progress</Option>
                            <Option value="IN_TESTING">In testing</Option>
                            <Option value="DONE">Done</Option>
                        </Select>
                        <DragDropFiles/>
                        <div className="list-users">
                            <label className="label">Responsible Users</label>
                            <SelectReact defaultValue={assigneeId} onChange={(val) => setAssigneeId(val.value)}
                                         options={options} className="basic-single"/>
                        </div>
                        <div className="task-time">
                            <Form.Group>
                                <Form.Label className="label">Requires time</Form.Label>
                                <div>
                                    <DatePicker selected={creationDate} className="input" placeholderText="Start"
                                                onChange={(date) => setCreationDate(date)}/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="label">Remaining time</Form.Label>
                                <div>
                                    <DatePicker selected={dueDate} className="input" placeholderText="Start"
                                                onChange={(date) => setDueDate(date)}/>
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
                    {!newProject && <Comments comments={comments}/>}
                    <div className="btn">
                        <Button text="Save" type="submit"/>
                    </div>
                </Form>
            </div>
        </>
    )
}