import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import route_config from './../../config/route_config';

const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    const [Component, setComponent] = useState<React.FC>();

    useEffect(() => {
        if (typeof route_config[name] === 'function') {
            setComponent(route_config[name]);
        }
    }, [name])
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {Component}
            </IonContent>
        </IonPage>
    );
};

export default Page;
