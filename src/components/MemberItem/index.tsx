import assets from "../../config/assets"
import React from 'react';
import { IonItem, IonAvatar, IonLabel } from "@ionic/react"
import IMemberItems from "../../interfaces/IMemberItems";

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