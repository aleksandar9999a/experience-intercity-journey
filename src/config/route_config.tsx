import Account from "../pages/Account";
import Contacts from "../pages/Contacts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import TRoute from "../types/TRoute";
import CreatePublication from "../pages/CreatePublication";
import Settings from "../pages/Settings";
import Messages from "../pages/Messages";

const route_config: TRoute = {
    account: Account,
    contacts: Contacts,
    login: Login,
    register: Register,
    search: Search,
    createPublication: CreatePublication,
    settings: Settings,
    messages: Messages
}

export default route_config;