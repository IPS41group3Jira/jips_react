import Input from "../../Controls/Input/Input";
import Comment from "./Comment";
import "./Comments.css";

export default function Comments({comments}) {

    return (
        <>
            <div className="comments">
                <span className="comments-title">Comments</span>
                <div className="comments-wrapper">
                {
                    comments.map(comment => {
                        return (
                            <Comment comment={comment} key={comment.commentId}/>
                        )
                    })
                }
                </div>
            </div>
            <Input placeholder="Add your comments" className="add-comment-input"></Input>
        </>
    )
}