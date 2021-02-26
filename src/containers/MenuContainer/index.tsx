import React from 'react';
import Menu from './../Menu';
import FabMenu from './../FabMenu';
import Toast from '../../components/Toast';
import { useLocation } from 'react-router';
import { useMyUserData } from '../../hooks';

const MenuContainer: React.FC = () => {
    const user = useMyUserData();
    const location = useLocation();

    return user
        ? (
            <div>
                <Menu firstName={user.firstName} lastName={user.lastName} image={user.image} />

                {!location.pathname.includes('chat') && <FabMenu />}
                <Toast />
            </div>
        )
        : (
            <Toast />
        )
};

export default MenuContainer;
