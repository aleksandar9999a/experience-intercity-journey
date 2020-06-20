import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu';
import FabMenu from '../../components/FabMenu';
import Toast from '../../components/Toast';
import IUser from '../../interfaces/IUser';
import { myUserdata } from '../../services';

const MenuContainer: React.FC = () => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const sub = myUserdata.subscribe((userdata) => setUser(userdata));
        return () => { sub.unsubscribe(); }
    }, [])

    if (!user) { return null; }

    return (
        <div>
            <Menu firstName={user.firstName} lastName={user.lastName} image={user.image} />
            <FabMenu />
            <Toast />
        </div>
    );
};

export default MenuContainer;
