import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistoryCard = () => {
  const [transactions] = useState([
    {
      id: 'TXN-2025-001',
      amount: 250000,
      type: 'Dialysis Session',
      date: '2025-08-15',
      status: 'completed',
      method: 'Razorpay',
      appointmentId: 'APT-2025-001'
    },
    {
      id: 'TXN-2025-002',
      amount: 150000,
      type: 'Consultation Fee',
      date: '2025-08-10',
      status: 'completed',
      method: 'Paytm',
      appointmentId: 'APT-2025-002'
    },
    {
      id: 'TXN-2025-003',
      amount: 500000,
      type: 'Monthly Package',
      date: '2025-08-01',
      status: 'completed',
      method: 'Razorpay',
      appointmentId: null
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    })?.format(amount / 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'razorpay':
        return 'CreditCard';
      case 'paytm':
        return 'Smartphone';
      default:
        return 'Banknote';
    }
  };

  const handleViewReceipt = (transactionId) => {
    console.log('View receipt for:', transactionId);
  };

  const totalSpent = transactions?.filter(t => t?.status === 'completed')?.reduce((sum, t) => sum + t?.amount, 0);

  return (
    <div className="bg-card rounded-lg border border-border clinical-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => console.log('View all payments')}
          >
            View All
          </Button>
        </div>

        {/* Total Spent Summary */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent This Month</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="Banknote" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
          {transactions?.map((transaction) => (
            <div key={transaction?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Icon name={getPaymentMethodIcon(transaction?.method)} size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground">{transaction?.type}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                        {transaction?.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{transaction?.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="CreditCard" size={12} />
                        <span>{transaction?.method}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{formatCurrency(transaction?.amount)}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewReceipt(transaction?.id)}
                    className="text-xs p-1 h-auto"
                  >
                    Receipt
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Accepted Payment Methods</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded">
                <Icon name="CreditCard" size={14} className="text-primary" />
                <span className="text-xs text-primary font-medium">Razorpay</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 rounded">
                <Icon name="Smartphone" size={14} className="text-accent" />
                <span className="text-xs text-accent font-medium">Paytm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;