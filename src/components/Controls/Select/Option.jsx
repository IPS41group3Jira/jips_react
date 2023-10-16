function Option({ value, children, onClick }) {
    return (
        <li className={`option`} onClick={onClick}>
            {children}
        </li>
    );
}

export default Option;