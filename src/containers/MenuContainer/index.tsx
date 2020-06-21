import React from 'react';
import Menu from '../../components/Menu';
import FabMenu from '../../components/FabMenu';
import Toast from '../../components/Toast';
import { useLocation } from 'react-router';
import { useMyUserData } from '../../hooks';

const MenuContainer: React.FC = () => {
    const user = useMyUserData();
    const location = useLocation();

    if (!user) { return <Toast />; }

    return (
        <div>
            <Menu firstName={user.firstName} lastName={user.lastName} image={user.image} />
            {!location.pathname.includes('chat') && <FabMenu />}
            <Toast />
        </div>
    );
};

export default MenuContainer;
