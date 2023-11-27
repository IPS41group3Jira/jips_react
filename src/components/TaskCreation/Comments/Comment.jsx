import "./Comments.css";

export default function Comment({comment}) {
    return (
        <div>
            <span className="user-name">{comment.creator.firstName + " " + comment.creator.lastName + " "} </span>
            <span>{comment.creationDate.toLocaleString()}</span>
            <div className="comment-block">
                {comment.text}
            </div>
        </div>
    )
}