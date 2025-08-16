import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EmergencyBookingPanel = ({ onEmergencyBooking, isVisible, onClose }) => {
  const [emergencyData, setEmergencyData] = useState({
    patientId: '',
    patientName: '',
    contactNumber: '',
    emergencyType: '',
    notes: '',
    preferredTime: '',
    doctorId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emergencyTypes = [
    { value: 'critical', label: 'Critical - Immediate attention required' },
    { value: 'urgent', label: 'Urgent - Within 2 hours' },
    { value: 'semi-urgent', label: 'Semi-urgent - Within 4 hours' }
  ];

  const availableDoctors = [
    { id: 'dr001', name: 'Dr. Rajesh Kumar', specialization: 'Nephrologist' },
    { id: 'dr002', name: 'Dr. Priya Sharma', specialization: 'Dialysis Specialist' },
    { id: 'dr003', name: 'Dr. Amit Patel', specialization: 'Emergency Medicine' }
  ];

  const handleInputChange = (field, value) => {
    setEmergencyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const emergencyBooking = {
        ...emergencyData,
        id: `EMG${Date.now()}`,
        timestamp: new Date()?.toISOString(),
        status: 'pending-approval',
        estimatedSlot: '14:30'
      };

      onEmergencyBooking(emergencyBooking);
      
      // Reset form
      setEmergencyData({
        patientId: '',
        patientName: '',
        contactNumber: '',
        emergencyType: '',
        notes: '',
        preferredTime: '',
        doctorId: ''
      });

      onClose();
    } catch (error) {
      console.error('Emergency booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto clinical-shadow-lg">
        <div className="sticky top-0 bg-card border-b border-border p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Emergency Booking</h2>
                <p className="text-sm text-muted-foreground">Immediate queue rearrangement</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Patient ID"
              type="text"
              placeholder="Enter patient ID"
              value={emergencyData?.patientId}
              onChange={(e) => handleInputChange('patientId', e?.target?.value)}
              required
            />
            <Input
              label="Patient Name"
              type="text"
              placeholder="Enter patient name"
              value={emergencyData?.patientName}
              onChange={(e) => handleInputChange('patientName', e?.target?.value)}
              required
            />
          </div>

          <Input
            label="Contact Number"
            type="tel"
            placeholder="Enter contact number"
            value={emergencyData?.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e?.target?.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Emergency Type *
            </label>
            <div className="space-y-2">
              {emergencyTypes?.map((type) => (
                <label key={type?.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="emergencyType"
                    value={type?.value}
                    checked={emergencyData?.emergencyType === type?.value}
                    onChange={(e) => handleInputChange('emergencyType', e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                    required
                  />
                  <span className="text-sm text-foreground">{type?.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Preferred Doctor
            </label>
            <select
              value={emergencyData?.doctorId}
              onChange={(e) => handleInputChange('doctorId', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a doctor</option>
              {availableDoctors?.map((doctor) => (
                <option key={doctor?.id} value={doctor?.id}>
                  {doctor?.name} - {doctor?.specialization}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Preferred Time (if any)"
            type="time"
            value={emergencyData?.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e?.target?.value)}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Emergency Notes
            </label>
            <textarea
              value={emergencyData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Describe the emergency situation and any special requirements..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-orange-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-orange-800">Emergency Booking Process</h4>
                <ul className="text-xs text-orange-600 mt-1 space-y-1">
                  <li>• AI will automatically rearrange the queue</li>
                  <li>• Affected patients will be notified via SMS</li>
                  <li>• Staff will receive immediate alerts</li>
                  <li>• Estimated slot assignment: 14:30</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              loading={isSubmitting}
              iconName="AlertTriangle"
              iconPosition="left"
            >
              {isSubmitting ? 'Processing Emergency...' : 'Create Emergency Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyBookingPanel;