import './TaskInfo.css'
import {Col, Container, Form, Row} from "react-bootstrap";
import {BiCommentDetail} from "react-icons/bi";
import {VscAccount} from "react-icons/vsc";

export default function TaskInfo({title, status, commentsCount, createdTime}) {
    return (
            <div className="task_info d-flex flex-column">
                <Row className="mb-auto">
                    <Col sm={6} className="task_title"><span>{title}</span></Col>
                    <Col sm={6} className="task_state">
                        <span>State:</span>
                        <Form.Select className="form-select" value={status}>
                            <option value="New">New</option>
                            <option value="in_progress">In progress</option>
                            <option value="in_progress">Closed</option>
                        </Form.Select>
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