import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const TwoFactorAuth = ({ onVerificationComplete, onCancel, userEmail }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleVerify = async (e) => {
    e?.preventDefault();
    
    if (!otp || otp?.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock OTP verification (use 123456 for demo)
      if (otp === '123456') {
        onVerificationComplete();
      } else {
        setError('Invalid OTP. Use 123456 for demo');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTimeLeft(300);
      setCanResend(false);
      alert('New OTP sent successfully!');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-sm font-medium text-foreground">{userEmail}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Demo OTP: 123456
        </p>
      </div>
      <form onSubmit={handleVerify} className="space-y-4">
        {error && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-md">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <Input
          label="Verification Code"
          type="text"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={(e) => setOtp(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
          maxLength={6}
          className="text-center text-lg tracking-widest"
          required
        />

        <div className="text-center text-sm text-muted-foreground">
          {timeLeft > 0 ? (
            <p>Code expires in {formatTime(timeLeft)}</p>
          ) : (
            <p className="text-warning">Code has expired</p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={loading}
          disabled={!otp || otp?.length !== 6}
          iconName="Check"
          iconPosition="left"
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </Button>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleResendOTP}
            disabled={!canResend || loading}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resend Code
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
          >
            Cancel
          </Button>
        </div>
      </form>
      <div className="bg-muted/30 rounded-md p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Security Notice:</p>
            <p>This additional security step helps protect your medical data and ensures only authorized access to your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;