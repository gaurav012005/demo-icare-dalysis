import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CalendarView from './components/CalendarView';
import TimeSlotSelection from './components/TimeSlotSelection';
import DoctorSelection from './components/DoctorSelection';
import MachinePreference from './components/MachinePreference';
import PaymentSection from './components/PaymentSection';
import BookingConfirmation from './components/BookingConfirmation';
import EmergencyToggle from './components/EmergencyToggle';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEmergency, setIsEmergency] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // Mock data for available dates
  const availableDates = [
    { date: '2025-08-17', machineCount: 8, doctorCount: 3 },
    { date: '2025-08-18', machineCount: 6, doctorCount: 2 },
    { date: '2025-08-19', machineCount: 10, doctorCount: 4 },
    { date: '2025-08-20', machineCount: 7, doctorCount: 3 },
    { date: '2025-08-21', machineCount: 9, doctorCount: 3 },
    { date: '2025-08-22', machineCount: 5, doctorCount: 2 },
    { date: '2025-08-24', machineCount: 8, doctorCount: 3 },
    { date: '2025-08-25', machineCount: 12, doctorCount: 4 },
    { date: '2025-08-26', machineCount: 6, doctorCount: 2 },
    { date: '2025-08-27', machineCount: 9, doctorCount: 3 }
  ];

  // Mock data for time slots
  const timeSlots = [
    {
      id: 1,
      startTime: '08:00',
      duration: 240,
      status: 'available',
      estimatedWaitTime: 5,
      machineNumber: 3,
      doctorName: 'Dr. Rajesh Kumar',
      doctorSpecialization: 'Nephrologist',
      doctorRating: 4.8,
      isAiSuggested: true
    },
    {
      id: 2,
      startTime: '10:30',
      duration: 240,
      status: 'available',
      estimatedWaitTime: 10,
      machineNumber: 7,
      doctorName: 'Dr. Priya Sharma',
      doctorSpecialization: 'Dialysis Specialist',
      doctorRating: 4.9,
      isAiSuggested: true
    },
    {
      id: 3,
      startTime: '13:00',
      duration: 240,
      status: 'limited',
      estimatedWaitTime: 20,
      machineNumber: 2,
      doctorName: 'Dr. Amit Patel',
      doctorSpecialization: 'Nephrologist',
      doctorRating: 4.7,
      isAiSuggested: false
    },
    {
      id: 4,
      startTime: '15:30',
      duration: 240,
      status: 'available',
      estimatedWaitTime: 8,
      machineNumber: 5,
      doctorName: 'Dr. Sunita Reddy',
      doctorSpecialization: 'Dialysis Specialist',
      doctorRating: 4.6,
      isAiSuggested: true
    }
  ];

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Nephrologist',
      qualification: 'MBBS, MD (Nephrology)',
      experience: 15,
      rating: 4.8,
      reviewCount: 324,
      consultationFee: 800,
      profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      patientsToday: 12,
      location: 'Wing A',
      languages: ['English', 'Hindi', 'Gujarati'],
      specialNotes: 'Specializes in chronic kidney disease management',
      availability: [
        {
          date: '2025-08-17',
          slots: [
            { time: '08:00', status: 'available' },
            { time: '10:30', status: 'available' },
            { time: '13:00', status: 'busy' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialization: 'Dialysis Specialist',
      qualification: 'MBBS, DNB (Nephrology)',
      experience: 12,
      rating: 4.9,
      reviewCount: 287,
      consultationFee: 750,
      profileImage: 'https://images.unsplash.com/photo-1594824388853-d0c3b3b6c5e5?w=400&h=400&fit=crop&crop=face',
      patientsToday: 8,
      location: 'Wing B',
      languages: ['English', 'Hindi', 'Marathi'],
      specialNotes: 'Expert in peritoneal dialysis procedures',
      availability: [
        {
          date: '2025-08-17',
          slots: [
            { time: '08:00', status: 'available' },
            { time: '10:30', status: 'available' },
            { time: '15:30', status: 'available' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialization: 'Nephrologist',
      qualification: 'MBBS, MD, DM (Nephrology)',
      experience: 18,
      rating: 4.7,
      reviewCount: 412,
      consultationFee: 900,
      profileImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face',
      patientsToday: 15,
      location: 'Wing A',
      languages: ['English', 'Hindi', 'Gujarati', 'Punjabi'],
      specialNotes: 'Senior consultant with transplant experience',
      availability: [
        {
          date: '2025-08-17',
          slots: [
            { time: '13:00', status: 'available' },
            { time: '15:30', status: 'busy' }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Dr. Sunita Reddy',
      specialization: 'Dialysis Specialist',
      qualification: 'MBBS, MD (Internal Medicine)',
      experience: 10,
      rating: 4.6,
      reviewCount: 198,
      consultationFee: 700,
      profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      patientsToday: 6,
      location: 'Wing C',
      languages: ['English', 'Hindi', 'Telugu', 'Tamil'],
      specialNotes: 'Focuses on patient comfort and care quality',
      availability: [
        {
          date: '2025-08-17',
          slots: [
            { time: '08:00', status: 'available' },
            { time: '15:30', status: 'available' }
          ]
        }
      ]
    }
  ];

  // Mock data for machines
  const machines = [
    {
      id: 2,
      model: 'Fresenius 5008S',
      status: 'available',
      location: 'Wing A - Room 101',
      lastService: '2025-08-10',
      performance: 98,
      sessionsToday: 3,
      avgSessionTime: 235,
      features: ['Online Clearance', 'Blood Volume Monitor', 'Kt/V Calculator'],
      nextAvailable: null
    },
    {
      id: 3,
      model: 'Baxter AK 200 Ultra S',
      status: 'available',
      location: 'Wing A - Room 102',
      lastService: '2025-08-12',
      performance: 95,
      sessionsToday: 2,
      avgSessionTime: 240,
      features: ['Ultrafiltration Control', 'Sodium Profiling', 'Temperature Control'],
      nextAvailable: null
    },
    {
      id: 5,
      model: 'Nipro Surdial X',
      status: 'available',
      location: 'Wing B - Room 201',
      lastService: '2025-08-08',
      performance: 92,
      sessionsToday: 4,
      avgSessionTime: 245,
      features: ['Biofeedback System', 'Hemodiafiltration', 'Touch Screen'],
      nextAvailable: null
    },
    {
      id: 7,
      model: 'Fresenius 6008 CAREsystem',
      status: 'available',
      location: 'Wing B - Room 203',
      lastService: '2025-08-14',
      performance: 97,
      sessionsToday: 1,
      avgSessionTime: 230,
      features: ['AutoFlow', 'OCM', 'Citrate Dialysis'],
      nextAvailable: null
    },
    {
      id: 1,
      model: 'Gambro AK 96',
      status: 'in-use',
      location: 'Wing A - Room 100',
      lastService: '2025-08-05',
      performance: 89,
      sessionsToday: 5,
      avgSessionTime: 250,
      features: ['Single Needle', 'UF Profiling'],
      nextAvailable: '16:30'
    },
    {
      id: 4,
      model: 'B.Braun Dialog+',
      status: 'maintenance',
      location: 'Wing A - Room 103',
      lastService: '2025-08-16',
      performance: 0,
      sessionsToday: 0,
      avgSessionTime: 0,
      features: ['Hot Disinfection', 'Citrasate'],
      nextAvailable: '2025-08-18 09:00'
    }
  ];

  const steps = [
    { number: 1, title: 'Select Date', icon: 'Calendar' },
    { number: 2, title: 'Choose Time', icon: 'Clock' },
    { number: 3, title: 'Select Doctor', icon: 'User' },
    { number: 4, title: 'Machine Preference', icon: 'Monitor' },
    { number: 5, title: 'Payment', icon: 'CreditCard' },
    { number: 6, title: 'Confirmation', icon: 'CheckCircle' }
  ];

  const canProceedToStep = (step) => {
    switch (step) {
      case 2: return selectedDate;
      case 3: return selectedDate && selectedSlot;
      case 4: return selectedDate && selectedSlot && selectedDoctor;
      case 5: return selectedDate && selectedSlot && selectedDoctor && selectedMachine;
      case 6: return paymentData;
      default: return true;
    }
  };

  const handleNextStep = () => {
    if (currentStep < 6 && canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentComplete = (payment) => {
    setPaymentData(payment);
    
    // Create appointment data
    const appointment = {
      appointmentId: `APT${Date.now()}`,
      date: selectedDate,
      slot: selectedSlot,
      doctor: selectedDoctor,
      machine: selectedMachine,
      isEmergency: isEmergency,
      status: 'confirmed',
      createdAt: new Date()?.toISOString()
    };
    
    setAppointmentData(appointment);
    setCurrentStep(6);
  };

  const handleNewBooking = () => {
    // Reset all state
    setCurrentStep(1);
    setIsEmergency(false);
    setSelectedDate('');
    setSelectedSlot(null);
    setSelectedDoctor(null);
    setSelectedMachine(null);
    setPaymentData(null);
    setAppointmentData(null);
  };

  const handleViewDashboard = () => {
    navigate('/patient-dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            availableDates={availableDates}
          />
        );
      case 2:
        return (
          <TimeSlotSelection
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            onSlotSelect={setSelectedSlot}
            timeSlots={selectedDate ? timeSlots : []}
            isEmergency={isEmergency}
          />
        );
      case 3:
        return (
          <DoctorSelection
            selectedDoctor={selectedDoctor}
            onDoctorSelect={setSelectedDoctor}
            doctors={doctors}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
          />
        );
      case 4:
        return (
          <MachinePreference
            selectedMachine={selectedMachine}
            onMachineSelect={setSelectedMachine}
            machines={machines}
            selectedSlot={selectedSlot}
          />
        );
      case 5:
        return (
          <PaymentSection
            selectedDoctor={selectedDoctor}
            selectedMachine={selectedMachine}
            selectedSlot={selectedSlot}
            isEmergency={isEmergency}
            onPaymentComplete={handlePaymentComplete}
          />
        );
      case 6:
        return (
          <BookingConfirmation
            appointmentData={appointmentData}
            paymentData={paymentData}
            onNewBooking={handleNewBooking}
            onViewDashboard={handleViewDashboard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumb />
      <div className="container mx-auto px-4 py-6 mt-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Appointment</h1>
          <p className="text-muted-foreground">Schedule your dialysis session with AI-powered slot suggestions</p>
        </div>

        {/* Emergency Toggle */}
        {currentStep < 6 && (
          <EmergencyToggle
            isEmergency={isEmergency}
            onToggle={() => setIsEmergency(!isEmergency)}
            disabled={currentStep > 4}
          />
        )}

        {/* Progress Steps */}
        {currentStep < 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps?.map((step, index) => (
                <div key={step?.number} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${currentStep >= step?.number 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-muted-foreground text-muted-foreground'
                    }
                  `}>
                    {currentStep > step?.number ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-2 transition-all duration-200
                      ${currentStep > step?.number ? 'bg-primary' : 'bg-muted'}
                    `} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              {steps?.map((step) => (
                <div key={step?.number} className="text-center">
                  <p className={`font-medium ${
                    currentStep >= step?.number ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 6 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of {steps?.length}
              </p>
            </div>

            <Button
              variant="default"
              onClick={handleNextStep}
              disabled={!canProceedToStep(currentStep + 1)}
              iconName="ChevronRight"
              iconPosition="right"
            >
              {currentStep === 5 ? 'Complete Booking' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;