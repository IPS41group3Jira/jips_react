import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

const createProject = (name = '', description = '', startDate = null, endDate = null) => {
    const creationDate = new Date();

    return Axios.post('/project', { name, description, creationDate, startDate, endDate });
}

const addUserToProject = (projectId = '', userId = '', roleId = '') => {
    return Axios.post(`/project/${projectId}/user`, { userId, roleId });
}

export { createProject, addUserToProject };