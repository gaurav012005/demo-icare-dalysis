import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ 
  appointmentData, 
  paymentData, 
  onNewBooking, 
  onViewDashboard 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const downloadReceipt = () => {
    // Simulate receipt download
    const receiptData = {
      appointmentId: appointmentData?.appointmentId,
      transactionId: paymentData?.transactionId,
      amount: paymentData?.amount,
      timestamp: paymentData?.timestamp
    };
    
    console.log('Downloading receipt:', receiptData);
    // In real implementation, this would generate and download a PDF
  };

  const addToCalendar = () => {
    // Simulate calendar integration
    const calendarEvent = {
      title: `Dialysis Appointment - Dr. ${appointmentData?.doctor?.name}`,
      start: `${appointmentData?.date}T${appointmentData?.slot?.startTime}`,
      duration: appointmentData?.slot?.duration,
      location: `LifeCare Dialysis Centre - Machine #${appointmentData?.machine?.id}`
    };
    
    console.log('Adding to calendar:', calendarEvent);
    // In real implementation, this would integrate with calendar APIs
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Appointment Confirmed!</h2>
        <p className="text-muted-foreground">Your dialysis appointment has been successfully booked and payment processed.</p>
      </div>
      {/* Appointment Details Card */}
      <div className="bg-card rounded-lg border border-border p-6 clinical-shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Appointment Details</h3>
          <div className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium">
            ID: {appointmentData?.appointmentId}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium text-foreground">{formatDate(appointmentData?.date)}</p>
                <p className="font-medium text-foreground">
                  {formatTime(appointmentData?.slot?.startTime)} ({appointmentData?.slot?.duration} mins)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="User" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-medium text-foreground">{appointmentData?.doctor?.name}</p>
                <p className="text-sm text-muted-foreground">{appointmentData?.doctor?.specialization}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Monitor" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Machine</p>
                <p className="font-medium text-foreground">Machine #{appointmentData?.machine?.id}</p>
                <p className="text-sm text-muted-foreground">{appointmentData?.machine?.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">LifeCare Dialysis Centre</p>
                <p className="text-sm text-muted-foreground">123 Health Street, Medical District</p>
                <p className="text-sm text-muted-foreground">Mumbai, Maharashtra 400001</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Wait</p>
                <p className="font-medium text-foreground">~{appointmentData?.slot?.estimatedWaitTime} minutes</p>
              </div>
            </div>

            {appointmentData?.isEmergency && (
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                <div>
                  <p className="text-sm text-error">Emergency Booking</p>
                  <p className="text-sm text-muted-foreground">Priority scheduling applied</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Payment Details Card */}
      <div className="bg-card rounded-lg border border-border p-6 clinical-shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
          <div className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm font-medium">
            <Icon name="CheckCircle" size={14} className="inline mr-1" />
            Paid
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-medium text-foreground">{paymentData?.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground capitalize">{paymentData?.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Time</span>
              <span className="font-medium text-foreground">
                {new Date(paymentData.timestamp)?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="text-lg font-semibold text-primary">
                ₹{paymentData?.amount?.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-accent">Success</span>
            </div>
          </div>
        </div>
      </div>
      {/* Important Instructions */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Important Instructions</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Bring a valid ID and your previous medical records</li>
              <li>• Wear comfortable clothing and avoid heavy meals 2 hours before</li>
              <li>• Contact us immediately if you need to reschedule or cancel</li>
              <li>• Emergency contact: +91 98765 43210</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          onClick={downloadReceipt}
          iconName="Download"
          iconPosition="left"
        >
          Download Receipt
        </Button>
        <Button
          variant="outline"
          onClick={addToCalendar}
          iconName="Calendar"
          iconPosition="left"
        >
          Add to Calendar
        </Button>
      </div>
      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onViewDashboard}
          iconName="LayoutDashboard"
          iconPosition="left"
          className="flex-1"
        >
          View Dashboard
        </Button>
        <Button
          variant="outline"
          onClick={onNewBooking}
          iconName="Plus"
          iconPosition="left"
          className="flex-1"
        >
          Book Another Appointment
        </Button>
      </div>
      {/* Contact Support */}
      <div className="text-center mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-2">Need help with your appointment?</p>
        <div className="flex items-center justify-center space-x-4">
          <Button variant="ghost" size="sm" iconName="Phone" iconPosition="left">
            Call Support
          </Button>
          <Button variant="ghost" size="sm" iconName="MessageCircle" iconPosition="left">
            Live Chat
          </Button>
          <Button variant="ghost" size="sm" iconName="Mail" iconPosition="left">
            Email Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;