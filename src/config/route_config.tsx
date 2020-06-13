import Account from "../pages/Account";
import Contacts from "../pages/Contacts";
import Login from "../pages/Login";
import Publications from "../pages/Publications";
import Register from "../pages/Register";
import Search from "../pages/Search";
import TRoute from "../types/TRoute";

const route_config: TRoute = {
    account: Account,
    contacts: Contacts,
    login: Login,
    publications: Publications,
    register: Register,
    search: Search
}

export default route_config;