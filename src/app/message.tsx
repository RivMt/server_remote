type MessageProps = {
    title: string
    message: string
}

const Message = (props: MessageProps) => {
    if (props.message === "" && props.title === "") {
        return <div/>
    }
    return (
        <div className="message">
            <h2>{props.title}</h2>
            <p>{props.message}</p>
        </div>
    )
}

export default Message