import React from 'react';
import { useParams } from 'react-router';
import { Toast } from '../../components/Toast';
import CurrentPage from '../CurrentPage';

const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    return (
        <div>
            <CurrentPage name={name} />
            <Toast />
        </div>
    );
};

export default Page;
