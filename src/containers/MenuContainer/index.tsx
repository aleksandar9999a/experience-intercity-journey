import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import FabMenu from '../../components/FabMenu';
import { Toast } from '../../components/Toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import IUser from '../../interfaces/IUser';
import { getUserdata } from '../../services';
import { submitMessage } from '../../services/toast';

const MenuContainer: React.FC = () => {
    const [user] = useAuthState(auth);
    const [userdata, setUserdata] = useState<IUser>();

    useEffect(() => {
        if(!user) { return; }
        getUserdata(user.uid).onSnapshot(doc => {
            if (!doc.exists) { submitMessage('User document does not exist!'); return; }
            setUserdata(doc.data() as IUser)
          })
    }, [user])

    if(!user || !userdata) { return null; }
    
    return (
        <div>
            <Menu firstName={userdata.firstName} lastName={userdata.lastName} image={userdata.image} />
            <FabMenu />
            <Toast />
        </div>
    );
};

export default MenuContainer;
