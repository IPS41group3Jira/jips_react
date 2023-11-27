import './TaskInfo.css'
import {Col, Container, Form, Row} from "react-bootstrap";
import {BiCommentDetail} from "react-icons/bi";
import {VscAccount} from "react-icons/vsc";
import Select from '../Controls/Select/Select';
import Option from '../Controls/Select/Option';

export default function TaskInfo({title, status, commentsCount, createdTime}) {
    const onChangeSelect = (value, label) => {
        // alert(value);
        console.log(value)
    }
    const parseDate = (date) => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    return (
        <div className="task_info d-flex flex-column">
            <Row className="mb-auto">
                <Col sm={6} className="task_title"><span>{title}</span></Col>
                {status &&
                    <Col sm={6} className="task_state">
                        <Select labelBefore="State:" onChange={onChangeSelect} value={status}>
                            <Option value ="BLOCKED">Blocked</Option>
                            <Option value ="OPENED" selected>Opened</Option>
                            <Option value ="TO_DO">To do</Option>
                            <Option value ="IN_PROGRESS">In progress</Option>
                            <Option value ="IN_TESTING">In testing</Option>
                            <Option value ="DONE">Done</Option>
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
                        <span className="time">{parseDate(createdTime)}</span>
                        {status &&
                            <VscAccount className="icon_account"/>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}