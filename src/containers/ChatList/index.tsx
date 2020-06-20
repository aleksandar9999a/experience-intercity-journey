import React, { useState, useEffect, useRef } from 'react';
import IMessage from '../../interfaces/IMessage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import ChatItemWrapper from '../../components/ChatItemWrapper';
import IUser from '../../interfaces/IUser';
import { getMultiplyUserdata } from '../../services';

const ChatList: React.FC<{ messages: IMessage[], members: string[] }> = ({ messages, members }) => {
    const [list, setList] = useState<JSX.Element[]>([]);
    const [iUser] = useAuthState(auth);
    const [users, setUsers] = useState<IUser[]>([]);
    const chatListEnd = useRef(null);

    useEffect(() => {
        if (!members) { return; }
        getMultiplyUserdata(members).then(usersdata => {
            if (!usersdata) { return; }
            setUsers(usersdata)
        })
    }, [members])

    useEffect(() => {
        if (!messages || users.length < 2 || !iUser) { return; }
        const newList = messages.map(x => <ChatItemWrapper key={x.id} data={x} users={users} myUid={iUser.uid} />)
        setList(newList);
    }, [messages, users, iUser])

    useEffect(() => {
        if (!chatListEnd || !chatListEnd.current) { return; }
        (chatListEnd.current as any).scrollIntoView({ behavior: "smooth" })
    }, [list])

    return (
        <div>
            {list}
            <div ref={chatListEnd}></div>
        </div>
    )
};

export default ChatList;
