import ChatHeader from './ChatHeader';
import MatchesDisplay from './MatchesDisplay';
import ChatDisplay from './ChatDisplay';

const ChatContainer = ({user}) => {
    return (

        <div className="chat-container">
            <ChatHeader user={user} /> 

            <div>

                <button className="option">Links</button>
                <button className="option">Chats</button>
            </div>

            <MatchesDisplay/>

            <ChatDisplay/>





        </div>

    );

}
export default ChatContainer;