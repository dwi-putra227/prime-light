import { Link, useLocation } from 'react-router-dom';
import type { IconType } from 'react-icons';
import './Sidebar.scss';

export interface MenuItem {
  id: string;
  label: string;
  icon: IconType;
  path: string;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  logo?: string;
  onLogout?: () => void;
}

function Sidebar({ menuItems, logo = "PrimeLight" }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{logo}</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.id}
              to={item.path} 
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;