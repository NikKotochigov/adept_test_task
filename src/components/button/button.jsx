function Button({ onButtonClick, text }) {
    return (
        <button onClick={onButtonClick} className="button">{text}</button>
    );
}

export default Button;