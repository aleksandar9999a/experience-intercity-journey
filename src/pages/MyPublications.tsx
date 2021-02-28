import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

// Components
import PublicationListItem from '../components/PublicationListItem';
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonSpinner
} from '@ionic/react';

// Interfaces
import { IMyPublicationsProps, IPublication } from '../interfaces/interfaces';


export const MyPublications = observer(({ authManager, publicationsManager }: IMyPublicationsProps) => {
    const [publications, setPublications] = useState<IPublication[]>([]);

    useEffect(() => {
        publicationsManager.getMany({ searchBy: 'creatorId', opStr: '==', search: authManager.user!.uid })
            .then(items => {
                setPublications(items as IPublication[]);
            })
    }, [])

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle className="title">
                            My Publications
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>

                {publicationsManager.isLoading && (
                    <div className="loading-publications">
                        <IonSpinner className="spinner" />
                    </div>
                )}

                {!publicationsManager.isLoading && (
                    <IonList>
                        {publications.map(x => {
                            return <PublicationListItem key={x.id} data={x} />
                        })}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
})
