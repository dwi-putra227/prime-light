import { 
    FaHome, 
    FaBox, 
    FaClipboardList, 
    FaCog,
  } from 'react-icons/fa';
  import type { MenuItem } from '../components/Sidebar/Sidebar';
  
  export const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FaHome,
      path: '/dashboard'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: FaBox,
      path: '/inventory'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: FaClipboardList,
      path: '/orders'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FaCog,
      path: '/settings'
    }
  ];
