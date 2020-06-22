import { searchSharp, searchOutline, personOutline, personSharp, chatbubbleEllipsesOutline, chatbubbleEllipsesSharp, addOutline, addSharp, albumsOutline, albumsSharp } from 'ionicons/icons';
import IAppPage from '../interfaces/IAppPage';

const menu_config: IAppPage[] = [
    {
        title: 'Search',
        url: '/search',
        iosIcon: searchOutline,
        mdIcon: searchSharp
    },
    {
        title: 'Create Publication',
        url: '/createPublication',
        iosIcon: addOutline,
        mdIcon: addSharp
    },
    {
        title: 'My Publications',
        url: '/myPublications',
        iosIcon: albumsOutline,
        mdIcon: albumsSharp
    },
    {
        title: 'Messages',
        url: '/messages',
        iosIcon: chatbubbleEllipsesOutline,
        mdIcon: chatbubbleEllipsesSharp
    },
    {
        title: 'Account',
        url: '/account',
        iosIcon: personOutline,
        mdIcon: personSharp
    }
];

export default menu_config;