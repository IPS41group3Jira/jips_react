import Axios from '../Axios';
import dateFormat from './DateFormat';

const createAttachment = (issue_id, fileName, file) => {
    const formData = new FormData();
    formData.append("issueId", issue_id);
    formData.append("uploadDate", dateFormat(new Date()));
    formData.append("fileName", fileName)
    formData.append("file", file);

    return Axios.postForm('/attachment', formData);
}

const downloadFile = (file_id, filename) => {
    return Axios.request({
        url: `/attachment/${file_id}/file`,
        method: "GET",
        responseType: 'blob'
    }).then((resp) => {
        const href = URL.createObjectURL(resp.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    });
}



const getAttachmentsByIssueId = (issue_id = null) => {
    return Axios.get(`/attachment/issue/${issue_id}`);
}

export { downloadFile, createAttachment, getAttachmentsByIssueId};