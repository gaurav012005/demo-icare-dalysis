import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    patientId: '',
    licenseNumber: '',
    employeeId: '',
    dateOfBirth: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!formData?.phone?.match(/^\+91\d{10}$/)) {
      newErrors.phone = 'Please enter a valid phone number (+91XXXXXXXXXX)';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Role-specific validations
    if (formData?.role === 'patient' && !formData?.patientId) {
      newErrors.patientId = 'Patient ID is required';
    }

    if (formData?.role === 'doctor' && !formData?.licenseNumber) {
      newErrors.licenseNumber = 'Medical license number is required';
    }

    if ((formData?.role === 'technician' || formData?.role === 'admin') && !formData?.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store auth data
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userRole', formData?.role);
      localStorage.setItem('userEmail', formData?.email);

      // Role-based redirection
      const redirectPaths = {
        patient: '/patient-dashboard',
        doctor: '/patient-dashboard',
        technician: '/real-time-queue-management',
        admin: '/admin-dashboard'
      };

      navigate(redirectPaths?.[formData?.role]);
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (formData?.role) {
      case 'patient':
        return (
          <Input
            label="Patient ID"
            type="text"
            placeholder="Enter your patient ID"
            value={formData?.patientId}
            onChange={(e) => handleInputChange('patientId', e?.target?.value)}
            error={errors?.patientId}
            required
          />
        );
      case 'doctor':
        return (
          <Input
            label="Medical License Number"
            type="text"
            placeholder="Enter your license number"
            value={formData?.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e?.target?.value)}
            error={errors?.licenseNumber}
            required
          />
        );
      case 'technician': case'admin':
        return (
          <Input
            label="Employee ID"
            type="text"
            placeholder="Enter your employee ID"
            value={formData?.employeeId}
            onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
            error={errors?.employeeId}
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{errors?.general}</p>
        </div>
      )}
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91XXXXXXXXXX"
        value={formData?.phone}
        onChange={(e) => handleInputChange('phone', e?.target?.value)}
        error={errors?.phone}
        required
      />
      <Input
        label="Date of Birth"
        type="date"
        value={formData?.dateOfBirth}
        onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
        error={errors?.dateOfBirth}
        required
      />
      <Select
        label="Register as"
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleInputChange('role', value)}
        required
      />
      {renderRoleSpecificFields()}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password (min 8 characters)"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
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
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
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
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        checked={formData?.agreeToTerms}
        onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
        error={errors?.agreeToTerms}
        required
      />
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-6"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Already have an account? Sign In
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;