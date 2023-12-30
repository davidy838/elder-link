import ChatHeader from './ChatHeader';
import MatchesDisplay from './MatchesDisplay';
import ChatDisplay from './ChatDisplay';
import { useState } from 'react';

const ChatContainer = ({user}) => {
    const [clickedUser, setClickedUser] = useState(null)
    return (
        console.log('user', user.url),

        <div className="chat-container">
            <ChatHeader user={user} /> 

            <div>

                <button className="option" onClick={() => setClickedUser(null)}>Links</button>
                <button className="option" disabled={!clickedUser}>Chats</button>
            </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser} />}
            {clickedUser && <ChatDisplay />}
            </div>

    );

}
export default ChatContainer;