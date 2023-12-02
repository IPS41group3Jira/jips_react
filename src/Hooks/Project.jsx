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

const getProjectUsers =  (projectId = '') => {
    return Axios.get(`/project/${projectId}/users`)
}
const deleteUserProject = (projectId = '', userId = '') => {
    return Axios.delete(`project/${projectId}/user/${userId}`)
}

const deleteProjectById = (projectId = '') => {
    return Axios.delete(`project/${projectId}`)
}
const getProjectById = (projectId = '') => {
    return Axios.get(`project/${projectId}`)
}
const getProjectsByName = (projectName = '') => {
    return Axios.get(`project/?like=${projectName}`);
}

export { createProject, addUserToProject , getProjectUsers, deleteUserProject, getProjectsByName, deleteProjectById, getProjectById};