import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import IPixabayImage from '../interfaces/IPixabayImage';
import { getImageByPlace, setPublication, deletePublication, getUserdata, openChatByMembers } from '../services';
import { IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton, IonPage, IonList, IonAvatar, IonContent } from '@ionic/react';
import isAfter from 'validator/lib/isAfter';
import { IUser } from '../interfaces/interfaces';
import assets from '../config/assets';
import { usePublication } from '../hooks';
import { LoadingPage } from './LoadingPage';

export const Details: React.FC = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams<{ id: string }>();
    let { publication, loading, setParams } = usePublication(id);
    const [image, setImage] = useState<IPixabayImage>();
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [creatorData, setCreatorData] = useState<IUser>();
    const history = useHistory();

    function handleFrom(e: any) { return setParams({ from: e.target.value }); }
    function handleTo(e: any) { return setParams({ to: e.target.value }); }
    function handleDate(e: any) { return setParams({ date: e.target.value }); }
    function handleTime(e: any) { return setParams({ time: e.target.value }); }
    function handleType(e: any) { return setParams({ type: e.target.value }); }

    function validate() {
        const typesOfTransport = ['transport', 'drive'];
        if (!publication) { console.debug('Invalid publication.'); return false; }
        if (publication.from.length < 3 || publication.to.length < 3) { console.debug('Invalid locations. Minimum chars are 3!'); return false; }
        if (!isAfter(publication.date)) { console.debug('You must enter a date after today!'); return false; }
        if (!typesOfTransport.includes(publication.type)) { console.debug('Invalid type of transport!'); return false; }
        return true;
    }

    function submit() { if (!validate() || !publication) { return; } setPublication(publication); }
    function remove() {
        if (!isAuth) { console.debug('Sorry, but this post is not your. You can not delete it!'); return; }
        deletePublication(id).then(() => history.push(`/search`));
    }

    useEffect(() => {
        if (loading || !user || !publication) { return; }
        setIsAuth(user.uid === publication.creatorId);
    }, [publication, user, loading])

    useEffect(() => {
        if (loading || !publication || !publication.to) { return; }
        getImageByPlace(publication.to).then(res => {
            if (!res) { return; }
            setImage(res.data.hits[0])
        })
    }, [id, publication, loading])

    useEffect(() => {
        if (loading || !publication || !publication.creatorId) { return; }
        getUserdata(publication.creatorId).onSnapshot(doc => { setCreatorData(doc.data() as IUser); });
    }, [publication, loading])

    function openChatBox() {
        if (loading || !publication || !publication.creatorId || !creatorData || !user) { return; }
        openChatByMembers([user.uid, publication.creatorId]).then(data => {
            if (!data) { return; }
            history.push(`/chat/${data.id}`);
        });
    }

    if (loading) { return <LoadingPage isOpen={loading} /> }
    if (!publication) { return null; }

    return (
        <IonPage>
            <IonContent>
                <div className="details-preview">
                    {!!image && <img src={image.largeImageURL} alt="preview" />}
                </div>
                <IonList>
                    <IonItem className="details-item" disabled={!isAuth}>
                        <IonLabel position="floating">From</IonLabel>
                        <IonInput type="text" value={publication.from} onIonChange={handleFrom} />
                    </IonItem>
                    <IonItem className="details-item" disabled={!isAuth}>
                        <IonLabel position="floating">To</IonLabel>
                        <IonInput type="text" value={publication.to} onIonChange={handleTo} debounce={1000} />
                    </IonItem>
                    <IonItem className="details-item" disabled={!isAuth}>
                        <IonLabel>Date</IonLabel>
                        <IonDatetime placeholder="Select Date" value={publication.date} onIonChange={handleDate}></IonDatetime>
                    </IonItem>
                    <IonItem className="details-item" disabled={!isAuth}>
                        <IonLabel>Time</IonLabel>
                        <IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A" value={publication.time} onIonChange={handleTime}></IonDatetime>
                    </IonItem>
                    <IonItem className="details-item" disabled={!isAuth}>
                        <IonLabel>Search</IonLabel>
                        <IonSelect interface="action-sheet" value={publication.type} onIonChange={handleType}>
                            <IonSelectOption value="transport">Transport</IonSelectOption>
                            <IonSelectOption value="drive">To Drive</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>
                {!!isAuth && <div className="details-btn-wrapper">
                    <div className="details-btns">
                        <IonButton color="success" fill="outline" onClick={submit}>Edit</IonButton>
                        <IonButton color="danger" fill="outline" onClick={remove}>Delete</IonButton>
                    </div>
                </div>}
                {!isAuth && !!creatorData
                    && <IonItem>
                        <IonAvatar className="creator-avatar">
                            <img src={creatorData.image || assets.anonym} alt="creator" />
                        </IonAvatar>
                        <IonLabel>
                            <p>Name: {creatorData.firstName} {creatorData.lastName}</p>
                            <p>City: {creatorData.city}</p>
                            <IonButton color="success" fill="solid" onClick={openChatBox}>Write message</IonButton>
                        </IonLabel>
                    </IonItem>
                }
            </IonContent>
        </IonPage>
    );
};
