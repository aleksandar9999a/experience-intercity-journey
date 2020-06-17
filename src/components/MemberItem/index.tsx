import assets from "../../config/assets"
import React from 'react';
import { IonItem, IonAvatar, IonLabel } from "@ionic/react"

const MemberItem: React.FC<{ image?: string, firstName: string, lastName: string }> = ({ image = assets.anonym, firstName, lastName }) => {
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