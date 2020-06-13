import { searchSharp, searchOutline, albumsSharp, albumsOutline, chatbubblesSharp, chatbubblesOutline, personOutline, personSharp } from 'ionicons/icons';
import IAppPage from '../interfaces/IAppPage';

const menu_config: IAppPage[] = [
    {
        title: 'Search',
        url: '/search',
        iosIcon: searchOutline,
        mdIcon: searchSharp
    },
    {
        title: 'Publications',
        url: '/publications',
        iosIcon: albumsOutline,
        mdIcon: albumsSharp
    },
    {
        title: 'Contacts',
        url: '/contacts',
        iosIcon: chatbubblesOutline,
        mdIcon: chatbubblesSharp
    },
    {
        title: 'Account',
        url: '/account',
        iosIcon: personOutline,
        mdIcon: personSharp
    }
];

export default menu_config;