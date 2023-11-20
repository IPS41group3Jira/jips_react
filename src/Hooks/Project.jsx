import Axios from '../Axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"

export default function useProject () { 
    const createProject = (name = '', description = '', start_date = null, end_date = null) => {
        const creation_date = new Date();

        Axios.post('/project/', { name, description, creation_date, start_date, end_date }).then((res) => {
            
        });
    }

    const addUserToProject = (projectId = '', userId = '', roleId = '') => {
        Axios.post(`/project/${projectId}/user`, {})
    }
}