import './TaskInfo.css'
import {Col, Container, Form, Row} from "react-bootstrap";
import {BiCommentDetail} from "react-icons/bi";
import {VscAccount} from "react-icons/vsc";
import Select from '../Controls/Select/Select';
import Option from '../Controls/Select/Option';
import {useEffect, useState} from "react";
import {Axios} from "axios";
import {getComments} from "../../Hooks/Issue";

export default function TaskInfo({title, status, endDate, id = 0}) {
    const onChangeSelect = (value, label) => {
        // alert(value);
        console.log(value)
    }
    const [comments, setComments] = useState([])
    useEffect(() => {
        if (id !== 0) {
            getComments(id.toString()).then((resp) => {
                setComments(resp.data);
            }).catch((e) => {
                console.error(e)
            })
        }
    }, [id])
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
                        <span className="count">{comments.length}</span>
                        <BiCommentDetail className="icon_comment"/>
                    </div>
                </Col>
                <Col>
                    <div className="creation_info">
                        <span className="time">{parseDate(endDate)}</span>
                        {status &&
                            <VscAccount className="icon_account"/>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}