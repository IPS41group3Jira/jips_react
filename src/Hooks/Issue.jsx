// Import necessary dependencies and utility functions
import Axios from '../Axios';
import dateFormat from './DateFormat';

/**
 * Creates a new issue.
 * @param {string} name - The name of the issue.
 * @param {string} description - The description of the issue.
 * @param {string} projectId - The ID of the project to which the issue belongs.
 * @param {Date|null} dueDate - The due date of the issue (can be null).
 * @param {string} priority - The priority of the issue.
 * @param {string} assigneeId - The ID of the user assigned to the issue.
 * @param {string} status - The status of the issue.
 * @returns {Promise} - A promise that resolves with the result of the POST request.
 */
const createIssue = (name = "", description = "", projectId = "", dueDate = null, priority = "", assigneeId = "", status = "") => {
    // Get the current date as the creation date
    const creationDate = new Date();

    // Send a POST request to create the issue
    return Axios.post(`/issue`, {
        name,
        description,
        projectId,
        creationDate: dateFormat(creationDate),
        dueDate: dateFormat(dueDate),
        priority,
        assigneeId,
        status
    });
}

/**
 * Updates an existing issue.
 * @param {string} id - The ID of the issue to be updated.
 * @param {string} name - The new name of the issue.
 * @param {string} description - The new description of the issue.
 * @param {string} projectId - The new ID of the project to which the issue belongs.
 * @param {Date|null} creationDate - The new creation date of the issue (can be null).
 * @param {Date|null} dueDate - The new due date of the issue (can be null).
 * @param {string} priority - The new priority of the issue.
 * @param {string} assigneeId - The new ID of the user assigned to the issue.
 * @param {string} status - The new status of the issue.
 * @returns {Promise} - A promise that resolves with the result of the PUT request.
 */
const updateIssue = (id = null, name = "", description = "", projectId = "", creationDate = null, dueDate = null, priority = "", assigneeId = "", status = "") => {
    // Send a PUT request to update the issue
    return Axios.put(`/issue/${id}`, {
        name,
        description,
        projectId,
        creationDate: dateFormat(creationDate),
        dueDate: dateFormat(dueDate),
        priority,
        assigneeId,
        status
    });
}

/**
 * Gets issues associated with a project.
 * @param {string} projectId - The ID of the project for which issues are retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getIssueByProject = (projectId = "") => {
    // Send a GET request to fetch issues by project
    return Axios.get(`/issue/project/${projectId}`);
}

/**
 * Gets issues associated with an assignee.
 * @param {string} assigneeId - The ID of the assignee for which issues are retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getIssueByAssignee = (assigneeId = "") => {
    // Send a GET request to fetch issues by assignee
    return Axios.get(`issue/assignee/${assigneeId}`);
}

/**
 * Deletes an issue by its ID.
 * @param {string} issueId - The ID of the issue to be deleted.
 * @returns {Promise} - A promise that resolves with the result of the DELETE request.
 */
const deleteIssue = (issueId = "") => {
    // Send a DELETE request to delete the issue
    return Axios.delete(`issue/${issueId}`);
}

/**
 * Gets comments associated with an issue.
 * @param {string} issueId - The ID of the issue for which comments are retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getComments = (issueId = "") => {
    // Send a GET request to fetch comments by issue ID
    return Axios.get(`/comment/issue/${issueId}`);
}

// Export all functions for use in other files
export {
    createIssue,
    updateIssue,
    getIssueByProject,
    getIssueByAssignee,
    deleteIssue,
    getComments
};
