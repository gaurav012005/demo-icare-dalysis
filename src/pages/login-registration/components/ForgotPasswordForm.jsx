import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [formData, setFormData] = useState({
    email: '',
    role: 'patient',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);

  const roleOptions = [
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'technician', label: 'Technician' },
    { value: 'admin', label: 'Administrator' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateOTP = () => {
    const newErrors = {};

    if (!formData?.otp) {
      newErrors.otp = 'OTP is required';
    } else if (formData?.otp?.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    } else if (formData?.otp !== '123456') {
      newErrors.otp = 'Invalid OTP. Use 123456 for demo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};

    if (!formData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    
    if (!validateEmail()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      setErrors({ general: 'Failed to send OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    
    if (!validateOTP()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (error) {
      setErrors({ general: 'OTP verification failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e?.preventDefault();
    
    if (!validatePassword()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success and redirect to login
      alert('Password reset successfully! Please login with your new password.');
      onBackToLogin();
    } catch (error) {
      setErrors({ general: 'Password reset failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleSendOTP} className="space-y-4">
      <div className="text-center mb-4">
        <Icon name="Mail" size={48} className="mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your registered email"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />

      <Select
        label="Account Type"
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleInputChange('role', value)}
        required
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        iconName="Send"
        iconPosition="left"
        className="mt-6"
      >
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <div className="text-center mb-4">
        <Icon name="Smartphone" size={48} className="mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit OTP to {formData?.email}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Demo OTP: 123456
        </p>
      </div>

      <Input
        label="Enter OTP"
        type="text"
        placeholder="Enter 6-digit OTP"
        value={formData?.otp}
        onChange={(e) => handleInputChange('otp', e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
        error={errors?.otp}
        maxLength={6}
        required
      />

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        iconName="Check"
        iconPosition="left"
        className="mt-6"
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleSendOTP({ preventDefault: () => {} })}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="text-center mb-4">
        <Icon name="Lock" size={48} className="mx-auto text-primary mb-2" />
        <p className="text-sm text-muted-foreground">
          Create a new password for your account
        </p>
      </div>

      <div className="relative">
        <Input
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password (min 8 characters)"
          value={formData?.newPassword}
          onChange={(e) => handleInputChange('newPassword', e?.target?.value)}
          error={errors?.newPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your new password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        iconName="Save"
        iconPosition="left"
        className="mt-6"
      >
        {loading ? 'Resetting Password...' : 'Reset Password'}
      </Button>
    </form>
  );

  return (
    <div>
      {errors?.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md mb-4">
          <p className="text-sm text-error">{errors?.general}</p>
        </div>
      )}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-sm text-muted-foreground hover:text-foreground font-medium flex items-center justify-center space-x-1 mx-auto"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back to Login</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;