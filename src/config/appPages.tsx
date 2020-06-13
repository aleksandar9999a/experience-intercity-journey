import { archiveOutline, archiveSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import IAppPage from '../interfaces/IAppPage';

const appPages: IAppPage[] = [
    {
        title: 'Inbox',
        url: '/page/Inbox',
        iosIcon: mailOutline,
        mdIcon: mailSharp
    },
    {
        title: 'Outbox',
        url: '/page/Outbox',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Favorites',
        url: '/page/Favorites',
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Archived',
        url: '/page/Archived',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
    },
    {
        title: 'Trash',
        url: '/page/Trash',
        iosIcon: trashOutline,
        mdIcon: trashSharp
    },
    {
        title: 'Spam',
        url: '/page/Spam',
        iosIcon: warningOutline,
        mdIcon: warningSharp
    }
];

export default appPages;