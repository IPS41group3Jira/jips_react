import "./Comments.css";

export default function Comment({comment}) {
    return (
        <div>
            <span className="user-name">{comment.creatorName}  </span>
            <span>{comment.creationDate.toLocaleString()}</span>
            <div className="comment-block">
                {comment.text}
            </div>
        </div>
    )
}