import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSwitchToRegister, onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'patient', label: 'Patient' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'technician', label: 'Technician' },
    { value: 'admin', label: 'Administrator' }
  ];

  // Mock credentials for different roles
  const mockCredentials = {
    patient: { email: 'patient@lifecare.com', password: 'patient123' },
    doctor: { email: 'doctor@lifecare.com', password: 'doctor123' },
    technician: { email: 'tech@lifecare.com', password: 'tech123' },
    admin: { email: 'admin@lifecare.com', password: 'admin123' }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email or phone number is required';
    } else if (!formData?.email?.includes('@') && !formData?.email?.match(/^\+91\d{10}$/)) {
      newErrors.email = 'Please enter a valid email or phone number (+91XXXXXXXXXX)';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const roleCredentials = mockCredentials?.[formData?.role];
      if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
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
      } else {
        setErrors({ 
          general: `Invalid credentials. Use ${roleCredentials?.email} / ${roleCredentials?.password} for ${formData?.role} role` 
        });
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
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
        label="Email or Phone Number"
        type="text"
        placeholder="Enter email or +91XXXXXXXXXX"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
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
      <Select
        label="Login as"
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
        iconName="LogIn"
        iconPosition="left"
        className="mt-6"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-primary hover:text-primary/80 font-medium"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary hover:text-primary/80 font-medium"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default LoginForm;