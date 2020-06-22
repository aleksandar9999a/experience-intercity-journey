import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import PublicationList from '../../containers/PublicationList';
import { useMyPublications } from '../../hooks';

const MyPublications: React.FC = () => {
    const { publications, loading } = useMyPublications();
    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="chat-title">My Publications</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <PublicationList publications={publications} isLoading={loading} />
            </IonContent>
        </IonPage>
    );
};

export default MyPublications;
