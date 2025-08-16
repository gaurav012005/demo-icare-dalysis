import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock real-time notifications
    const mockNotifications = [
      {
        id: 'NOT-001',
        type: 'appointment',
        title: 'Appointment Confirmed',
        message: 'Your dialysis session for tomorrow 10:00 AM has been confirmed.',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        read: false,
        priority: 'normal'
      },
      {
        id: 'NOT-002',
        type: 'queue',
        title: 'Queue Update',
        message: 'Your queue position has been updated to #3. Estimated wait: 45 minutes.',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        read: false,
        priority: 'normal'
      },
      {
        id: 'NOT-003',
        type: 'payment',
        title: 'Payment Successful',
        message: 'Payment of ₹2,500.00 for dialysis session has been processed successfully.',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        read: true,
        priority: 'normal'
      },
      {
        id: 'NOT-004',
        type: 'emergency',
        title: 'Emergency Alert',
        message: 'Please contact the center immediately regarding your upcoming appointment.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: false,
        priority: 'high'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications?.filter(n => !n?.read)?.length);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newNotification = {
        id: `NOT-${Date.now()}`,
        type: 'queue',
        title: 'Queue Position Updated',
        message: `Your queue position is now #${Math.floor(Math.random() * 5) + 1}`,
        timestamp: new Date(),
        read: false,
        priority: 'normal'
      };

      setNotifications(prev => [newNotification, ...prev?.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment':
        return 'Calendar';
      case 'queue':
        return 'Clock';
      case 'payment':
        return 'CreditCard';
      case 'emergency':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    switch (type) {
      case 'appointment':
        return 'text-primary';
      case 'queue':
        return 'text-warning';
      case 'payment':
        return 'text-success';
      case 'emergency':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev?.map(n =>
        n?.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div className="bg-card rounded-lg border border-border clinical-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              onClick={handleClearAll}
            />
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                  notification?.read
                    ? 'border-border bg-card hover:bg-muted/30' :'border-primary/20 bg-primary/5 hover:bg-primary/10'
                } ${notification?.priority === 'high' ? 'border-error/50 bg-error/5' : ''}`}
                onClick={() => !notification?.read && handleMarkAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    notification?.priority === 'high' ? 'bg-error/10' : 'bg-muted/30'
                  }`}>
                    <Icon
                      name={getNotificationIcon(notification?.type)}
                      size={16}
                      className={getNotificationColor(notification?.type, notification?.priority)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${
                        notification?.read ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {notification?.title}
                      </h4>
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className={`text-sm ${
                      notification?.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification?.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTimestamp(notification?.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;