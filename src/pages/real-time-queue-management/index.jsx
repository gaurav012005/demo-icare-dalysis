import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QueueStatusCard from './components/QueueStatusCard';
import MachineStatusGrid from './components/MachineStatusGrid';
import QueueTimeline from './components/QueueTimeline';
import EmergencyBookingPanel from './components/EmergencyBookingPanel';
import PatientWaitTimeDisplay from './components/PatientWaitTimeDisplay';

const RealTimeQueueManagement = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date()?.toLocaleTimeString());
  const [activeTab, setActiveTab] = useState('overview');
  const [isEmergencyPanelOpen, setIsEmergencyPanelOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [userRole, setUserRole] = useState('patient');
  const [queueData, setQueueData] = useState({
    patients: [],
    machines: [],
    timeSlots: []
  });
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('userRole') || 'patient';
    setUserRole(role);

    // Initialize mock data
    initializeMockData();

    // Set up real-time clock
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date()?.toLocaleTimeString());
    }, 1000);

    // Simulate WebSocket connection for real-time updates
    const updateInterval = setInterval(() => {
      simulateRealTimeUpdates();
    }, 30000); // Update every 30 seconds

    return () => {
      clearInterval(timeInterval);
      clearInterval(updateInterval);
    };
  }, []);

  const initializeMockData = () => {
    const mockPatients = [
      {
        id: 'P001',
        name: 'Rajesh Kumar',
        appointmentTime: '10:00',
        status: 'in-treatment',
        machineNumber: 3,
        estimatedDuration: 4,
        waitTime: '0 min',
        priority: 'normal',
        treatmentProgress: 65
      },
      {
        id: 'P002',
        name: 'Priya Sharma',
        appointmentTime: '10:30',
        status: 'waiting',
        machineNumber: 5,
        estimatedDuration: 4,
        waitTime: '15 min',
        priority: 'normal',
        treatmentProgress: 0
      },
      {
        id: 'P003',
        name: 'Amit Patel',
        appointmentTime: '11:00',
        status: 'checked-in',
        machineNumber: 2,
        estimatedDuration: 3.5,
        waitTime: '25 min',
        priority: 'urgent',
        treatmentProgress: 0
      },
      {
        id: 'P004',
        name: 'Sunita Devi',
        appointmentTime: '09:30',
        status: 'completed',
        machineNumber: 1,
        estimatedDuration: 4,
        waitTime: '0 min',
        priority: 'normal',
        treatmentProgress: 100
      },
      {
        id: 'P005',
        name: 'Vikram Singh',
        appointmentTime: '11:30',
        status: 'emergency',
        machineNumber: 4,
        estimatedDuration: 4,
        waitTime: '5 min',
        priority: 'emergency',
        treatmentProgress: 0
      }
    ];

    const mockMachines = [
      {
        id: 'M001',
        number: 1,
        status: 'available',
        nextAppointment: '12:00'
      },
      {
        id: 'M002',
        number: 2,
        status: 'in-use',
        currentPatient: 'Amit Patel',
        timeRemaining: '2h 30m'
      },
      {
        id: 'M003',
        number: 3,
        status: 'in-use',
        currentPatient: 'Rajesh Kumar',
        timeRemaining: '1h 45m'
      },
      {
        id: 'M004',
        number: 4,
        status: 'in-use',
        currentPatient: 'Vikram Singh',
        timeRemaining: '3h 55m'
      },
      {
        id: 'M005',
        number: 5,
        status: 'available',
        nextAppointment: '13:00'
      },
      {
        id: 'M006',
        number: 6,
        status: 'maintenance',
        maintenanceUntil: '15:00'
      },
      {
        id: 'M007',
        number: 7,
        status: 'available',
        nextAppointment: '14:00'
      },
      {
        id: 'M008',
        number: 8,
        status: 'offline'
      }
    ];

    const mockTimeSlots = [
      {
        hour: 9,
        scheduledPatients: 3,
        capacity: 4,
        utilization: 75,
        patients: [
          { name: 'Sunita Devi', machine: 1 },
          { name: 'Ravi Gupta', machine: 2 },
          { name: 'Meera Joshi', machine: 3 }
        ]
      },
      {
        hour: 10,
        scheduledPatients: 4,
        capacity: 4,
        utilization: 100,
        patients: [
          { name: 'Rajesh Kumar', machine: 3 },
          { name: 'Priya Sharma', machine: 5 },
          { name: 'Amit Patel', machine: 2 },
          { name: 'Kavita Singh', machine: 7 }
        ]
      },
      {
        hour: 11,
        scheduledPatients: 5,
        capacity: 4,
        utilization: 125,
        patients: [
          { name: 'Vikram Singh', machine: 4, status: 'emergency' },
          { name: 'Deepak Yadav', machine: 1 },
          { name: 'Anita Kumari', machine: 5 },
          { name: 'Suresh Babu', machine: 7 },
          { name: 'Lakshmi Nair', machine: 8 }
        ],
        bottleneck: 'Emergency booking caused overbooking. Consider rescheduling non-urgent appointments.'
      },
      {
        hour: 12,
        scheduledPatients: 3,
        capacity: 4,
        utilization: 75,
        patients: [
          { name: 'Ramesh Chand', machine: 2 },
          { name: 'Geeta Devi', machine: 3 },
          { name: 'Mukesh Kumar', machine: 5 }
        ]
      }
    ];

    setQueueData({
      patients: mockPatients,
      machines: mockMachines,
      timeSlots: mockTimeSlots
    });
  };

  const simulateRealTimeUpdates = () => {
    setQueueData(prevData => {
      const updatedPatients = prevData?.patients?.map(patient => {
        if (patient?.status === 'in-treatment' && patient?.treatmentProgress < 100) {
          return {
            ...patient,
            treatmentProgress: Math.min(patient?.treatmentProgress + Math.random() * 10, 100)
          };
        }
        return patient;
      });

      return {
        ...prevData,
        patients: updatedPatients
      };
    });

    setLastUpdate(new Date());
  };

  const handlePatientDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const handleMachineClick = (machine) => {
    console.log('Machine clicked:', machine);
  };

  const handleEmergencyBooking = (emergencyData) => {
    console.log('Emergency booking created:', emergencyData);
    // In real app, this would trigger queue rearrangement
    setQueueData(prevData => ({
      ...prevData,
      patients: [
        {
          id: emergencyData?.id,
          name: emergencyData?.patientName,
          appointmentTime: emergencyData?.estimatedSlot,
          status: 'emergency',
          machineNumber: 1,
          estimatedDuration: 4,
          waitTime: '0 min',
          priority: 'emergency',
          treatmentProgress: 0
        },
        ...prevData?.patients
      ]
    }));
  };

  const handleNotificationToggle = (enabled) => {
    console.log('Notifications', enabled ? 'enabled' : 'disabled');
  };

  const tabs = [
    { id: 'overview', label: 'Queue Overview', icon: 'LayoutDashboard' },
    { id: 'machines', label: 'Machine Status', icon: 'Monitor' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    ...(userRole === 'patient' ? [{ id: 'personal', label: 'My Status', icon: 'User' }] : [])
  ];

  const canAccessEmergencyBooking = ['admin', 'doctor']?.includes(userRole);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      <div className="pt-4 pb-8 px-4 lg:px-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Real-time Queue Management</h1>
            <p className="text-muted-foreground">
              Live patient flow and machine availability monitoring
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-muted-foreground">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last update: {lastUpdate?.toLocaleTimeString()}
            </div>

            {canAccessEmergencyBooking && (
              <Button
                variant="destructive"
                onClick={() => setIsEmergencyPanelOpen(true)}
                iconName="AlertTriangle"
                iconPosition="left"
              >
                Emergency Booking
              </Button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4 clinical-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                      <p className="text-2xl font-bold text-foreground">{queueData?.patients?.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 clinical-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="Activity" size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Treatment</p>
                      <p className="text-2xl font-bold text-foreground">
                        {queueData?.patients?.filter(p => p?.status === 'in-treatment')?.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 clinical-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Waiting</p>
                      <p className="text-2xl font-bold text-foreground">
                        {queueData?.patients?.filter(p => p?.status === 'waiting')?.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 clinical-shadow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon name="AlertTriangle" size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Emergency</p>
                      <p className="text-2xl font-bold text-foreground">
                        {queueData?.patients?.filter(p => p?.status === 'emergency')?.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Queue Cards */}
              <div className="bg-card border border-border rounded-lg p-6 clinical-shadow">
                <h2 className="text-xl font-semibold text-foreground mb-4">Current Queue</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {queueData?.patients?.map((patient) => (
                    <QueueStatusCard
                      key={patient?.id}
                      patient={patient}
                      onViewDetails={handlePatientDetails}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'machines' && (
            <MachineStatusGrid
              machines={queueData?.machines}
              onMachineClick={handleMachineClick}
            />
          )}

          {activeTab === 'timeline' && (
            <QueueTimeline
              timeSlots={queueData?.timeSlots}
              currentTime={currentTime}
            />
          )}

          {activeTab === 'personal' && userRole === 'patient' && (
            <PatientWaitTimeDisplay
              currentUser={{ id: 'P002', name: 'Current User' }}
              queueData={queueData}
              onNotificationToggle={handleNotificationToggle}
            />
          )}
        </div>
      </div>
      {/* Emergency Booking Panel */}
      <EmergencyBookingPanel
        isVisible={isEmergencyPanelOpen}
        onClose={() => setIsEmergencyPanelOpen(false)}
        onEmergencyBooking={handleEmergencyBooking}
      />
      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md clinical-shadow-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Patient Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPatient(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium text-foreground">{selectedPatient?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient ID</p>
                <p className="font-medium text-foreground">{selectedPatient?.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium text-foreground capitalize">
                  {selectedPatient?.status?.replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Appointment Time</p>
                <p className="font-medium text-foreground">{selectedPatient?.appointmentTime}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Machine Number</p>
                <p className="font-medium text-foreground">#{selectedPatient?.machineNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeQueueManagement;