import Account from "../pages/Account";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import CreatePublication from "../pages/CreatePublication";
import Messages from "../pages/Messages";
import Details from "../pages/Details";
import Chat from "../pages/Chat";

const route_config = [
    { path: '/account', component: Account},
    { path: '/login', component: Login },
    { path: '/register', component: Register  },
    { path: '/search', component: Search },
    { path: '/createPublication', component: CreatePublication },
    { path: '/messages', component: Messages },
    { path: '/details/:id', component: Details },
    { path: '/chat/:id', component: Chat },
]


export default route_config;