import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const createIssue = (name = "", description = "", projectId = "", dueDate = null, priority = "", assigneeId = "", status = "") => {
    const creationDate = new Date();
    return Axios.post(`/issue`, { name, description, projectId, creationDate, dueDate, priority, assigneeId, status });
}

export { createIssue };