import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicalSummaryCard = () => {
  const [recentRecords] = useState([
    {
      id: 'REC-001',
      type: 'Lab Report',
      title: 'Blood Chemistry Panel',
      date: '2025-08-15',
      status: 'normal',
      doctor: 'Dr. Rajesh Kumar',
      summary: 'Creatinine: 8.2 mg/dL, Urea: 120 mg/dL'
    },
    {
      id: 'REC-002',
      type: 'Prescription',
      title: 'Monthly Medications',
      date: '2025-08-14',
      status: 'active',
      doctor: 'Dr. Rajesh Kumar',
      summary: 'Erythropoietin, Calcium Carbonate'
    },
    {
      id: 'REC-003',
      type: 'Treatment',
      title: 'Dialysis Session Report',
      date: '2025-08-13',
      status: 'completed',
      doctor: 'Dr. Rajesh Kumar',
      summary: 'Duration: 4hrs, Fluid Removed: 2.5L'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-success bg-success/10';
      case 'active':
        return 'text-primary bg-primary/10';
      case 'completed':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Lab Report':
        return 'TestTube';
      case 'Prescription':
        return 'Pill';
      case 'Treatment':
        return 'Activity';
      default:
        return 'FileText';
    }
  };

  const handleDownload = (recordId) => {
    console.log('Download record:', recordId);
    // Simulate secure download with AES encryption
  };

  return (
    <div className="bg-card rounded-lg border border-border clinical-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Medical Records</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => console.log('View all records')}
          >
            View All
          </Button>
        </div>

        <div className="space-y-4">
          {recentRecords?.map((record) => (
            <div key={record?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={getTypeIcon(record?.type)} size={16} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">{record?.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record?.status)}`}>
                        {record?.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{record?.type}</p>
                    <p className="text-xs text-muted-foreground mb-2">{record?.summary}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{record?.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{record?.doctor}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(record?.id)}
                  className="ml-2 flex-shrink-0"
                >
                  <Icon name="Download" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Upload New Record */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="Upload"
            iconPosition="left"
            onClick={() => console.log('Upload new record')}
          >
            Upload New Record
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalSummaryCard;