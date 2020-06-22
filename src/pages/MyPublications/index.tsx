import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { useMyPublications } from '../../hooks';
import PublicationListWrapper from '../../containers/PublicationListWrapper';

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
                <PublicationListWrapper publications={publications} isLoading={loading} />
            </IonContent>
        </IonPage>
    );
};

export default MyPublications;
