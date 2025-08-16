import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [users, setUsers] = useState([
    {
      id: 'U001',
      name: 'Dr. Rajesh Sharma',
      email: 'rajesh.sharma@lifecare.com',
      role: 'doctor',
      status: 'active',
      lastLogin: '2025-08-16 09:30',
      department: 'Nephrology',
      phone: '+91 98765 43210'
    },
    {
      id: 'U002',
      name: 'Priya Technician',
      email: 'priya.tech@lifecare.com',
      role: 'technician',
      status: 'active',
      lastLogin: '2025-08-16 08:15',
      department: 'Dialysis Unit',
      phone: '+91 98765 43211'
    },
    {
      id: 'U003',
      name: 'Amit Kumar',
      email: 'amit.patient@gmail.com',
      role: 'patient',
      status: 'active',
      lastLogin: '2025-08-15 16:45',
      department: 'Patient',
      phone: '+91 98765 43212'
    },
    {
      id: 'U004',
      name: 'Dr. Anita Verma',
      email: 'anita.verma@lifecare.com',
      role: 'doctor',
      status: 'pending',
      lastLogin: 'Never',
      department: 'Nephrology',
      phone: '+91 98765 43213'
    }
  ]);

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Administrator' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'technician', label: 'Technician' },
    { value: 'patient', label: 'Patient' }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-error text-error-foreground';
      case 'doctor':
        return 'bg-primary text-primary-foreground';
      case 'technician':
        return 'bg-accent text-accent-foreground';
      case 'patient':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'suspended':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleActivateUser = (userId) => {
    setUsers(users?.map(user => 
      user?.id === userId 
        ? { ...user, status: 'active' }
        : user
    ));
  };

  const handleSuspendUser = (userId) => {
    setUsers(users?.map(user => 
      user?.id === userId 
        ? { ...user, status: 'suspended' }
        : user
    ));
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = selectedRole === 'all' || user?.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Icon name="Users" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              <p className="text-sm text-muted-foreground">Manage system users and permissions</p>
            </div>
          </div>
          <Button variant="default" size="sm" iconName="UserPlus">
            Add User
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="flex-1"
          />
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            className="w-40"
          />
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredUsers?.map((user) => (
            <div key={user?.id} className="border border-border rounded-lg p-4 bg-muted/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{user?.name}</h4>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">{user?.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span><strong>Department:</strong> {user?.department}</span>
                  <span><strong>Last Login:</strong> {user?.lastLogin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  {user?.status === 'pending' && (
                    <Button 
                      variant="success" 
                      size="sm" 
                      iconName="Check"
                      onClick={() => handleActivateUser(user?.id)}
                    >
                      Activate
                    </Button>
                  )}
                  {user?.status === 'active' && (
                    <Button 
                      variant="warning" 
                      size="sm" 
                      iconName="Pause"
                      onClick={() => handleSuspendUser(user?.id)}
                    >
                      Suspend
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" iconName="Trash2">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-3" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Users Found</h4>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementSection;