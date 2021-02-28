import React from 'react';

// Assets
import assets from "../../config/assets"

// Components
import { IonItem, IonAvatar, IonLabel } from "@ionic/react"

// Interfaces
import { IMemberItems } from '../../interfaces/interfaces';

const MemberItem: React.FC<IMemberItems> = ({ image = assets.anonym, firstName, lastName }) => {
    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={image} alt="member" />
            </IonAvatar>

            <IonLabel>
                <h2>{firstName}</h2>

                <h3>{lastName}</h3>
            </IonLabel>
        </IonItem>
    )
}

export default MemberItem;