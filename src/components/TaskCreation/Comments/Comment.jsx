import "./Comments.css";

export default function Comment({comment}) {
    const parseDate = (date) => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }
    return (
        <div>
            <span className="user-name">{comment.creator.firstName + " " + comment.creator.lastName + " "} </span>
            <span className="comment_date">{parseDate(comment.creationDate)}</span>
            <div className="comment-block">
                {comment.text}
            </div>
        </div>
    )
}