import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DocumentCard from './components/DocumentCard';
import DocumentUpload from './components/DocumentUpload';
import PatientTimeline from './components/PatientTimeline';
import SearchAndFilter from './components/SearchAndFilter';
import DocumentPreview from './components/DocumentPreview';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('treatment-history');
  const [documents, setDocuments] = useState({});
  const [filteredDocuments, setFilteredDocuments] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: 'all',
    dateRange: 'all',
    doctor: 'all',
    status: 'all'
  });
  const [userRole, setUserRole] = useState('patient');
  const [currentPatient, setCurrentPatient] = useState('John Doe');

  const tabs = [
    { id: 'treatment-history', label: 'Treatment History', icon: 'Activity' },
    { id: 'test-reports', label: 'Test Reports', icon: 'TestTube' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'Pill' },
    { id: 'insurance', label: 'Insurance Documents', icon: 'Shield' },
    { id: 'timeline', label: 'Timeline View', icon: 'Clock' }
  ];

  // Mock data for documents
  const mockDocuments = {
    'treatment-history': [
      {
        id: 1,
        name: 'Dialysis Session Report - 15 Aug 2025.pdf',
        type: 'pdf',
        size: 2456789,
        uploadDate: '15/08/2025',
        doctor: 'Rajesh Sharma',
        annotation: 'Regular dialysis session completed successfully. Patient vitals stable throughout the procedure.',
        status: 'verified',
        category: 'treatment-history',
        encrypted: true,
        thumbnail: null
      },
      {
        id: 2,
        name: 'Treatment Plan - August 2025.pdf',
        type: 'pdf',
        size: 1234567,
        uploadDate: '01/08/2025',
        doctor: 'Priya Patel',
        annotation: 'Updated treatment plan with new medication schedule and dietary recommendations.',
        status: 'verified',
        category: 'treatment-history',
        encrypted: true,
        thumbnail: null
      },
      {
        id: 3,
        name: 'Post-Treatment Assessment.jpg',
        type: 'jpg',
        size: 987654,
        uploadDate: '10/08/2025',
        doctor: 'Amit Kumar',
        annotation: 'Patient showing good response to current treatment protocol.',
        status: 'verified',
        category: 'treatment-history',
        encrypted: true,
        thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
      }
    ],
    'test-reports': [
      {
        id: 4,
        name: 'Blood Test Results - 14 Aug 2025.pdf',
        type: 'pdf',
        size: 1876543,
        uploadDate: '14/08/2025',
        doctor: 'Sunita Singh',
        annotation: 'Hemoglobin levels improved. Kidney function parameters within acceptable range.',
        status: 'verified',
        category: 'test-reports',
        encrypted: true,
        thumbnail: null
      },
      {
        id: 5,
        name: 'Urine Analysis Report.pdf',
        type: 'pdf',
        size: 1456789,
        uploadDate: '12/08/2025',
        doctor: 'Rajesh Sharma',
        annotation: 'Protein levels decreased compared to previous test. Treatment showing positive results.',
        status: 'verified',
        category: 'test-reports',
        encrypted: true,
        thumbnail: null
      },
      {
        id: 6,
        name: 'X-Ray Chest Report.jpg',
        type: 'jpg',
        size: 2345678,
        uploadDate: '08/08/2025',
        doctor: 'Priya Patel',
        annotation: 'No signs of fluid accumulation. Chest clear.',
        status: 'verified',
        category: 'test-reports',
        encrypted: true,
        thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop'
      }
    ],
    'prescriptions': [
      {
        id: 7,
        name: 'Current Medications - August 2025.pdf',
        type: 'pdf',
        size: 876543,
        uploadDate: '15/08/2025',
        doctor: 'Amit Kumar',
        annotation: 'Updated prescription with dosage adjustments based on recent test results.',
        status: 'verified',
        category: 'prescriptions',
        encrypted: true,
        thumbnail: null
      },
      {
        id: 8,
        name: 'Dietary Supplements Prescription.pdf',
        type: 'pdf',
        size: 654321,
        uploadDate: '10/08/2025',
        doctor: 'Sunita Singh',
        annotation: 'Iron and vitamin supplements to address deficiency identified in blood tests.',
        status: 'verified',
        category: 'prescriptions',
        encrypted: true,
        thumbnail: null
      }
    ],
    'insurance': [
      {
        id: 9,
        name: 'Insurance Claim Form - July 2025.pdf',
        type: 'pdf',
        size: 1987654,
        uploadDate: '31/07/2025',
        doctor: null,
        annotation: 'Submitted claim for July dialysis sessions. Awaiting approval.',
        status: 'pending',
        category: 'insurance',
        encrypted: true,
        thumbnail: null
      },
      {
        id: 10,
        name: 'Medical Certificate.pdf',
        type: 'pdf',
        size: 765432,
        uploadDate: '25/07/2025',
        doctor: 'Rajesh Sharma',
        annotation: 'Medical certificate for insurance claim and workplace accommodation.',
        status: 'verified',
        category: 'insurance',
        encrypted: true,
        thumbnail: null
      }
    ]
  };

  // Mock timeline data
  const mockTimelineData = [
    {
      id: 1,
      date: '2025-08-15T10:00:00',
      type: 'dialysis',
      title: 'Dialysis Session #156',
      description: 'Regular hemodialysis session completed successfully. Duration: 4 hours.',
      doctor: 'Rajesh Sharma',
      value: '4.2L',
      unit: 'fluid removed',
      tags: ['routine', 'successful']
    },
    {
      id: 2,
      date: '2025-08-14T09:30:00',
      type: 'test',
      title: 'Blood Test - Comprehensive Panel',
      description: 'Complete blood count and kidney function tests performed.',
      doctor: 'Sunita Singh',
      value: '12.5',
      unit: 'g/dL Hb',
      tags: ['blood-work', 'routine']
    },
    {
      id: 3,
      date: '2025-08-12T14:15:00',
      type: 'dialysis',
      title: 'Dialysis Session #155',
      description: 'Hemodialysis session with minor complications resolved during treatment.',
      doctor: 'Priya Patel',
      value: '3.8L',
      unit: 'fluid removed',
      tags: ['routine', 'complications-resolved']
    },
    {
      id: 4,
      date: '2025-08-10T11:00:00',
      type: 'appointment',
      title: 'Nephrologist Consultation',
      description: 'Monthly consultation to review treatment progress and adjust medications.',
      doctor: 'Amit Kumar',
      tags: ['consultation', 'medication-review']
    },
    {
      id: 5,
      date: '2025-08-08T08:45:00',
      type: 'test',
      title: 'Chest X-Ray',
      description: 'Routine chest X-ray to check for fluid accumulation.',
      doctor: 'Priya Patel',
      tags: ['imaging', 'routine']
    },
    {
      id: 6,
      date: '2025-08-05T10:30:00',
      type: 'dialysis',
      title: 'Dialysis Session #154',
      description: 'Standard hemodialysis session with excellent patient tolerance.',
      doctor: 'Rajesh Sharma',
      value: '4.1L',
      unit: 'fluid removed',
      tags: ['routine', 'excellent-tolerance']
    }
  ];

  useEffect(() => {
    // Initialize documents and user role
    setDocuments(mockDocuments);
    setFilteredDocuments(mockDocuments);
    setUserRole(localStorage.getItem('userRole') || 'patient');
  }, []);

  useEffect(() => {
    // Apply search and filters
    applySearchAndFilters();
  }, [searchQuery, activeFilters, documents]);

  const applySearchAndFilters = () => {
    const filtered = {};
    
    Object.keys(documents)?.forEach(category => {
      let categoryDocs = documents?.[category] || [];
      
      // Apply search filter
      if (searchQuery) {
        categoryDocs = categoryDocs?.filter(doc =>
          doc?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          (doc?.doctor && doc?.doctor?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
          (doc?.annotation && doc?.annotation?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        );
      }
      
      // Apply type filter
      if (activeFilters?.type !== 'all') {
        if (activeFilters?.type === 'image') {
          categoryDocs = categoryDocs?.filter(doc => ['jpg', 'jpeg', 'png', 'gif']?.includes(doc?.type?.toLowerCase()));
        } else {
          categoryDocs = categoryDocs?.filter(doc => doc?.type?.toLowerCase() === activeFilters?.type);
        }
      }
      
      // Apply doctor filter
      if (activeFilters?.doctor !== 'all') {
        const doctorMap = {
          'sharma': 'Rajesh Sharma',
          'patel': 'Priya Patel',
          'kumar': 'Amit Kumar',
          'singh': 'Sunita Singh'
        };
        categoryDocs = categoryDocs?.filter(doc => doc?.doctor === doctorMap?.[activeFilters?.doctor]);
      }
      
      // Apply status filter
      if (activeFilters?.status !== 'all') {
        categoryDocs = categoryDocs?.filter(doc => doc?.status === activeFilters?.status);
      }
      
      // Apply date range filter
      if (activeFilters?.dateRange !== 'all') {
        const now = new Date();
        const filterDate = new Date();
        
        switch (activeFilters?.dateRange) {
          case 'today':
            filterDate?.setHours(0, 0, 0, 0);
            break;
          case 'week':
            filterDate?.setDate(now?.getDate() - 7);
            break;
          case 'month':
            filterDate?.setMonth(now?.getMonth() - 1);
            break;
          case '3months':
            filterDate?.setMonth(now?.getMonth() - 3);
            break;
          case '6months':
            filterDate?.setMonth(now?.getMonth() - 6);
            break;
          case 'year':
            filterDate?.setFullYear(now?.getFullYear() - 1);
            break;
        }
        
        if (activeFilters?.dateRange !== 'all') {
          categoryDocs = categoryDocs?.filter(doc => {
            const docDate = new Date(doc.uploadDate.split('/').reverse().join('-'));
            return docDate >= filterDate;
          });
        }
      }
      
      filtered[category] = categoryDocs;
    });
    
    setFilteredDocuments(filtered);
  };

  const handleDocumentUpload = (newDocuments) => {
    const updatedDocuments = { ...documents };
    newDocuments?.forEach(doc => {
      if (!updatedDocuments?.[doc?.category]) {
        updatedDocuments[doc.category] = [];
      }
      updatedDocuments?.[doc?.category]?.unshift(doc);
    });
    setDocuments(updatedDocuments);
  };

  const handleDocumentDownload = async (document) => {
    // Simulate download with watermark protection
    console.log('Downloading document with watermark:', document?.name);
    // In real app, this would trigger secure download with patient info watermark
  };

  const handleDocumentShare = async (document) => {
    // Simulate secure sharing
    console.log('Sharing document securely:', document?.name);
    // In real app, this would open sharing modal with permission controls
  };

  const handleDocumentPreview = (document) => {
    setSelectedDocument(document);
    setShowPreview(true);
  };

  const handleDocumentPrint = async (document) => {
    // Simulate printing with watermark
    console.log('Printing document with watermark:', document?.name);
    // In real app, this would trigger print with patient info watermark
  };

  const handleTimelineEventClick = (event) => {
    console.log('Timeline event clicked:', event);
    // In real app, this would show detailed event information
  };

  const getDocumentCount = (category) => {
    return filteredDocuments?.[category]?.length || 0;
  };

  const getTotalDocuments = () => {
    return Object.values(filteredDocuments)?.reduce((total, docs) => total + docs?.length, 0);
  };

  return (
    <>
      <Helmet>
        <title>Medical Records - LifeCare Dialysis Centre</title>
        <meta name="description" content="Secure access to your medical records, test reports, prescriptions, and treatment history with AES encryption and role-based permissions." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Breadcrumb />
        
        <main className="pt-4 pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
                  <p className="text-muted-foreground mt-2">
                    {userRole === 'patient' ?'Secure access to your complete medical history and documents'
                      : `Managing medical records for ${currentPatient}`
                    }
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{getTotalDocuments()}</div>
                    <div className="text-sm text-muted-foreground">Total Documents</div>
                  </div>
                  <Button
                    onClick={() => setShowUpload(true)}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Upload Documents
                  </Button>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-6">
              <SearchAndFilter
                onSearch={setSearchQuery}
                onFilter={setActiveFilters}
                activeFilters={activeFilters}
              />
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                      {tab?.id !== 'timeline' && (
                        <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {getDocumentCount(tab?.id)}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'timeline' ? (
                <PatientTimeline
                  timelineData={mockTimelineData}
                  onEventClick={handleTimelineEventClick}
                />
              ) : (
                <>
                  {/* Documents Grid */}
                  {filteredDocuments?.[activeTab]?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredDocuments?.[activeTab]?.map((document) => (
                        <DocumentCard
                          key={document?.id}
                          document={document}
                          onDownload={handleDocumentDownload}
                          onShare={handleDocumentShare}
                          onPreview={handleDocumentPreview}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="FileText" size={64} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        No Documents Found
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {searchQuery || Object.values(activeFilters)?.some(f => f !== 'all' && f !== '')
                          ? 'No documents match your current search or filter criteria.'
                          : `No documents available in ${tabs?.find(t => t?.id === activeTab)?.label?.toLowerCase()}.`
                        }
                      </p>
                      <Button
                        onClick={() => setShowUpload(true)}
                        iconName="Upload"
                        iconPosition="left"
                      >
                        Upload Your First Document
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Upload Modal */}
        <DocumentUpload
          isOpen={showUpload}
          onClose={() => setShowUpload(false)}
          onUpload={handleDocumentUpload}
          category={activeTab === 'timeline' ? 'treatment-history' : activeTab}
        />

        {/* Preview Modal */}
        <DocumentPreview
          document={selectedDocument}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onDownload={handleDocumentDownload}
          onShare={handleDocumentShare}
          onPrint={handleDocumentPrint}
        />
      </div>
    </>
  );
};

export default MedicalRecords;