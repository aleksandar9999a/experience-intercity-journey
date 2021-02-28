// Icons
import { searchOutline, addOutline, personOutline } from 'ionicons/icons';

// Interfaces
import { IFabMenuItem } from '../interfaces/interfaces';

const fab_menu_config: IFabMenuItem[] = [
    {
        route: '/search',
        iosIcon: searchOutline,
        mdIcon: searchOutline
    },
    {
        route: '/createPublication',
        iosIcon: addOutline,
        mdIcon: addOutline
    },
    {
        route: '/account',
        iosIcon: personOutline,
        mdIcon: personOutline
    }
]

export default fab_menu_config;