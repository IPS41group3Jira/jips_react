// Import necessary dependencies and utility functions
import Axios from '../Axios';
import dateFormat from './DateFormat';

/**
 * Creates a new attachment for an issue.
 * @param {string} issue_id - The ID of the issue to which the attachment belongs.
 * @param {string} fileName - The name of the file.
 * @param {File} file - The file to be attached.
 * @returns {Promise} - A promise that resolves with the result of the POST request.
 */
const createAttachment = (issue_id, fileName, file) => {
    // Create a FormData object to send the attachment data
    const formData = new FormData();
    formData.append("issueId", issue_id);
    formData.append("uploadDate", dateFormat(new Date()));
    formData.append("fileName", fileName)
    formData.append("file", file);

    // Send a POST request to create the attachment
    return Axios.postForm('/attachment', formData);
}

/**
 * Downloads a file associated with an attachment.
 * @param {string} file_id - The ID of the file to be downloaded.
 * @param {string} filename - The name to be used when saving the file.
 * @returns {Promise} - A promise that resolves when the download is complete.
 */
const downloadFile = (file_id, filename) => {
    // Send a GET request to download the file as a blob
    return Axios.request({
        url: `/attachment/${file_id}/file`,
        method: "GET",
        responseType: 'blob'
    }).then((resp) => {
        // Create a temporary link to download the file
        const href = URL.createObjectURL(resp.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Revoke the object URL to free up resources
        URL.revokeObjectURL(href);
    });
}

/**
 * Gets attachments associated with an issue by its ID.
 * @param {string} issue_id - The ID of the issue for which attachments are retrieved.
 * @returns {Promise} - A promise that resolves with the result of the GET request.
 */
const getAttachmentsByIssueId = (issue_id = null) => {
    // Send a GET request to fetch attachments by issue ID
    return Axios.get(`/attachment/issue/${issue_id}`);
}

// Export all functions for use in other files
export {
    downloadFile,
    createAttachment,
    getAttachmentsByIssueId
};
