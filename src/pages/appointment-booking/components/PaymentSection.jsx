import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentSection = ({ 
  selectedDoctor, 
  selectedMachine, 
  selectedSlot, 
  isEmergency, 
  onPaymentComplete 
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const baseConsultationFee = selectedDoctor?.consultationFee || 0;
  const machineFee = 1500; // Base machine fee
  const emergencyFee = isEmergency ? 500 : 0;
  const gstRate = 0.18;
  
  const subtotal = baseConsultationFee + machineFee + emergencyFee;
  const discount = appliedCoupon ? (subtotal * appliedCoupon?.discountPercent / 100) : 0;
  const discountedSubtotal = subtotal - discount;
  const gstAmount = discountedSubtotal * gstRate;
  const totalAmount = discountedSubtotal + gstAmount;

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: 'CreditCard',
      description: 'Credit/Debit Cards, UPI, Net Banking',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=60&fit=crop'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: 'Smartphone',
      description: 'Paytm Wallet, UPI, Cards',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=60&fit=crop'
    },
    {
      id: 'upi',
      name: 'UPI Direct',
      icon: 'Zap',
      description: 'Google Pay, PhonePe, BHIM',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=60&fit=crop'
    }
  ];

  const availableCoupons = [
    { code: 'FIRST10', discountPercent: 10, description: 'First time patient discount' },
    { code: 'HEALTH20', discountPercent: 20, description: 'Health checkup special' },
    { code: 'EMERGENCY5', discountPercent: 5, description: 'Emergency booking discount' }
  ];

  const applyCoupon = () => {
    const coupon = availableCoupons?.find(c => c?.code === couponCode?.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const paymentData = {
        transactionId: `TXN${Date.now()}`,
        amount: totalAmount,
        paymentMethod: selectedPaymentMethod,
        status: 'success',
        timestamp: new Date()?.toISOString()
      };
      
      setIsProcessing(false);
      onPaymentComplete(paymentData);
    }, 3000);
  };

  if (!selectedDoctor || !selectedMachine || !selectedSlot) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
        <div className="text-center py-8">
          <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Complete Previous Steps</h3>
          <p className="text-muted-foreground">Please select doctor, machine, and time slot to proceed with payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 clinical-shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
          <p className="text-sm text-muted-foreground mt-1">Secure payment processing with Indian payment gateways</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-accent" />
          <span className="text-sm text-accent font-medium">SSL Secured</span>
        </div>
      </div>
      {/* Appointment Summary */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Appointment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Doctor:</span>
            <span className="text-foreground font-medium">{selectedDoctor?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Machine:</span>
            <span className="text-foreground font-medium">#{selectedMachine?.id} - {selectedMachine?.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time:</span>
            <span className="text-foreground font-medium">
              {new Date(`2000-01-01T${selectedSlot.startTime}`)?.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })} ({selectedSlot?.duration} mins)
            </span>
          </div>
          {isEmergency && (
            <div className="flex justify-between">
              <span className="text-error">Emergency Booking:</span>
              <span className="text-error font-medium">Yes</span>
            </div>
          )}
        </div>
      </div>
      {/* Cost Breakdown */}
      <div className="mb-6 p-4 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Cost Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Consultation Fee</span>
            <span className="text-foreground">₹{baseConsultationFee?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Machine Usage</span>
            <span className="text-foreground">₹{machineFee?.toLocaleString('en-IN')}</span>
          </div>
          {isEmergency && (
            <div className="flex justify-between">
              <span className="text-error">Emergency Fee</span>
              <span className="text-error">₹{emergencyFee?.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="border-t border-border pt-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">₹{subtotal?.toLocaleString('en-IN')}</span>
            </div>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-accent">
              <span>Discount ({appliedCoupon?.code})</span>
              <span>-₹{discount?.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="text-foreground">₹{gstAmount?.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-border pt-2">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-foreground">Total Amount</span>
              <span className="text-primary">₹{totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Coupon Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Tag" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Apply Coupon</span>
        </div>
        {!appliedCoupon ? (
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e?.target?.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-accent/10 text-accent rounded-lg">
            <div>
              <span className="font-medium">{appliedCoupon?.code}</span>
              <p className="text-xs opacity-80">{appliedCoupon?.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={removeCoupon}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        )}
      </div>
      {/* Payment Methods */}
      <div className="mb-6">
        <h4 className="font-medium text-foreground mb-3">Select Payment Method</h4>
        <div className="space-y-3">
          {paymentMethods?.map((method) => (
            <div
              key={method?.id}
              onClick={() => setSelectedPaymentMethod(method?.id)}
              className={`
                p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${selectedPaymentMethod === method?.id 
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                  <Icon name={method?.icon} size={16} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">{method?.name}</h5>
                  <p className="text-sm text-muted-foreground">{method?.description}</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedPaymentMethod === method?.id 
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedPaymentMethod === method?.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={isProcessing}
        onClick={handlePayment}
        iconName="CreditCard"
        iconPosition="left"
      >
        {isProcessing ? 'Processing Payment...' : `Pay ₹${totalAmount?.toLocaleString('en-IN')}`}
      </Button>
      {/* Security Info */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>PCI Compliant</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} />
            <span>RBI Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;