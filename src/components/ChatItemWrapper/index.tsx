import React from 'react';
import { IUser } from '../../interfaces/interfaces';
import ChatItem from '../../components/ChatItem';
import IChatItemWrapper from '../../interfaces/IChatItemWrapper';

const ChatItemWrapper: React.FC<IChatItemWrapper> = ({ users, data, myUid}) => {
    const currUser = users.find(y => y.uid === data.creatorId) as IUser;
    const slot = currUser.uid === myUid ? 'end' : 'start';

    return <ChatItem key={data.id} chat={data} user={currUser} slot={slot} />
};

export default ChatItemWrapper;
