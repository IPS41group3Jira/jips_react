import Input from "../../Controls/Input/Input";
import Comment from "./Comment";
import "./Comments.css";

export default function Comments({comments}) {

    return (
        <>
            <div className="comments-wrapper">
                <p className="comments-title">Comments (only for task details)</p>
                {
                    comments.map(comment => {
                        return (
                            <Comment comment={comment} key={comment.commentId}/>
                        )
                    })
                }
            </div>
            <Input placeholder="Add your comments" className="add-comment-input"></Input>
        </>
    )
}