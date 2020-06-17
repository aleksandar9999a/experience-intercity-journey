import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router';
import { auth, firestore } from './../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import IPublication from '../../interfaces/IPublication';
import IPixabayImage from '../../interfaces/IPixabayImage';
import { getImageByPlace, setPublication, deletePublication, getUserdata, createNewChat } from '../../services';
import './style.css';
import { IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import TCreateState from '../../types/TCreateState';
import { submitMessage } from '../../services/toast';
import isAfter from 'validator/lib/isAfter';
import IUser from '../../interfaces/IUser';
import assets from '../../config/assets';


const Details: React.FC = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams<{ id: string }>();
    const [image, setImage] = useState<IPixabayImage>();
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [redirect, setRedirect] = useState<boolean>(false);

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [creatorId, setCreatorId] = useState<string | undefined>('');
    const [creatorData, setCreatorData] = useState<IUser>();

    function handleChanges(type: string, value: string) {
        const types: TCreateState = {
            from: setFrom,
            to: setTo,
            date: setDate,
            time: setTime,
            type: setType
        }

        if (typeof types[type] === 'function') { types[type](value); return; }
        submitMessage('Invalid input format!');
    }

    function handleFrom(e: any) { return handleChanges('from', e.target.value); }
    function handleTo(e: any) { return handleChanges('to', e.target.value); }
    function handleDate(e: any) { return handleChanges('date', e.target.value); }
    function handleTime(e: any) { return handleChanges('time', e.target.value); }
    function handleType(e: any) { return handleChanges('type', e.target.value); }

    function validate() {
        const typesOfTransport = ['transport', 'drive'];
        if (from.length < 3 || to.length < 3) { submitMessage('Invalid locations. Minimum chars are 3!'); return false; }
        if (!isAfter(date)) { submitMessage('You must enter a date after today!'); return false; }
        if (!typesOfTransport.includes(type)) { submitMessage('Invalid type of transport!'); return false; }
        return true;
    }

    function submit() { if (!validate()) { return; } setPublication({ id, creatorId, from, to, date, time, type }); }
    function remove() {
        if (!isAuth) { submitMessage('Sorry, but this post is not your. You can not delete it!'); return; }
        deletePublication(id).then(() => setRedirect(true));
    }

    useEffect(() => {
        if (!user) { return; }
        firestore.collection('publications').doc(id).onSnapshot(doc => {
            if (!doc.exists) { return; }
            const { from, to, date, time, type, creatorId } = doc.data() as IPublication;
            setIsAuth(user.uid === creatorId);
            setFrom(from); setTo(to); setDate(date); setTime(time); setType(type); setCreatorId(creatorId);
        })
    }, [user, id])

    useEffect(() => {
        if (!to) { return; }
        getImageByPlace(to).then(res => {
            if (!res) { return; }
            setImage(res.data.hits[0])
        })
    }, [id, to])

    useEffect(() => {
        if (!creatorId) { return; }
        getUserdata(creatorId).onSnapshot(doc => { setCreatorData(doc.data() as IUser); });
    }, [creatorId])

    function openChatBox() { if(!creatorId) { return; } createNewChat([creatorId]); }

    if (redirect) { return <Redirect exact to="/search" /> }

    return (
        <div>
            <div className="details-preview">
                {!!image && <img src={image.largeImageURL} alt="preview" />}
            </div>
            <div className="details-items-wrapper">
                <IonItem className="details-item" disabled={!isAuth}>
                    <IonLabel position="floating">From</IonLabel>
                    <IonInput type="text" value={from} onIonChange={handleFrom} />
                </IonItem>
                <IonItem className="details-item" disabled={!isAuth}>
                    <IonLabel position="floating">To</IonLabel>
                    <IonInput type="text" value={to} onIonChange={handleTo} debounce={1000} />
                </IonItem>
                <IonItem className="details-item" disabled={!isAuth}>
                    <IonLabel>Date</IonLabel>
                    <IonDatetime placeholder="Select Date" value={date} onIonChange={handleDate}></IonDatetime>
                </IonItem>
                <IonItem className="details-item" disabled={!isAuth}>
                    <IonLabel>Time</IonLabel>
                    <IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A" value={time} onIonChange={handleTime}></IonDatetime>
                </IonItem>
                <IonItem className="details-item" disabled={!isAuth}>
                    <IonLabel>Search</IonLabel>
                    <IonSelect interface="action-sheet" value={type} onIonChange={handleType}>
                        <IonSelectOption value="transport">Transport</IonSelectOption>
                        <IonSelectOption value="drive">To Drive</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </div>
            {!!isAuth && <div className="details-btn-wrapper">
                <div className="details-btns">
                    <IonButton color="success" fill="outline" onClick={submit}>Edit</IonButton>
                    <IonButton color="danger" fill="outline" onClick={remove}>Delete</IonButton>
                </div>
            </div>}
            {!isAuth && !!creatorData && <IonItem>
                <div>
                    <img src={creatorData.image || assets.anonym} className="details-creator-img" alt="creator" />
                </div>
                <div className="creator-info">
                    <p>Name: {creatorData.firstName} {creatorData.lastName}</p>
                    <p>City: {creatorData.city}</p>
                    <IonButton color="success" fill="solid" onClick={openChatBox}>Write message</IonButton>
                </div>
            </IonItem>}
        </div>
    );
};

export default Details;
