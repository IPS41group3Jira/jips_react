import "./TaskCreation.css"
import {Container, Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Option from "../Controls/Select/Option";
import Select from "../Controls/Select/Select";
import Button from "../Button/Button";
import {useState} from "react";
import DragDropFiles from "./DragDropFiles";

export default function TaskCreation({addTask, closeModal}) {
    const [task, setTask] = useState({
        name:"",
        description:"",
        projectId: 3,
        creationDate: new Date(),
        dueDate: null,
        priority: "",
        assigneeId: "",
        status: "",

    })
    const handleInputChange = ((fieldName, value) => {
        setTask(prevTask => ({
            ...prevTask,
            [fieldName]: value
        }))
    })
    const onChangeSelect = (value, label) => {
        setTask(prevTask => ({
            ...prevTask,
            status: value
        }))
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
                    <Form.Group >
                        <Form.Label className="label">Task name</Form.Label>
                        <div>
                            <Input placeHolder="Task name"
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
                        <Select value="New" labelBefore="State:" onChange={onChangeSelect}>
                            <Option value="new">New</Option>
                            <Option value="in_press">In progress</Option>
                            <Option value="closed">Closed</Option>
                        </Select>
                        <DragDropFiles/>
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
                                    <Input placeHolder="Requires time"
                                           value={task.creationDate}
                                           onChange={(e) => handleInputChange("creationDate", e.target.value)}
                                    ></Input>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="label">Remaining time</Form.Label>
                                <div>
                                    <Input placeHolder="Remaining time"
                                           value={task.dueDate}
                                           onChange={(e) => handleInputChange("dueDate", e.target.value)}
                                    ></Input>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="label">Priority</Form.Label>
                                <div>
                                    <Input placeHolder="Priority"
                                           value={task.priority}
                                           onChange={(e) => handleInputChange("priority", e.target.value)}
                                    ></Input>
                                </div>
                            </Form.Group>

                        </div>
                    </Form.Group>
                    <div className="btn">
                        <Button text="Save" type="submit" />
                    </div>
                </Form>
            </div>
        </>
    )
}