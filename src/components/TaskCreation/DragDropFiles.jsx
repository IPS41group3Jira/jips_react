import "./DragDropFiles.css";
import {useRef, useState} from "react";

export default function DragDropFiles() {
    const [files, setFiles] = useState([])
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
        setFiles([...e.dataTransfer.files])
    }

    const selectFileHandler = (e) => {
        e.preventDefault()
        setFiles([...inputFileRef.current.files])
    }

    return (
        <>
            <div className="drag-drop-wrapper">
                <div
                    className={drag ? "drag-drop-area" + " " + "drag-drop-area-active" : "drag-drop-area"}
                    onDragStart={dragStartHandler}
                    onDragLeave={dragLeaveHandler}
                    onDragOver={dragStartHandler}
                    onDrop={onDropHandler}
                >
                    <p className="drag-drop-area__text">Attachments (only for task details)</p>
                    {
                        files.map((file, index) => {
                            return (
                                <div key={index}>
                                    <span>{file.name}</span><br/>
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