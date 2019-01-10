import {
    AccountsPage,
    AppsPage,
    GroupsPage,
    // LoginPage,
    OverviewPage,
    ReportsPage,
    SendMessagePage,
    SettingsPage,
    UsersPage
  } from './pages';

export default {
    appName: "TSF SMS(GATEWAY)"
}

export const SidebarMenus = [
    {
        name: "Dashboard",
        url: "/overview",
        icon: "meter",
        protected: true,
        component: OverviewPage,
        roles: ['view-apps'],
        sidebar: {
            position: 1
        }
    },
    {
        name: "Settings",
        url: "/settings",
        icon: "meter",
        protected: true,
        component: SettingsPage,
        roles: ['view-settings']
    },
    {
        name: "Account",
        url: "/account",
        icon: "meter",
        protected: true,
        component: AccountsPage,
        roles: ['view-apps']
    },
    {
        name: "Send Messages",
        url: "/send-message",
        icon: "podcast",
        protected: true,
        component: SendMessagePage,
        roles: ['send-message'],
        sidebar: {
            position: 2
        }
    },
    {
        name: "Reports",
        url: "/reports",
        icon: "reports",
        protected: true,
        component: ReportsPage,
        roles: ['view-reports'],
        sidebar: {
            position: 3
        }
    },
    {
        name: "Apps",
        url: "/apps",
        icon: "sphere",
        protected: true,
        component: AppsPage,
        roles: ['view-apps'],
        sidebar: {
            position: 4
        }
    },
    {
        name: "Users",
        url: "/users",
        icon: "users",
        protected: true,
        component: UsersPage,
        roles: ['view-users'],
        sidebar: {
            position: 5
        }
    },
    {
        name: "Groups",
        url: "/groups",
        icon: "users",        
        protected: true,
        component: GroupsPage,
        roles: ['view-groups'],
        sidebar: {
            position: 6
        }
    }
];
 