import { role } from "./utils/check_roles";

export const nav_super_admin = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Users',
      url: '/Users',
      icon: 'icon-drop',
    },
    {
      name: 'Categories',
      url: '/Categories',
      icon: 'icon-drop',
    },
    {
      name: 'Orders',
      url: `/Orders`,
      icon: 'icon-drop',
    },
    {
      title: true,
      name: 'Manage Foods',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Foods',
      url: '/Foods',
      icon: 'icon-drop',
    },
    {
      title: true,
      name: 'Manage Restaurants',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Restaurants',
      url: '/Restaurants',
      icon: 'icon-drop',
    },
    {
      name: 'Restaurant Users',
      url: '/Restaurant_users',
      icon: 'icon-drop',
    },
    {
      name: 'Restaurant Emails',
      url: '/Restaurant_emails',
      icon: 'icon-drop',
    }
  ],
};

//asidebar nav admin
export const nav_admin = {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Users',
      url: `/Users`,
      icon: 'icon-drop',
    },
    {
      name: 'Categories',
      url: `${role}/Categories`,
      icon: 'icon-drop',
    },
    {
      name: 'Orders',
      url: `${role}/Orders`,
      icon: 'icon-drop',
    },
    {
      title: true,
      name: 'Manage Foods',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Foods',
      url: `${role}/Foods`,
      icon: 'icon-drop',
    },
    {
      title: true,
      name: 'Manage Restaurants',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Restaurants',
      url: `${role}/Restaurants`,
      icon: 'icon-drop',
    },
    {
      name: 'Restaurant Users',
      url: `${role}/Restaurant_users`,
      icon: 'icon-drop',
    },
    {
      name: 'Restaurant Emails',
      url: `${role}/Restaurant_emails`,
      icon: 'icon-drop',
    }
  ],
};
