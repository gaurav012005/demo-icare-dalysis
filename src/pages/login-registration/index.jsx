import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from './components/AuthCard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import TwoFactorAuth from './components/TwoFactorAuth';

const LoginRegistration = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('login'); // login, register, forgot, 2fa
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token && userRole) {
      // Redirect to appropriate dashboard
      const redirectPaths = {
        patient: '/patient-dashboard',
        doctor: '/patient-dashboard',
        technician: '/real-time-queue-management',
        admin: '/admin-dashboard'
      };
      navigate(redirectPaths?.[userRole] || '/patient-dashboard');
    }
  }, [navigate]);

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleTwoFactorAuth = (email) => {
    setUserEmail(email);
    setCurrentView('2fa');
  };

  const handleVerificationComplete = () => {
    // This would be called after successful 2FA verification
    // For now, we'll just redirect to login setCurrentView('login');
  };

  const handleCancelTwoFactor = () => {
    setCurrentView('login');
  };

  const getCardTitle = () => {
    switch (currentView) {
      case 'register':
        return 'Create Account';
      case 'forgot':
        return 'Reset Password';
      case '2fa':
        return 'Verify Identity';
      default:
        return 'Welcome Back';
    }
  };

  const getCardSubtitle = () => {
    switch (currentView) {
      case 'register':
        return 'Join our healthcare community';
      case 'forgot':
        return 'Recover your account access';
      case '2fa':
        return 'Enhanced security verification';
      default:
        return 'Sign in to your account';
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return <RegisterForm onSwitchToLogin={handleSwitchToLogin} />;
      case 'forgot':
        return <ForgotPasswordForm onBackToLogin={handleBackToLogin} />;
      case '2fa':
        return (
          <TwoFactorAuth
            onVerificationComplete={handleVerificationComplete}
            onCancel={handleCancelTwoFactor}
            userEmail={userEmail}
          />
        );
      default:
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onForgotPassword={handleForgotPassword}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthCard
          title={getCardTitle()}
          subtitle={getCardSubtitle()}
        >
          {renderCurrentView()}
        </AuthCard>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Emergency Contact</h4>
            <p className="text-xs text-muted-foreground mb-1">
              For medical emergencies: <span className="font-medium text-error">108</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Technical support: <span className="font-medium text-primary">+91 98765 43210</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          <p>© {new Date()?.getFullYear()} LifeCare Dialysis Centre. All rights reserved.</p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Help</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;