import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState('patient');
  const [queueStatus, setQueueStatus] = useState({ position: null, status: 'idle' });

  useEffect(() => {
    // Simulate role detection from JWT token
    const token = localStorage.getItem('authToken');
    if (token) {
      // In real app, decode JWT to get role
      setUserRole(localStorage.getItem('userRole') || 'patient');
    }

    // Simulate real-time notifications
    const mockNotifications = [
      { id: 1, type: 'appointment', message: 'Appointment confirmed for tomorrow 10:00 AM', time: '5 min ago' },
      { id: 2, type: 'queue', message: 'Your queue position: #3', time: '2 min ago' }
    ];
    setNotifications(mockNotifications);

    // Simulate queue status updates
    if (userRole === 'patient') {
      setQueueStatus({ position: 3, status: 'waiting' });
    }
  }, [userRole]);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'admin' ? '/admin-dashboard' : '/patient-dashboard',
      icon: 'LayoutDashboard',
      roles: ['patient', 'admin', 'doctor', 'technician']
    },
    {
      label: 'Appointments',
      path: '/appointment-booking',
      icon: 'Calendar',
      roles: ['patient', 'admin', 'doctor']
    },
    {
      label: 'Medical Records',
      path: '/medical-records',
      icon: 'FileText',
      roles: ['patient', 'admin', 'doctor']
    },
    {
      label: 'Queue Status',
      path: '/real-time-queue-management',
      icon: 'Clock',
      roles: ['patient', 'admin', 'doctor', 'technician'],
      badge: queueStatus?.position
    }
  ];

  const secondaryItems = [
    { label: 'Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'Help', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Emergency', icon: 'AlertTriangle', action: () => console.log('Emergency'), urgent: true }
  ];

  const filteredNavItems = navigationItems?.filter(item => item?.roles?.includes(userRole));

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/login-registration');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border clinical-shadow">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Heart" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-foreground">LifeCare</h1>
            <p className="text-xs text-muted-foreground">Dialysis Centre</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {filteredNavItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              className="relative"
            >
              {item?.label}
              {item?.badge && (
                <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                  {item?.badge}
                </span>
              )}
            </Button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Real-time Status Indicator */}
          {queueStatus?.position && (
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-warning/10 text-warning rounded-md">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">Queue #{queueStatus?.position}</span>
            </div>
          )}

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications?.length}
                </span>
              )}
            </Button>
          </div>

          {/* More Menu - Desktop */}
          <div className="hidden lg:block relative">
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" size={20} />
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-foreground capitalize">{userRole}</p>
              <p className="text-xs text-muted-foreground">John Doe</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <Icon name="LogOut" size={20} />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-in-from-top">
          <nav className="px-4 py-4 space-y-2">
            {filteredNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                fullWidth
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                className="justify-start relative"
              >
                {item?.label}
                {item?.badge && (
                  <span className="ml-auto bg-warning text-warning-foreground text-xs rounded-full px-2 py-0.5">
                    {item?.badge}
                  </span>
                )}
              </Button>
            ))}
            
            <div className="border-t border-border pt-2 mt-4">
              {secondaryItems?.map((item) => (
                <Button
                  key={item?.label}
                  variant={item?.urgent ? "destructive" : "ghost"}
                  fullWidth
                  onClick={item?.action}
                  iconName={item?.icon}
                  iconPosition="left"
                  className="justify-start"
                >
                  {item?.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;