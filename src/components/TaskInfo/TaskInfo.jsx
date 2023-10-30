import './TaskInfo.css'
import {Col, Container, Form, Row} from "react-bootstrap";
import {BiCommentDetail} from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import Select from '../Controls/Select/Select';
import Option from '../Controls/Select/Option';

export default function TaskInfo({ title, status, commentsCount, createdTime }) {
    const onChangeSelect = (value, label) => {
        alert(value);
    }

    return (
            <div className="task_info d-flex flex-column">
                <Row className="mb-auto">
                    <Col sm={6} className="task_title"><span>{title}</span></Col>
                    <Col sm={6} className="task_state">
                    <Select value="New" labelBefore="State:" onChange={onChangeSelect}>
                        <Option value="new">New</Option>
                        <Option value="in_press">In progress</Option>
                        <Option value="closed">Closed</Option>
                    </Select>
                    </Col>
                </Row>
                <Row className="">
                    <Col>
                        <div className="comments_info">
                            <span className="count">{commentsCount}</span>
                            <BiCommentDetail className="icon_comment"/>
                        </div>
                    </Col>
                    <Col>
                        <div className="creation_info">
                            <span className="time">{createdTime}</span>
                            <VscAccount className="icon_account"/>
                        </div>
                    </Col>
                </Row>
            </div>
    )
}