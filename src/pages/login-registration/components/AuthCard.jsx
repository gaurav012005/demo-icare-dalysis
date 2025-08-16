import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthCard = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg clinical-shadow-lg p-6">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-3">
          <Icon name="Heart" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground">LifeCare</h1>
        <p className="text-sm text-muted-foreground">Dialysis Centre</p>
      </div>

      {/* Title Section */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Content */}
      {children}

      {/* Trust Signals */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>NABH Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;