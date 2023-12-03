import Input from "../../Controls/Input/Input";
import Comment from "./Comment";
import "./Comments.css";
import Button from "./../../Button/Button";
import {useEffect, useRef, useState} from "react";
import Axios from "./../../../Axios";

export default function Comments({comments, issue, setUpdateComments}) {
    const newCommentRef = useRef(null)
    const [resMessage, setResMessage] = useState("")
    const [newComment, setNewComment] = useState({
        issueId: 25,
        text: ""
    })

    const handleAddComment = (e) => {
        e.preventDefault()
        if (newComment.text.length > 3) {
            Axios.post('/comment', newComment).then(() => {
                setUpdateComments(prev => prev + 1)
                newCommentRef.current.value = ''
                setResMessage("Comment added successfully!")
                console.log("added comment")
            }).catch(err => {
                setResMessage("Error")
                console.log(err)
            })
        }
        else{
            setResMessage("The comment must contain at least 4 characters!")
        }
    }

    const handleChangeComment = (e) => {
        setResMessage("")
        setNewComment({
            issueId: issue.id,
            text: e.target.value
        })
    }

    return (
        <>
            <div className="comments">
                <span className="comments-title">Comments</span>
                <div className="comments-wrapper">
                    {
                        comments.map(comment => {
                            return (
                                <Comment comment={comment} key={comment.id}/>
                            )
                        })
                    }
                </div>
            </div>
            <input
                placeholder="Add your comments"
                className="add-comment-input input"
                onChange={handleChangeComment}
                ref={newCommentRef}
            ></input>
            {resMessage &&
                <span className='input-err'>{resMessage}</span>
            }
            <div className="btn">
                <Button text="Add" type="submit" onClick={handleAddComment}/>
            </div>
        </>
    )
}