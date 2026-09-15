
import { NavLink } from 'react-router-dom';
import { User, Users, Activity, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const navItems = [
    { to: '/', icon: Activity, label: 'Dashboard' },
    { to: '/doctors', icon: User, label: 'Doctors' },
    { to: '/patients', icon: Users, label: 'Patients' },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">HealthAdmin</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <nav className="mt-8">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 hover:bg-blue-50 hover:text-blue-600",
                isActive
                  ? "bg-blue-100 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
