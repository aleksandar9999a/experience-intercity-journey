import { searchSharp, searchOutline, albumsSharp, albumsOutline, personOutline, personSharp, chatbubbleEllipsesOutline, chatbubbleEllipsesSharp, optionsSharp } from 'ionicons/icons';
import IAppPage from '../interfaces/IAppPage';

const menu_config: IAppPage[] = [
    {
        title: 'Search',
        url: '/search',
        iosIcon: searchOutline,
        mdIcon: searchSharp
    },
    {
        title: 'Messages',
        url: '/messages',
        iosIcon: chatbubbleEllipsesOutline,
        mdIcon: chatbubbleEllipsesSharp
    },
    {
        title: 'Contacts',
        url: '/contacts',
        iosIcon: albumsOutline,
        mdIcon: albumsSharp
    },
    {
        title: 'Account',
        url: '/account',
        iosIcon: personOutline,
        mdIcon: personSharp
    },
    {
        title: 'Settings',
        url: '/settings',
        iosIcon: optionsSharp,
        mdIcon: optionsSharp
    }
];

export default menu_config;