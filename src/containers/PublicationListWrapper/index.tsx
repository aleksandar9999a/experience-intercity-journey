import React from 'react';
import { IonSpinner } from '@ionic/react';
import IPublicationListWrapper from '../../interfaces/IPublicationListWrapper';
import PublicationList from '../PublicationList';
import './style.css';

const PublicationListWrapper: React.FC<IPublicationListWrapper> = ({ publications, isLoading }) => {
    if (isLoading) {
        return <div className="loading-publications"><IonSpinner className="spinner" /></div>
    }

    return <PublicationList publications={publications} />
};

export default PublicationListWrapper;
