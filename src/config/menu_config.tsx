import { searchSharp, searchOutline, personOutline, personSharp, chatbubbleEllipsesOutline, chatbubbleEllipsesSharp } from 'ionicons/icons';
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
        title: 'Account',
        url: '/account',
        iosIcon: personOutline,
        mdIcon: personSharp
    }
];

export default menu_config;