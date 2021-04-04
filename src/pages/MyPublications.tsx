import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

// Components
import { PublicationListItem } from '../components/PublicationListItem';
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


export const MyPublications = observer(({ userService, publicationsService, pixabayService }: IMyPublicationsProps) => {
    const [publications, setPublications] = useState<IPublication[]>([]);

    useEffect(() => {
        publicationsService.getMany({ searchBy: 'creatorId', opStr: '==', search: userService.user!.uid })
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

                {publicationsService.isLoading && (
                    <div className="loading-publications">
                        <IonSpinner className="spinner" />
                    </div>
                )}

                {!publicationsService.isLoading && (
                    <IonList>
                        {publications.map(x => {
                            return <PublicationListItem key={x.id} data={x} pixabayService={pixabayService} />
                        })}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
})
