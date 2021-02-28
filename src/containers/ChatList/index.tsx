import React, { useState, useEffect, useRef } from 'react';
import IMessage from '../../interfaces/IMessage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import ChatItemWrapper from '../../components/ChatItemWrapper';
import { useMultipleUserdata } from '../../hooks';
import { LoadingPage } from '../../pages/LoadingPage';

const ChatList: React.FC<{ messages: IMessage[] }> = ({ messages }) => {
    const [list, setList] = useState<JSX.Element[]>([]);
    const [iUser, loading] = useAuthState(auth);
    const usersdata  = useMultipleUserdata(messages.map(x => x.creatorId));
    const chatListEnd = useRef(null);

    useEffect(() => {
        if (loading || !messages || usersdata.length < 2 || !iUser) { return; }
        const newList = messages.map(x => <ChatItemWrapper key={x.id} data={x} users={usersdata} myUid={iUser.uid} />)
        setList(newList);
    }, [usersdata, iUser, messages, loading])

    useEffect(() => {
        if (!chatListEnd || !chatListEnd.current) { return; }
        (chatListEnd.current as any).scrollIntoView({ behavior: "smooth" })
    }, [list])

    if (loading) { return <LoadingPage isOpen={loading} /> }

    return (
        <div>
            {list}
            <div ref={chatListEnd}></div>
        </div>
    )
};

export default ChatList;
