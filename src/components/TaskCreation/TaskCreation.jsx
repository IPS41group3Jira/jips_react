import "./TaskCreation.css"
import {Container, Form} from "react-bootstrap";
import Input from "../Controls/Input/Input";
import Textarea from "../Controls/Input/Textarea";
import Option from "../Controls/Select/Option";
import Select from "../Controls/Select/Select";
import Button from "../Button/Button";

export default function TaskCreation() {
    const users = ['Emily Smith', 'Emily Smith', 'Emily Smith'];
    const onChangeSelect = (value, label) => {
        alert(value);
    }

    function ListItem({title}) {
        return <li>{title}</li>
    }

    return (
        <>
            <div>
                <Form className="task-creation-form">
                    <Form.Group>
                        <Form.Label className="label">Task name</Form.Label>
                        <div>
                            <Input placeHolder="Task name"></Input>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Task description</Form.Label>
                        <div>
                            <Textarea className={"task-description"} placeholder="Task description" rows="4"></Textarea>
                        </div>
                    </Form.Group>
                    <Form.Group className="task-group">
                        <Select value="New" labelBefore="State:" onChange={onChangeSelect}>
                            <Option value="new">New</Option>
                            <Option value="in_press">In progress</Option>
                            <Option value="closed">Closed</Option>
                        </Select>
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
                                    <Input placeHolder="Requires time"></Input>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="label">Remaining time</Form.Label>
                                <div>
                                    <Input placeHolder="Remaining time"></Input>
                                </div>
                            </Form.Group>

                        </div>
                    </Form.Group>
                    <div className="btn">
                        <Button text="Save"/>
                    </div>
                </Form>
            </div>
        </>
    )
}