import "./DragDropFiles.css";
import { useEffect, useRef, useState } from "react";
import { downloadFile } from "../../Hooks/Attachment";

export default function DragDropFiles({ filesInfo = [], onChange }) {
    const [files, setFiles] = useState([])
    const [newFiles, setNewFiles] = useState([]);
    const [drag, setDrag] = useState(false)
    const inputFileRef = useRef(null)

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
    }
    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        setNewFiles([...newFiles, ...e.dataTransfer.files]);
        setFiles([...files, ...e.dataTransfer.files]);
    }

    const selectFileHandler = (e) => {
        e.preventDefault()
        console.log(inputFileRef.current.files)
        setNewFiles([...newFiles, ...inputFileRef.current.files]);
        setFiles([...files, ...inputFileRef.current.files]);
    }

    useEffect(() => { setFiles(filesInfo); }, [filesInfo])

    useEffect(() => { if (typeof onChange == 'function') onChange(newFiles); }, [newFiles])

    return (
        <>
            <div className="drag-drop-wrapper">
                <div
                    className={ "files-wrapper " + (drag ? "drag-drop-area" + " " + "drag-drop-area-active" : "drag-drop-area")}
                    onDragStart={dragStartHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDrop={onDropHandler}
                >
                    <p className="drag-drop-area__text">Attachments</p>
                    {
                        files.map((file, index) => {
                            return (
                                <div key={index} className="file-name" onClick={() => { file.id && downloadFile(file.id, file?.name || file?.fileName) }}>
                                    <span>{file?.name || file?.fileName}</span>
                                    {!file?.id && (<span>new</span>)}
                                </div>
                            )
                        })
                    }
                </div>
                <label htmlFor="selectFile" className="drag-drop__attach-text">Attach file </label>
                <input type="file" id="selectFile" className="select-file"
                       ref={inputFileRef}
                       onChange={selectFileHandler}
                />
            </div>
        </>
    )
}