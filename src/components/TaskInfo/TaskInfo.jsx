import './TaskInfo.css'
import {Col, Container, Form, Row} from "react-bootstrap";
import {BiCommentDetail} from "react-icons/bi";
import {VscAccount} from "react-icons/vsc";
import Select from '../Controls/Select/Select';
import Option from '../Controls/Select/Option';

export default function TaskInfo({title, status, commentsCount, createdTime, showStatus}) {
    const onChangeSelect = (value, label) => {
        // alert(value);
        console.log(value)
    }

    return (
        <div className="task_info d-flex flex-column">
            <Row className="mb-auto">
                <Col sm={6} className="task_title"><span>{title}</span></Col>
                {showStatus &&
                    <Col sm={6} className="task_state">
                        <Select labelBefore="State:" onChange={onChangeSelect}>
                            <Option value ="blocked">Blocked</Option>
                            <Option value ="opened" selected>Opened</Option>
                            <Option value ="to_do">To do</Option>
                            <Option value ="in_progress">In progress</Option>
                            <Option value ="in_testing">In testing</Option>
                            <Option value ="done">Done</Option>
                        </Select>
                    </Col>
                }
            </Row>
            <Row className="mt-3">
                <Col>
                    <div className="comments_info">
                        <span className="count">{commentsCount}</span>
                        <BiCommentDetail className="icon_comment"/>
                    </div>
                </Col>
                <Col>
                    <div className="creation_info">
                        <span className="time">{createdTime}</span>
                        {showStatus &&
                            <VscAccount className="icon_account"/>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}