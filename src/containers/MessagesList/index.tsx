import React, { useEffect, useState } from 'react';
import MessageItem from '../../components/MessageItem';
import IChatItem from '../../interfaces/IChatItem';

const MessagesList: React.FC<{ messages: IChatItem[] }> = ({ messages }) => {
    const [list, setList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if(!messages) { return; }
        const newList = messages.map(chat => <MessageItem key={chat.id} id={chat.id} members={chat.members} />);
        setList(newList)
    }, [messages])

    return <div>{list}</div>;
};

export default MessagesList;
