import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

export default function useIssue () {
    const addIssue = (name = "", description = "", projectId = "", dueDate = null, priority = "", assigneeId = "", status = "") => {
        creationDate = new Date();
        return Axios.post(`/project/`, { name, description, projectId, creationDate, dueDate, priority, assigneeId, status });
    }
}