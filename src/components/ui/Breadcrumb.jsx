import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/login-registration': 'Login & Registration',
    '/patient-dashboard': 'Patient Dashboard',
    '/appointment-booking': 'Book Appointment',
    '/admin-dashboard': 'Admin Dashboard',
    '/medical-records': 'Medical Records',
    '/real-time-queue-management': 'Queue Management'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always include home/dashboard as first item
    const userRole = localStorage.getItem('userRole') || 'patient';
    const homePath = userRole === 'admin' ? '/admin-dashboard' : '/patient-dashboard';
    const homeLabel = userRole === 'admin' ? 'Admin Dashboard' : 'Dashboard';

    if (location?.pathname !== homePath) {
      breadcrumbs?.push({
        label: homeLabel,
        path: homePath,
        isClickable: true
      });
    }

    // Add current page if it's not the home page
    if (location?.pathname !== homePath && pathMap?.[location?.pathname]) {
      breadcrumbs?.push({
        label: pathMap?.[location?.pathname],
        path: location?.pathname,
        isClickable: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on login page or if only one item
  if (location?.pathname === '/login-registration' || breadcrumbs?.length <= 1) {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 px-4 lg:px-6 py-3 bg-muted/30 border-b border-border text-sm">
      <Icon name="Home" size={16} className="text-muted-foreground" />
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          
          {crumb?.isClickable ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleBreadcrumbClick(crumb?.path)}
              className="h-auto p-0 text-primary hover:text-primary/80 font-normal"
            >
              {crumb?.label}
            </Button>
          ) : (
            <span className="text-foreground font-medium">{crumb?.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;