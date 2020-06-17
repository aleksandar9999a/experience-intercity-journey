import React, { useState, useEffect } from 'react';
import { IonModal, IonButton, IonList, IonListHeader, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import { getMessageBoxState, closeMessageBox, getMultiplyUserdata, submitMessageBox } from '../../services';
import IMessageBoxState from '../../interfaces/IMessageBoxState';
import MemberItem from '../../components/MemberItem';
import './style.css';
import { submitMessage } from '../../services/toast';


const MessageBox: React.FC = () => {
    const [state, setState] = useState<IMessageBoxState>({ isOpen: false, members: [], creatorId: '', id: '', lastName: '', firstName: '', to: '' });
    const [list, setList] = useState<JSX.Element[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const sub = getMessageBoxState().subscribe(newState => { setState(newState); });
        return () => { sub.unsubscribe(); }
    }, [])

    useEffect(() => {
        if (!state.isOpen || !state.members || !state.creatorId) { return; }
        getMultiplyUserdata(state.members).then(members => {
            if (!members) { return; }
            const newList = members.map(x => <MemberItem key={x.uid} image={x.image} firstName={x.firstName} lastName={x.lastName} />)
            setList(newList);
        })
    }, [state])

    function close() { setMessage(''); closeMessageBox(); }

    function validate() {
        if (!state.isOpen) { submitMessage('Form is not open!'); return false; }
        if (!state.members || state.members.length < 2) { submitMessage('Members are invalid!'); return false; }
        if (!state.creatorId) { submitMessage('Creator is unknown!'); return false; }
        if (!state.id) { submitMessage('Id is unknown!'); return false; }
        if (!message || message.length < 4 || message.length > 500) { submitMessage('Invalid message! Minimum length is 4 chars, max - 500.'); return false; }

        return true;
    }

    function sendMessage() {
        if (!validate()) { return; }
        const data = {
            id: state.id,
            creatorId: state.creatorId,
            members: state.members,
            message,
            firstName: state.firstName,
            lastName: state.lastName,
            to: state.to
        }
        submitMessageBox(data).then(() => { closeMessageBox(); });
    }

    function handleMessage(e: any) { setMessage(e.target.value); }

    return (
        <IonModal isOpen={!!state.isOpen}>
            <IonList>
                <IonListHeader>Members</IonListHeader>
                {list}
            </IonList>
            <IonItem>
                <IonLabel position="floating">Message</IonLabel>
                <IonTextarea rows={20} value={message} onIonChange={handleMessage} placeholder="Write here your question."></IonTextarea>
            </IonItem>
            <IonButton color="success" onClick={sendMessage}>Send</IonButton>
            <IonButton color="primary" onClick={close}>Close</IonButton>
        </IonModal>
    );
};

export default MessageBox;
