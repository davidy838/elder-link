const ChatInput = () => {
    const [textArea, setTextArea] = useState(NULL)
    return( 
    <div className="chat-input">
        <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
        <button className="secondary-button"> Submit</button>
    
    
    
    </div>
    )



}

export default ChatInput;