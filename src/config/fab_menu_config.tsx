import IFabMenuItem from "../interfaces/IFabMenuItem";
import { searchOutline, addOutline, personOutline } from "ionicons/icons";

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