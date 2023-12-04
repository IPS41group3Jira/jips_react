import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import dateFormat from './DateFormat';

const createIssue = (name = "", description = "", projectId = "", dueDate = null, priority = "", assigneeId = "", status = "") => {
    const creationDate = new Date();
    return Axios.post(`/issue`, { name, description, projectId, creationDate: dateFormat(creationDate), dueDate: dateFormat(dueDate), priority, assigneeId, status });
}

const updateIssue = (id = null, name = "", description = "", projectId = "", creationDate = null,  dueDate = null, priority = "", assigneeId = "", status = "") => {
    return Axios.put(`/issue/${id}`, { name, description, projectId, creationDate: dateFormat(creationDate), dueDate: dateFormat(dueDate), priority, assigneeId, status });
}

const getIssueByProject = (projectId = "") => {
    return Axios.get(`/issue/project/${projectId}`);
}

const getIssueByAssignee = (assigneeId = "") => {
    return Axios.get(`issue/assignee/${assigneeId}`)
}
const deleteIssue = (issueId = "") => {
    return Axios.delete(`issue/${issueId}`)
}

export { createIssue, updateIssue, getIssueByProject , getIssueByAssignee, deleteIssue};