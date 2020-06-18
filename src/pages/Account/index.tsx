import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../../config/firebase';
import { IonLoading } from '@ionic/react';
import MyProfile from '../../containers/MyProfile';

const Account: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) { return <IonLoading cssClass='my-custom-class' isOpen={loading} message={'Please wait...'} /> }
  if (error) { return <div className="error-page"> <h1>{error.message}</h1></div> }
  if (!user) { return <div className="error-page"> <h1>Unauthorized</h1></div> }

  return <MyProfile uid={user.uid} />
};



export default Account;
